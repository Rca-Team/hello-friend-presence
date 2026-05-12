## 1. System Analysis (what already exists)

**Auth & Roles**
- Supabase auth with `user_roles` table (admin / principal / teacher / user) + `has_role()` security-definer function
- Protected routes via `ProtectedRoute` wrapper
- Parent portal (public lookup), parent email/phone on profiles

**Identity & Face Pipeline**
- `face-api.js` (TinyFaceDetector, SSD MobileNetV1, FaceLandmark68, FaceRecognition) loaded from `/public/models`
- Registration paths: `Register.tsx`, `MultiAngleCapture`, `AutoCapture10`, `Scan3DCapture`, `ClassPhotoRegistration`, `BulkImageRegistration`, `PDFBulkRegistration`, ID-card OCR extractors
- Storage: `face_descriptors` table (jsonb descriptor + image_url + quality_score) and storage buckets `student-registration-faces`, `attendance-training-faces`, public `face-images`
- Progressive training service samples per user; 3D-equivalent point cloud + descriptor cloud artifacts
- Recognition: `RecognitionService` (single), `MultipleFaceService` (classroom), `TurboRecognitionService` (GPU + worker pool + IndexedDB k-d tree cache), strict 99% fused 3D matcher with manual-review fallback

**Attendance Capture Surfaces**
- `Attendance.tsx` with `FuturisticFaceScanner`, `MultipleFaceAttendanceCapture`, `MobileAttendanceCapture`, QR fallback (`QRCodeScanner`)
- `GateMode` (entry/exit with `gate_sessions` + `gate_entries`), late-entry form, stranger alert
- Attendance cutoff time → present/late logic, `attendance_records` table

**Admin / Teacher Tooling**
- `Admin.tsx` aggregates: `TeacherDashboard`, `PrincipalDashboard`, `AttendanceCalendar`, `StudentDetailsTable`, `ClassSectionReport`, `AttendanceExport`, `AttendanceReportGenerator`, `ClassTeacherManager`, `TeacherPermissionsManager`, `TimetableManager`, `StudentCSVImporter`, `BulkImageRegistration`, `StudentFaceSamplesManager`, `FaceModelUpgradeSettings`

**Notifications**
- Push (service worker), realtime listener, transactional emails (status to parent, absent-cutoff), SMS, WhatsApp connectors
- Edge functions: `auto-attendance-notifications`, `auto-parent-notification`, `absence-cutoff-notify`, `absence-tracker`, `send-transactional-email`, `process-email-queue`, `stranger-alert`

**Extras (likely deferred for pilot)**
- AI insights, predictions, gamification, wellness, emotion analytics, zone tracker, bus tracker, visitor management, panic button, lockdown

**Algorithms in use**
- SSD MobileNetV1 detection (minConfidence 0.4) + 128-d FaceNet descriptor
- Cosine/Euclidean matching + k-d tree (IndexedDB cache) + parallel web-worker pool
- Strict fused 3D score = 0.7·descriptor-cloud similarity + 0.3·point-cloud distance, threshold 0.99 → auto, else manual review
- Cutoff-time rule → present/late/absent classification

## 2. Pilot Plan — One Class, Real-Time

Goal: deploy in **one class (e.g. Class 8 - Section A, ~30-40 students)** for 4 weeks, validate recognition accuracy and parent-notification loop, then expand.

### Week 0 — Setup (2-3 days)
1. **Class scoping**
   - Create class+section in `class_teachers`, assign one teacher account
   - Use `TeacherPermissionsManager` to restrict teacher to that class only
   - Seed period timings via `TimetableManager`
2. **Hardware**
   - 1 classroom tablet/laptop (front camera ≥720p, Chrome) mounted at door
   - 1 backup phone (PWA install) for teacher
   - Stable Wi-Fi; UPS for the tablet
3. **Cutoff time** configured in `AttendanceCutoffSetting` (e.g. 08:30)

### Week 1 — Enrollment
1. Bulk import roster via `StudentCSVImporter` (name, roll, parent email/phone)
2. Face enrollment per student using `MultiAngleCapture` + `Scan3DCapture` (≥10 samples, multiple angles/lighting)
3. Validate each student through `/​__admin/face-model-validator` (descriptor cloud + 3D point cloud sanity)
4. Print/share student ID cards (`StudentIDCardGenerator`) as QR fallback
5. Parent onboarding: send welcome email + parent-portal link

### Week 2 — Shadow Mode (no parent alerts)
1. Run `MultipleFaceAttendanceCapture` at start of first period each morning
2. Teacher reviews **manual-confirmation queue** for sub-99% matches
3. Disable parent notifications; collect:
   - True positives / false positives / misses per day
   - Average confidence, fused 3D score distribution
   - Latency per scan (target <2s/face on device)
4. Daily export via `AttendanceExport` for offline audit against paper register
5. Tune: minimum face size, cutoff time, lighting placement, threshold (only if data justifies)

### Week 3 — Live with Notifications
1. Enable `auto-attendance-notifications` + `absence-cutoff-notify` for the single class only (filter by class/section in scheduler)
2. Parent channels: email primary, WhatsApp/SMS optional per parent preference
3. Late-entry workflow via `LateEntryForm` (gate mode) for after-cutoff arrivals
4. Stranger alert ON; teacher confirms before escalation

### Week 4 — Full Loop
1. Add Gate Mode at classroom door for exit tracking (optional)
2. Weekly report to parents via `AttendanceReportGenerator`
3. Principal dashboard reviewed weekly with class teacher
4. Decision gate: scale to next class only if
   - Recognition accuracy ≥98% over 5 consecutive days
   - <1% false-positive rate
   - Parent-notification delivery ≥95%
   - Zero unresolved security findings

### Daily Operating Procedure (teacher)
1. Open `/attendance` → start class session (filter to own class)
2. Scan students at door for 10 min before cutoff
3. Resolve manual-review queue
4. Mark any unscanned as absent at cutoff (auto by `absence-tracker`)
5. End-of-day: glance at `TeacherDashboard` summary

## 3. Features Deferred Until After Pilot
Bus tracking, zone tracker, visitor management, panic button, emergency lockdown, gamification, wellness, emotion analytics, AI predictions — keep code present but hidden from teacher nav for the pilot class to reduce surface area.

## 4. Risks & Mitigations
- **Lighting / camera angle** → fixed mount + ring light; re-enroll low-quality samples flagged by `FaceSamplesDiagnosticsPanel`
- **Twins / siblings** → keep manual-review threshold strict; teacher confirms
- **Privacy / consent** → printed consent form for parents before Week 1; storage buckets remain private; only `face-images` bucket is public (audit usage)
- **Network outage** → IndexedDB descriptor cache + queued attendance writes (already in turbo pipeline); QR fallback as backup
- **Wrong-class drift** → teacher account scoped via `TeacherPermissionsManager`; RLS already enforces owner/admin

## 5. Technical Changes Needed for Pilot (small)
- Add a class/section filter to notification edge functions (currently global) so only pilot class triggers parent emails
- Add a "Pilot mode" toggle in `attendance_settings` that limits auto-notifications to a configured class+section
- Add a daily metrics view (accuracy %, false-positive count, avg fused score) to `TeacherDashboard` for the pilot class
- Optional: log per-scan metrics to a new `recognition_metrics` table for post-pilot analysis

No new third-party services required — Lovable Cloud + existing edge functions cover the pilot.

## 6. Success Metrics (end of Week 4)
- ≥98% recognition accuracy
- ≤2s average scan latency per student
- ≥95% parent-notification delivery
- ≥80% teacher satisfaction (single-question survey)
- 0 P1 incidents (wrong attendance marked, wrong parent notified)
