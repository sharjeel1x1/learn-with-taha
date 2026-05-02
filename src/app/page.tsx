'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  BookOpen, Mic, Brain, Languages, Clock, Users, UserCheck, Award,
  Phone, MessageCircle, Menu, X, Star, ChevronDown, ChevronLeft,
  ChevronRight, Check, Send, Heart, Sparkles, GraduationCap,
  ArrowRight, Play, Quote, Globe, Shield, Monitor, BookMarked,
} from 'lucide-react';
import Image from 'next/image';

/* ============================================================
   DEFAULTS & HARDCODED DATA
   ============================================================ */

const DEFAULTS: Record<string, string> = {
  site_name: 'Learn with Taha',
  tagline: 'Embark on Your Sacred Quran Journey',
  phone_number: '+92 329 9788881',
  whatsapp_number: '+923299788881',
  email: 'learnwithtaha1a@gmail.com',
  image_logo: '/logo.png',
  image_tutor: '/images/tutor.jpeg',
  image_hero_bg: '/images/hero-bg.png',
  hero_subtitle: 'Personalized Tajweed & Memorization Classes for All Ages',
  hero_description: 'Connect with the Holy Quran from the comfort of your home with expert guidance.',
  about_title: 'Meet Your Teacher',
  about_description: 'Hafiz Taha is a dedicated Quran teacher with over 8 years of experience in teaching Quran online. He holds an Ijazah in Hifz and Tajweed, and has helped hundreds of students from around the world in their Quran learning journey. His teaching methodology combines traditional Islamic scholarship with modern interactive techniques, making Quran learning accessible and engaging for students of all ages.',
  about_experience: '8+',
  about_students: '500+',
  about_countries: '25+',
  about_rating: '4.9',
  footer_about: 'Learn with Taha is dedicated to providing quality Quran education to students worldwide. Our mission is to make Quran learning accessible, enjoyable, and spiritually enriching for everyone.',
  footer_copyright: '© 2024 Learn with Taha. All rights reserved.',
};

const testimonials = [
  {
    text: 'Alhamdulillah, Hafiz Taha has been an incredible teacher for my children. His patience and dedication to teaching Tajweed is unmatched. My kids have improved so much in just a few months!',
    name: 'Ahmed K.',
    role: 'Parent from USA',
    rating: 5,
    id: '0',
    order: 0,
  },
  {
    text: "I started my Hifz journey with Hafiz Taha 2 years ago, and I'm now halfway through the Quran. His memorization techniques and constant encouragement keep me motivated. Highly recommended!",
    name: 'Fatima S.',
    role: 'Student from UK',
    rating: 5,
    id: '1',
    order: 1,
  },
  {
    text: 'As an adult learner, I was nervous about starting Quran classes. Hafiz Taha made me feel comfortable from day one. His teaching style is clear, and he explains everything with such wisdom.',
    name: 'Ibrahim M.',
    role: 'Student from Canada',
    rating: 5,
    id: '2',
    order: 2,
  },
];

const courses = [
  {
    icon: BookOpen,
    title: 'Noorani Qaida',
    description: 'The foundation of Quranic learning. Perfect for beginners and children to learn Arabic letters, pronunciation, and basic reading skills.',
  },
  {
    icon: Mic,
    title: 'Tajweed & Recitation',
    description: 'Master the art of beautiful Quran recitation. Learn the rules of Tajweed and apply them to recite the Quran as it was revealed.',
  },
  {
    icon: Brain,
    title: 'Hifz (Memorization)',
    description: 'A structured program for memorizing the Holy Quran with proper retention techniques, regular revision, and spiritual guidance.',
  },
  {
    icon: Languages,
    title: 'Quran Translation',
    description: 'Understand the meanings and messages of the Holy Quran. Learn Arabic vocabulary and translation to deepen your connection.',
  },
];

const features = [
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Schedule classes at your convenience. We accommodate all time zones and work around your busy schedule.',
  },
  {
    icon: Users,
    title: '1-on-1 Sessions',
    description: 'Personalized attention in every class. Your learning pace and needs are our top priority.',
  },
  {
    icon: UserCheck,
    title: 'Male & Female Tutors',
    description: 'We have qualified male and female tutors available to ensure comfort for all students.',
  },
  {
    icon: Award,
    title: 'Ijazah Certificate',
    description: 'Upon completion, receive a certified Ijazah recognizing your achievement and authorization.',
  },
];

const pricingPlans = [
  {
    id: 'f1',
    name: 'Free Trial',
    price: 'Free',
    period: '',
    description: 'Try a class before committing',
    features: ['1 Free Trial Class', 'No Commitment Required', 'Meet Your Teacher', 'Assess Your Level'],
    highlighted: false,
    badge: null,
    order: 0,
  },
  {
    id: 's1',
    name: 'Standard',
    price: '$50',
    period: '/month',
    description: 'Most popular choice for serious learners',
    features: ['22 Classes per Month', '1-on-1 Sessions', 'Tajweed & Namaz', 'Progress Reports', 'Priority Scheduling'],
    highlighted: true,
    badge: 'Popular',
    order: 1,
  },
  {
    id: 'p1',
    name: 'Premium',
    price: '$85',
    period: '/month',
    description: 'Intensive program for dedicated students',
    features: ['30 Classes per Month', '1-on-1 Sessions', 'Full Tajweed & Hifz & Translate', 'Weekly Progress Reports', 'Priority Scheduling', 'Ijazah Preparation'],
    highlighted: false,
    badge: null,
    order: 2,
  },
  {
    id: 'b1',
    name: 'Basic',
    price: '$35',
    period: '/month',
    description: 'Great for casual learners',
    features: ['22 Classes per Month', '1-on-1 Sessions', 'Tajweed Basics', 'Flexible Schedule'],
    highlighted: false,
    badge: null,
    order: 3,
  },
];

const WHATSAPP_LINK = `https://wa.me/${DEFAULTS.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Assalamu Alaikum! I am interested in Quran classes.')}`;

/* ============================================================
   MATRIX RAIN CHARACTERS
   ============================================================ */
const ARABIC_CHARS = 'بسماللهالرحمنالرحيماقرأ';

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */

export default function HomePage() {
  const s = (key: string) => DEFAULTS[key] || '';

  /* --- State --- */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  /* --- Refs --- */
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  /* --- Toast --- */
  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  /* --- Scroll listener --- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* --- Intersection Observer for animations --- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleSections((prev) => new Set(prev).add(id));
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* --- Register section refs --- */
  const registerSection = useCallback((id: string) => (el: HTMLElement | null) => {
    if (el) sectionsRef.current.set(id, el);
  }, []);

  /* --- Testimonial auto-rotate --- */
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  /* --- Contact form handler --- */
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormSubmitted(true);
    showToast('JazakAllah! Message sent successfully.');
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 5000);
    setFormSubmitting(false);
  };

  /* --- Smooth scroll to section --- */
  const scrollTo = (id: string) => {
    const el = sectionsRef.current.get(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  /* --- Nav links --- */
  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Courses', id: 'courses' },
    { label: 'Why Us', id: 'features' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Contact', id: 'contact' },
  ];

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <>
      {/* ===== TOAST ===== */}
      {toast && (
        <div className="fixed top-6 right-6 z-[9999] animate-[fadeInDown_0.4s_ease]">
          <div
            className={`px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white'
                : 'bg-gradient-to-r from-red-500/90 to-rose-600/90 text-white'
            }`}
          >
            {toast.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      {/* ===== SPACE BACKGROUND ===== */}
      <div className="space-bg">
        <div className="aurora" />
        <div className="space-grid" />

        {/* Nebulae */}
        <div
          className="nebula"
          style={{
            width: 400, height: 400,
            top: '10%', left: '-5%',
            background: 'radial-gradient(circle, rgba(0,180,255,0.08), transparent 70%)',
            '--nebula-duration': '25s',
            '--nebula-delay': '0s',
          } as React.CSSProperties}
        />
        <div
          className="nebula"
          style={{
            width: 300, height: 300,
            top: '50%', right: '-5%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%)',
            '--nebula-duration': '30s',
            '--nebula-delay': '5s',
          } as React.CSSProperties}
        />
        <div
          className="nebula"
          style={{
            width: 250, height: 250,
            bottom: '10%', left: '30%',
            background: 'radial-gradient(circle, rgba(0,180,255,0.05), transparent 70%)',
            '--nebula-duration': '20s',
            '--nebula-delay': '10s',
          } as React.CSSProperties}
        />

        {/* Matrix rain */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`matrix-${i}`}
            className="matrix-particle"
            style={{
              left: `${(i * 7) % 100}%`,
              animationDuration: `${12 + (i * 3) % 20}s`,
              animationDelay: `${(i * 2) % 10}s`,
              fontSize: `${12 + (i * 2) % 8}px`,
            }}
          >
            {ARABIC_CHARS[i % ARABIC_CHARS.length]}
          </div>
        ))}

        {/* Particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`particle ${i % 5 === 0 ? 'white' : ''}`}
            style={{
              left: `${(i * 4.1) % 100}%`,
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
              animationDuration: `${8 + (i * 3) % 20}s`,
              animationDelay: `${(i * 1.5) % 10}s`,
            }}
          />
        ))}
      </div>

      {/* ===== NAVBAR ===== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-[#050508]/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-[rgba(0,180,255,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 group">
              <Image
                src={s('image_logo')}
                alt={s('site_name')}
                width={42}
                height={42}
                className="rounded-full group-hover:shadow-[0_0_20px_rgba(0,180,255,0.4)] transition-shadow duration-300"
              />
              <div>
                <span className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-bold text-[var(--text-light)] group-hover:text-[var(--accent-neon)] transition-colors">
                  {s('site_name')}
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSection === link.id
                      ? 'text-[var(--accent-neon)] bg-[rgba(0,180,255,0.1)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-light)] hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex btn btn-whatsapp text-sm py-2 px-4"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[var(--text-light)] hover:text-[var(--accent-neon)] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#050508]/95 backdrop-blur-xl border-t border-[rgba(0,180,255,0.1)] px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeSection === link.id
                    ? 'text-[var(--accent-neon)] bg-[rgba(0,180,255,0.1)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-light)] hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 flex gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn btn-whatsapp text-sm py-2.5 justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={`tel:${s('phone_number')}`}
                className="flex-1 btn btn-call text-sm py-2.5 justify-center"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section
        id="hero"
        ref={registerSection('hero')}
        data-animate
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Hero BG */}
        <div className="absolute inset-0 z-0">
          <Image
            src={s('image_hero_bg')}
            alt="Hero background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-[#050508]/80 to-[#050508]" />
        </div>

        {/* Geometric shapes */}
        <div className="geo-shape" style={{ width: 200, height: 200, top: '15%', right: '10%' }} />
        <div className="geo-shape" style={{ width: 120, height: 120, bottom: '20%', left: '5%' }} />
        <div
          className="geo-shape"
          style={{ width: 80, height: 80, top: '40%', left: '15%', borderRadius: '20%' }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
          {/* Arabic Bismillah */}
          <p
            className="font-[family-name:var(--font-arabic)] text-3xl sm:text-4xl md:text-5xl text-[var(--accent-neon)] mb-6 neon-text"
            style={{ animation: 'fadeInUp 0.8s ease forwards' }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          {/* Certified Badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgba(0,180,255,0.1)] border border-[rgba(0,180,255,0.2)] mb-6"
            style={{ animation: 'fadeInUp 0.8s ease 0.1s both' }}
          >
            <Sparkles className="w-4 h-4 text-[var(--accent-neon)]" />
            <span className="text-sm text-[var(--accent-neon)] font-medium">Certified Hafiz &amp; Online Tutor</span>
          </div>

          {/* Main heading */}
          <h1
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-light)] mb-6 leading-tight"
            style={{ animation: 'fadeInUp 0.8s ease 0.2s both' }}
          >
            Learn Quran{' '}
            <span className="gradient-text">Online</span>{' '}
            with{' '}
            <span className="gradient-text">Hafiz Taha</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-[var(--accent-neon)] font-medium mb-4"
            style={{ animation: 'fadeInUp 0.8s ease 0.35s both' }}
          >
            {s('hero_subtitle')}
          </p>

          {/* Description */}
          <p
            className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-6 leading-relaxed"
            style={{ animation: 'fadeInUp 0.8s ease 0.45s both' }}
          >
            {s('hero_description')}
          </p>

          {/* Phone Number Display */}
          <div
            className="mb-8"
            style={{ animation: 'fadeInUp 0.8s ease 0.55s both' }}
          >
            <a
              href={`tel:${s('phone_number')}`}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-[var(--accent-neon)] text-[var(--accent-neon)] hover:bg-[rgba(0,180,255,0.1)] transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg font-semibold">{s('phone_number')}</span>
            </a>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ animation: 'fadeInUp 0.8s ease 0.6s both' }}
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-lg">
              <MessageCircle className="w-5 h-5" />
              Start Free Trial
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp text-lg">
              <Phone className="w-5 h-5" />
              Call Taha Now
            </a>
          </div>

          {/* Stats bar */}
          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto"
            style={{ animation: 'fadeInUp 0.8s ease 0.8s both' }}
          >
            {[
              { value: s('about_students'), label: 'Students Worldwide' },
              { value: s('about_experience'), label: 'Years Experience' },
              { value: s('about_countries'), label: 'Countries' },
              { value: s('about_rating'), label: 'Student Rating' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-16 flex justify-center"
            style={{ animation: 'fadeInUp 0.8s ease 1s both' }}
          >
            <button
              onClick={() => scrollTo('about')}
              className="text-[var(--text-muted)] hover:text-[var(--accent-neon)] transition-colors"
              style={{ animation: 'bounce-scroll 2s infinite' }}
              aria-label="Scroll to about"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== NEON DIVIDER ===== */}
      <div className="neon-divider" />

      {/* ===== ABOUT SECTION ===== */}
      <section
        id="about"
        ref={registerSection('about')}
        data-animate
        className="section-padding relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${visibleSections.has('about') ? '' : 'opacity-0'}`}>
            {/* Image side */}
            <div className={`${visibleSections.has('about') ? 'slide-left visible' : 'slide-left'}`}>
              <div className="relative">
                <div className="relative z-10 rounded-2xl overflow-hidden border border-[rgba(0,180,255,0.15)] shadow-2xl shadow-black/30">
                  <Image
                    src={s('image_tutor')}
                    alt="Hafiz Taha"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Glow behind */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[rgba(0,180,255,0.1)] to-transparent rounded-3xl blur-xl -z-10" />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-[var(--surface)] border border-[rgba(0,180,255,0.2)] rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-[var(--accent-neon)]" />
                    <div>
                      <div className="text-xs text-[var(--text-muted)]">Certified</div>
                      <div className="text-sm font-semibold text-[var(--text-light)]">Ijazah Holder</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className={`${visibleSections.has('about') ? 'slide-right visible' : 'slide-right'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,180,255,0.08)] border border-[rgba(0,180,255,0.15)] mb-6">
                <GraduationCap className="w-4 h-4 text-[var(--accent-neon)]" />
                <span className="text-sm text-[var(--accent-neon)] font-medium">About Your Teacher</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[var(--text-light)] mb-6">
                {s('about_title')}
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-base sm:text-lg mb-8">
                {s('about_description')}
              </p>

              {/* Feature grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, label: 'Noorani Qaida' },
                  { icon: Mic, label: 'Tajweed Expert' },
                  { icon: Brain, label: 'Hifz Program' },
                  { icon: Heart, label: 'Child-Friendly' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,180,255,0.04)] border border-[rgba(0,180,255,0.08)] hover:border-[rgba(0,180,255,0.2)] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[rgba(0,180,255,0.1)] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[var(--accent-neon)]" />
                    </div>
                    <span className="text-sm font-medium text-[var(--text-light)]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COURSES SECTION ===== */}
      <section
        id="courses"
        ref={registerSection('courses')}
        data-animate
        className="section-padding relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,180,255,0.08)] border border-[rgba(0,180,255,0.15)] mb-4">
              <BookMarked className="w-4 h-4 text-[var(--accent-neon)]" />
              <span className="text-sm text-[var(--accent-neon)] font-medium">Our Courses</span>
            </div>
            <h2 className="section-title">What We Offer</h2>
            <p className="section-subtitle">
              Comprehensive Quran education programs designed to take you from beginner to advanced levels
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <div
                key={i}
                className={`card-shine group rounded-2xl p-6 bg-[var(--card)] border border-[rgba(0,180,255,0.08)] hover:border-[rgba(0,180,255,0.25)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[rgba(0,180,255,0.08)] ${
                  visibleSections.has('courses') ? 'scale-in visible' : 'scale-in'
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[rgba(0,180,255,0.15)] to-[rgba(0,212,255,0.05)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <course.icon className="w-7 h-7 text-[var(--accent-neon)]" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-light)] mb-3">
                  {course.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEON DIVIDER ===== */}
      <div className="neon-divider" />

      {/* ===== WHY US / FEATURES SECTION ===== */}
      <section
        id="features"
        ref={registerSection('features')}
        data-animate
        className="section-padding relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,180,255,0.08)] border border-[rgba(0,180,255,0.15)] mb-4">
              <Sparkles className="w-4 h-4 text-[var(--accent-neon)]" />
              <span className="text-sm text-[var(--accent-neon)] font-medium">Why Choose Us</span>
            </div>
            <h2 className="section-title">Why Learn with Taha?</h2>
            <p className="section-subtitle">
              We provide the best online Quran learning experience with features that set us apart
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`card-shine group rounded-2xl p-6 bg-[var(--card)] border border-[rgba(0,180,255,0.08)] hover:border-[rgba(0,180,255,0.25)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[rgba(0,180,255,0.08)] text-center ${
                  visibleSections.has('features') ? 'fade-in visible' : 'fade-in'
                }`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[rgba(0,180,255,0.15)] to-[rgba(0,212,255,0.05)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-[var(--accent-neon)]" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[var(--text-light)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Additional trust badges */}
          <div
            className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 ${visibleSections.has('features') ? 'fade-in visible' : 'fade-in'}`}
          >
            {[
              { icon: Globe, text: 'Students in 25+ Countries' },
              { icon: Shield, text: 'Safe & Secure Platform' },
              { icon: Monitor, text: 'Interactive Online Classes' },
              { icon: Heart, text: 'Child-Friendly Environment' },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-[rgba(0,180,255,0.03)] border border-[rgba(0,180,255,0.06)]"
              >
                <badge.icon className="w-5 h-5 text-[var(--accent-neon)] flex-shrink-0" />
                <span className="text-xs sm:text-sm text-[var(--text-muted)]">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section
        id="testimonials"
        ref={registerSection('testimonials')}
        data-animate
        className="section-padding relative"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,180,255,0.08)] border border-[rgba(0,180,255,0.15)] mb-4">
              <Heart className="w-4 h-4 text-[var(--accent-neon)]" />
              <span className="text-sm text-[var(--accent-neon)] font-medium">Testimonials</span>
            </div>
            <h2 className="section-title">What Our Students Say</h2>
            <p className="section-subtitle">
              Hear from our students and their families about their Quran learning experience
            </p>
          </div>

          {/* Testimonial Card */}
          <div
            className={`relative ${visibleSections.has('testimonials') ? 'scale-in visible' : 'scale-in'}`}
          >
            <div className="rounded-2xl p-8 md:p-12 bg-[var(--card)] border border-[rgba(0,180,255,0.1)] relative overflow-hidden">
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-24 h-24 text-[var(--accent-neon)]" />
              </div>

              <div className="relative z-10 text-center">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl text-[var(--text-light)] leading-relaxed mb-8 max-w-3xl mx-auto italic">
                  &ldquo;{testimonials[testimonialIndex].text}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[var(--accent-neon)] to-[var(--accent-neon-dark)] flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-white">
                      {testimonials[testimonialIndex].name.charAt(0)}
                    </span>
                  </div>
                  <p className="font-semibold text-[var(--text-light)]">
                    {testimonials[testimonialIndex].name}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">{testimonials[testimonialIndex].role}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() =>
                  setTestimonialIndex(
                    (prev) => (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="w-10 h-10 rounded-full border border-[rgba(0,180,255,0.2)] flex items-center justify-center text-[var(--accent-neon)] hover:bg-[rgba(0,180,255,0.1)] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === testimonialIndex
                        ? 'bg-[var(--accent-neon)] w-8'
                        : 'bg-[rgba(0,180,255,0.2)] hover:bg-[rgba(0,180,255,0.4)]'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
                }
                className="w-10 h-10 rounded-full border border-[rgba(0,180,255,0.2)] flex items-center justify-center text-[var(--accent-neon)] hover:bg-[rgba(0,180,255,0.1)] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEON DIVIDER ===== */}
      <div className="neon-divider" />

      {/* ===== PRICING SECTION ===== */}
      <section
        id="pricing"
        ref={registerSection('pricing')}
        data-animate
        className="section-padding relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,180,255,0.08)] border border-[rgba(0,180,255,0.15)] mb-4">
              <Award className="w-4 h-4 text-[var(--accent-neon)]" />
              <span className="text-sm text-[var(--accent-neon)] font-medium">Pricing Plans</span>
            </div>
            <h2 className="section-title">Choose Your Plan</h2>
            <p className="section-subtitle">
              Affordable plans designed to fit every budget. Start with a free trial today!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans
              .sort((a, b) => a.order - b.order)
              .map((plan, i) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 ${
                    plan.highlighted
                      ? 'bg-gradient-to-b from-[rgba(0,212,255,0.08)] to-[var(--card)] border-2 border-[rgba(0,212,255,0.3)] glow-ring'
                      : 'bg-[var(--card)] border border-[rgba(0,180,255,0.08)] hover:border-[rgba(0,180,255,0.2)]'
                  } ${
                    visibleSections.has('pricing') ? 'fade-in visible' : 'fade-in'
                  }`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[var(--accent-neon)] to-[var(--accent-neon-glow)] text-[#050508] text-xs font-bold">
                      {plan.badge}
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-light)] mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                      {plan.period && (
                        <span className="text-[var(--text-muted)] text-sm">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[var(--accent-neon)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--text-muted)]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn w-full justify-center ${
                      plan.highlighted ? 'btn-highlighted' : 'btn-secondary'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Book Now
                  </a>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section
        id="contact"
        ref={registerSection('contact')}
        data-animate
        className="section-padding relative"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,180,255,0.08)] border border-[rgba(0,180,255,0.15)] mb-4">
              <Send className="w-4 h-4 text-[var(--accent-neon)]" />
              <span className="text-sm text-[var(--accent-neon)] font-medium">Get in Touch</span>
            </div>
            <h2 className="section-title">Contact Us</h2>
            <p className="section-subtitle">
              Have a question or ready to start? Reach out to us and we&apos;ll get back to you promptly.
            </p>
          </div>

          <div className={`grid lg:grid-cols-5 gap-8 ${visibleSections.has('contact') ? 'fade-in visible' : 'fade-in'}`}>
            {/* Left — Contact Cards */}
            <div className="lg:col-span-3 space-y-5">
              {/* Phone Card */}
              <a
                href={`tel:${s('phone_number')}`}
                className="group flex items-center gap-5 p-5 rounded-2xl bg-[var(--card)] border border-[rgba(0,180,255,0.08)] hover:border-[rgba(0,180,255,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(0,180,255,0.06)]"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[rgba(0,180,255,0.15)] to-[rgba(0,180,255,0.05)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-[var(--accent-neon)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Phone</p>
                  <p className="text-lg font-semibold text-[var(--text-light)] truncate">{s('phone_number')}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-neon)] group-hover:translate-x-1 transition-all duration-300" />
              </a>

              {/* WhatsApp Card */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-5 rounded-2xl bg-[var(--card)] border border-[rgba(37,211,102,0.08)] hover:border-[rgba(37,211,102,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(37,211,102,0.06)]"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[rgba(37,211,102,0.15)] to-[rgba(37,211,102,0.05)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">WhatsApp</p>
                  <p className="text-lg font-semibold text-[var(--text-light)]">{s('phone_number')}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-300" />
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${s('email')}`}
                className="group flex items-center gap-5 p-5 rounded-2xl bg-[var(--card)] border border-[rgba(0,180,255,0.08)] hover:border-[rgba(0,180,255,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(0,180,255,0.06)]"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[rgba(0,180,255,0.15)] to-[rgba(0,180,255,0.05)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Send className="w-6 h-6 text-[var(--accent-neon)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Email</p>
                  <p className="text-lg font-semibold text-[var(--text-light)] truncate">{s('email')}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-neon)] group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </div>

            {/* Right — CTA Card */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl p-8 bg-gradient-to-br from-[rgba(37,211,102,0.08)] to-[rgba(0,180,255,0.04)] border border-[rgba(37,211,102,0.15)] h-full flex flex-col justify-center text-center">
                {/* Decorative glow */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[rgba(37,211,102,0.06)] rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[rgba(0,180,255,0.06)] rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center mb-6 shadow-lg shadow-[rgba(37,211,102,0.2)]">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-light)] mb-3">
                    Ready to Start?
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
                    Book your free trial class today and experience the difference. No commitment required!
                  </p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp w-full justify-center text-base py-4"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Book Free Trial on WhatsApp
                  </a>
                  <p className="text-xs text-[var(--text-muted)] mt-4 flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Response within 1 hour, InshaAllah
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[rgba(0,180,255,0.08)] bg-[var(--secondary-deep)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={s('image_logo')}
                  alt={s('site_name')}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-light)]">
                  {s('site_name')}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s('footer_about')}</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-[var(--text-light)] mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-neon)] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-[var(--text-light)] mb-4">Contact</h4>
              <div className="space-y-3">
                <a
                  href={`tel:${s('phone_number')}`}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-neon)] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {s('phone_number')}
                </a>
                <a
                  href={`mailto:${s('email')}`}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-neon)] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {s('email')}
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="neon-divider mt-12 mb-6" />
          <div className="text-center text-sm text-[var(--text-muted)]">
            {s('footer_copyright')}
          </div>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[rgba(37,211,102,0.3)] hover:shadow-xl hover:shadow-[rgba(37,211,102,0.5)] transition-shadow"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* ===== FLOATING CALL BUTTON (mobile) ===== */}
      <a
        href={`tel:${s('phone_number')}`}
        className="fixed bottom-6 left-6 z-[90] w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent-neon)] to-[var(--accent-neon-dark)] flex items-center justify-center shadow-lg shadow-[rgba(0,180,255,0.3)] md:hidden"
        aria-label="Call us"
      >
        <Phone className="w-7 h-7 text-white" />
      </a>
    </>
  );
}
