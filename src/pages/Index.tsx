import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import rcaTeamLogo from '@/assets/rca-team-logo.jpg';
import gauravPhoto from '@/assets/gaurav-photo.png';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layouts/PageLayout';
import PageTransition from '@/components/PageTransition';
import {
  ArrowRight,
  Scan,
  BookOpen,
  Shield,
  Bell,
  BarChart3,
  Bus,
  Sparkles,
  Zap,
  Brain,
  Smartphone,
  Users,
  Camera,
  Clock,
  DoorOpen,
  CalendarDays,
  UserCheck,
  ClipboardList,
  GraduationCap,
  Layers,
  Fingerprint,
  Award,
  Heart,
  AlertTriangle,
  MapPin,
  Lock,
  MessageSquare,
  Globe,
  FileText,
  Building2,
} from 'lucide-react';

const cardTilt = {
  whileHover: { rotateX: -4, rotateY: 5, y: -8, scale: 1.01 },
  transition: { type: 'spring', stiffness: 260, damping: 20 },
};

const Index = () => {
  const [activeProfile, setActiveProfile] = useState<null | {
    name: string;
    role: string;
    image?: string;
    bio: string;
  }>(null);

  const modules = [
    { icon: Scan, label: 'Attendance', tone: 'text-[#6c5ce7] bg-[#6c5ce7]/20' },
    { icon: BookOpen, label: 'Timetable', tone: 'text-[#e84393] bg-[#e84393]/20' },
    { icon: Shield, label: 'Security', tone: 'text-[#ff6b35] bg-[#ff6b35]/20' },
    { icon: Bell, label: 'Alerts', tone: 'text-[#f7931e] bg-[#f7931e]/20' },
    { icon: BarChart3, label: 'Analytics', tone: 'text-[#6c5ce7] bg-[#6c5ce7]/20' },
    { icon: Bus, label: 'Transport', tone: 'text-[#e84393] bg-[#e84393]/20' },
  ];

  const stats = [
    { value: '99.9%', label: 'Attendance accuracy', glow: 'from-[#6c5ce7] to-[#e84393]' },
    { value: '<1s', label: 'Face scan speed', glow: 'from-[#ff6b35] to-[#f7931e]' },
    { value: '1000+', label: 'Bulk registrations', glow: 'from-[#e84393] to-[#6c5ce7]' },
    { value: '24/7', label: 'Campus monitoring', glow: 'from-[#f7931e] to-[#ff6b35]' },
  ];

  const featureCategories = [
    {
      category: 'AI-Powered Attendance',
      icon: Scan,
      gradient: 'from-[#6c5ce7] to-[#e84393]',
      features: [
        { icon: Camera, title: 'Face Recognition', desc: 'Millisecond facial detection with high precision.' },
        { icon: Users, title: 'Multi-Face Scanning', desc: 'Recognize multiple students at once in live gate flow.' },
        { icon: DoorOpen, title: 'Gate Mode', desc: 'Kiosk-ready scanning with stranger detection.' },
        { icon: Clock, title: 'Auto Cutoff Alerts', desc: 'Absence notifications sent after daily cutoff.' },
      ],
    },
    {
      category: 'Timetable & Teachers',
      icon: BookOpen,
      gradient: 'from-[#ff6b35] to-[#f7931e]',
      features: [
        { icon: CalendarDays, title: 'Smart Timetable', desc: 'Structured timetable management for all classes.' },
        { icon: UserCheck, title: 'Auto Substitution', desc: 'Automatic replacement when a teacher is absent.' },
        { icon: ClipboardList, title: 'Teacher Permissions', desc: 'Granular class-section access controls.' },
        { icon: FileText, title: 'Substitution Reports', desc: 'Printable and shareable daily reports.' },
      ],
    },
    {
      category: 'Student Management',
      icon: GraduationCap,
      gradient: 'from-[#e84393] to-[#6c5ce7]',
      features: [
        { icon: Layers, title: 'Class Structure', desc: 'Organize students by classes and sections.' },
        { icon: Fingerprint, title: 'Bulk Registration', desc: 'Import and register students at scale.' },
        { icon: Award, title: 'Gamification', desc: 'Badges, points, and class leaderboards.' },
        { icon: Heart, title: 'Wellness Scores', desc: 'Track punctuality and behavioral trends.' },
      ],
    },
    {
      category: 'Safety & Security',
      icon: Shield,
      gradient: 'from-[#f7931e] to-[#ff6b35]',
      features: [
        { icon: AlertTriangle, title: 'Emergency Alerts', desc: 'Instant lockdown and fire alerts.' },
        { icon: UserCheck, title: 'Visitor Management', desc: 'Visitor face verification and QR pass flow.' },
        { icon: MapPin, title: 'Zone Monitoring', desc: 'Track restricted areas with alerts.' },
        { icon: Lock, title: 'Stranger Detection', desc: 'Unknown face detection at entry points.' },
      ],
    },
    {
      category: 'Parent & Communication',
      icon: MessageSquare,
      gradient: 'from-[#6c5ce7] to-[#ff6b35]',
      features: [
        { icon: Bell, title: 'Smart Notifications', desc: 'Targeted alerts through preferred channels.' },
        { icon: Globe, title: 'Parent Portal', desc: 'Attendance, circulars, and performance access.' },
        { icon: FileText, title: 'Digital Circulars', desc: 'Broadcast updates with acknowledgement trail.' },
        { icon: Bus, title: 'Bus Tracking', desc: 'Boarding and route notifications to guardians.' },
      ],
    },
    {
      category: 'Analytics & Reports',
      icon: BarChart3,
      gradient: 'from-[#e84393] to-[#f7931e]',
      features: [
        { icon: Brain, title: 'AI Insights', desc: 'Predictive analysis for attendance risk.' },
        { icon: BarChart3, title: 'Advanced Reports', desc: 'Class-level and student-level reporting.' },
        { icon: Building2, title: 'Principal Dashboard', desc: 'Real-time school-wide command center.' },
        { icon: CalendarDays, title: 'Holiday Calendar', desc: 'Academic calendar with schedule context.' },
      ],
    },
  ];

  const creatorMembers = [
    {
      name: 'Gaurav',
      role: 'Team leader + Developer',
      image: gauravPhoto,
      bio: 'Leads product direction and development for Presences smart automation.',
    },
    {
      name: 'Jatin',
      role: 'Contributor',
      bio: 'Supports feature execution, testing, and iteration across modules.',
    },
  ];

  return (
    <PageTransition>
      <PageLayout className="overflow-hidden has-bottom-nav md:pb-0">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050508]">
          <div className="absolute top-1/4 -left-24 h-80 w-80 rounded-full bg-[#ff6b35]/25 blur-[110px]" />
          <div className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full bg-[#6c5ce7]/25 blur-[110px]" />
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e84393]/15 blur-[160px]" />
        </div>

        <section className="pt-2 pb-10 sm:pb-14">
          <div className="grid grid-cols-12 gap-6">
            <motion.div
              className="col-span-12 lg:col-span-7 rounded-[2.5rem] border border-white/20 bg-white/[0.07] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)] backdrop-blur-3xl"
              style={{ perspective: 900, transformStyle: 'preserve-3d' }}
              {...cardTilt}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#f7931e]">
                <Sparkles className="h-3.5 w-3.5" /> Complete School Automation
              </div>

              <h1
                className="mt-6 text-5xl font-extrabold leading-[1.05] text-white md:text-7xl"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                Your School,
                <br />
                <span className="bg-gradient-to-r from-[#ff6b35] via-[#e84393] to-[#6c5ce7] bg-clip-text text-transparent">
                  Fully Automated
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl">
                Face-recognition attendance, timetable, gate security, parent portal & AI analytics — one platform.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button className="h-14 rounded-2xl bg-gradient-to-r from-[#6c5ce7] to-[#e84393] px-8 text-base font-bold text-white shadow-2xl shadow-[#6c5ce7]/40 hover:brightness-110">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/parent">
                  <Button className="h-14 rounded-2xl border border-white/20 bg-white/10 px-8 text-base font-bold text-white hover:bg-white/20">
                    Parent Portal
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="col-span-12 grid grid-cols-2 gap-6 lg:col-span-5 lg:grid-rows-2">
              <motion.div
                className="col-span-2 rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-2xl"
                style={{ perspective: 900, transformStyle: 'preserve-3d' }}
                {...cardTilt}
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">System Modules</span>
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#ff6b35]/60" />
                    <div className="h-2 w-2 rounded-full bg-[#e84393]/60" />
                    <div className="h-2 w-2 rounded-full bg-[#6c5ce7] shadow-[0_0_8px_#6c5ce7]" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {modules.map((mod) => (
                    <motion.div
                      key={mod.label}
                      className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center"
                      whileHover={{ rotateX: -5, rotateY: 7, y: -4 }}
                      transition={{ duration: 0.2 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl ${mod.tone}`}>
                        <mod.icon className="h-5 w-5" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-tight text-white/60">{mod.label}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-8 text-center text-xs font-bold tracking-widest text-[#6c5ce7]">ALL SYSTEMS OPERATIONAL</p>
              </motion.div>

              <motion.div
                className="rounded-[2.5rem] border border-white/30 bg-gradient-to-br from-[#ff6b35]/90 to-[#f7931e]/90 p-8 text-white"
                style={{ perspective: 900, transformStyle: 'preserve-3d' }}
                {...cardTilt}
              >
                <Zap className="h-8 w-8" />
                <p className="mt-14 text-4xl font-black" style={{ fontFamily: 'Sora, sans-serif' }}>2.4k</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Daily Students</p>
              </motion.div>

              <motion.div
                className="rounded-[2.5rem] border border-white/20 bg-white/[0.08] p-8 backdrop-blur-3xl"
                style={{ perspective: 900, transformStyle: 'preserve-3d' }}
                {...cardTilt}
              >
                <div className="flex items-center gap-3">
                  <img src={rcaTeamLogo} alt="RCA Team logo" className="h-11 w-11 rounded-full border border-white/20 object-cover" loading="lazy" />
                  <img src={gauravPhoto} alt="Gaurav" className="h-11 w-11 rounded-full border border-white/20 object-cover" loading="lazy" />
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e84393] text-[10px] font-black text-white">+8</div>
                </div>
                <p className="mt-14 text-lg font-bold text-white">Creator Team</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/45">Real-time Sync</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="pb-14">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="rounded-3xl border border-white/15 bg-white/[0.06] p-5 text-center backdrop-blur-xl"
                style={{ perspective: 900, transformStyle: 'preserve-3d' }}
                {...cardTilt}
              >
                <p className={`bg-gradient-to-r ${stat.glow} bg-clip-text text-3xl font-black text-transparent md:text-5xl`} style={{ fontFamily: 'Sora, sans-serif' }}>
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-semibold text-white/70 md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {featureCategories.map((cat) => (
          <section key={cat.category} className="pb-14">
            <div className="mb-6 flex items-center gap-3">
              <div className={`inline-flex rounded-2xl bg-gradient-to-br p-3 ${cat.gradient}`}>
                <cat.icon className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: 'Sora, sans-serif' }}>{cat.category}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {cat.features.map((feature) => (
                <motion.div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-xl"
                  style={{ perspective: 900, transformStyle: 'preserve-3d' }}
                  whileHover={{ rotateX: -4, rotateY: 6, y: -8 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                >
                  <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${cat.gradient}`} />
                  <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br p-3 ${cat.gradient}`}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white md:text-base">{feature.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/65 md:text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        <section className="pb-10">
          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-r from-[#ff6b35] via-[#e84393] to-[#6c5ce7] p-8 md:p-14"
            style={{ perspective: 900, transformStyle: 'preserve-3d' }}
            {...cardTilt}
          >
            <div className="relative z-10 text-center">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                <Smartphone className="h-4 w-4" /> Smart School Platform
              </p>
              <h2 className="text-3xl font-black text-white md:text-5xl" style={{ fontFamily: 'Sora, sans-serif' }}>Ready to Automate Your School?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-white/85 md:text-lg">
                Attendance, timetable, security, communication and analytics in one bright, powerful system.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/signup">
                  <Button className="h-14 rounded-2xl bg-white px-8 text-base font-bold text-black hover:bg-white/90">
                    Get Started — It's Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="h-14 rounded-2xl border-white/50 bg-transparent px-8 text-base font-bold text-white hover:bg-white/15">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <Dialog open={Boolean(activeProfile)} onOpenChange={(open) => !open && setActiveProfile(null)}>
          <DialogContent className="max-w-md rounded-2xl border-border/70 bg-card/95 p-0 backdrop-blur-xl">
            {activeProfile && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <DialogHeader className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    {activeProfile.image ? (
                      <img src={activeProfile.image} alt={activeProfile.name} className="h-16 w-16 rounded-xl border border-border/60 object-cover" />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-lg font-semibold text-primary">
                        {activeProfile.name.slice(0, 1)}
                      </div>
                    )}
                    <div>
                      <DialogTitle className="text-xl">{activeProfile.name}</DialogTitle>
                      <p className="text-sm text-muted-foreground">{activeProfile.role}</p>
                    </div>
                  </div>
                  <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                    {activeProfile.bio}
                  </DialogDescription>
                </DialogHeader>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </PageLayout>
    </PageTransition>
  );
};

export default Index;
