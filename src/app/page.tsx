"use client";

import { useState, useEffect, useCallback } from "react";
import {
  TrendingUp, Target, AlertTriangle, CheckCircle, BarChart3,
  Globe, Car, MapPin, Star, Lightbulb, Database, Shield,
  ArrowUpRight, ArrowDownRight, Menu, X, Languages, Sparkles, Zap,
} from "lucide-react";
import {
  GlobalSalesChart, RegionPieChart, TopModelsChart,
  EgyptPricesChart, RatingsChart, CategoryPieChart,
} from "@/components/Charts";
import { stats, egyptModels } from "@/lib/data";
import {
  AnimateOnScroll, StaggerChildren, AnimatedCounter, HoverScale,
  Tilt3D, ScrollProgress, FloatingParticles, TypeWriter,
  GlowCard,
} from "@/components/Animate";
import { useLang } from "@/components/LangProvider";
import { t } from "@/lib/translations";

/* ───────── Stat Card with 3D tilt ───────── */

function StatCard({ icon: Icon, label, value, numValue, suffix, sub, color, delay, gradient }: {
  icon: React.ElementType; label: string; value: string;
  numValue?: number; suffix?: string;
  sub?: string; color: string; delay: number; gradient: string;
}) {
  return (
    <AnimateOnScroll delay={delay} direction="up">
      <Tilt3D intensity={10}>
        <div className="relative group overflow-hidden rounded-2xl p-5 sm:p-7 glass animate-border-glow
          hover:border-white/60 transition-all duration-500">
          {/* Colored glow on hover */}
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-0
            group-hover:opacity-50 transition-opacity duration-700"
            style={{ background: color }} />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm lg:text-base text-gray-600 font-semibold">{label}</span>
              <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center
                shadow-lg animate-icon-bounce"
                style={{ background: `linear-gradient(135deg, ${gradient})` }}>
                <Icon size={22} className="text-white" />
              </div>
            </div>
            <p className="text-3xl lg:text-4xl font-extrabold text-gray-900 stat-glow">
              {numValue != null ? (
                <AnimatedCounter target={numValue} suffix={suffix || ""} decimals={suffix === "M" || suffix === "" ? 2 : 0} duration={2200} />
              ) : value}
            </p>
            {sub && <p className="text-sm text-gray-500 mt-2 font-medium">{sub}</p>}
          </div>

          {/* Continuous shimmer line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 shimmer-continuous"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
        </div>
      </Tilt3D>
    </AnimateOnScroll>
  );
}

/* ───────── Section Title with animated line ───────── */

function SectionTitle({ icon: Icon, title, subtitle, id, color = "#007BFF" }: {
  icon: React.ElementType; title: string; subtitle: string; id: string; color?: string;
}) {
  return (
    <AnimateOnScroll direction="up">
      <div id={id} className="mb-8 scroll-mt-24">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center
            shadow-lg glow-pulse animate-icon-bounce"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">{title}</h2>
            <p className="text-sm lg:text-base text-gray-500 font-medium">{subtitle}</p>
          </div>
        </div>
        <div className="section-divider" />
      </div>
    </AnimateOnScroll>
  );
}

/* ───────── Glass Chart Card ───────── */

function ChartCard({ children, className = "", glow }: { children: React.ReactNode; className?: string; glow?: string }) {
  return (
    <div className={`relative group overflow-hidden ${className}`}>
      {glow && (
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
          style={{ background: `linear-gradient(135deg, ${glow}40, ${glow}20)` }} />
      )}
      <div className="relative glass rounded-2xl p-5 sm:p-7 animate-border-glow
        transition-all duration-500 hover:shadow-xl hover:shadow-black/8">
        {children}
      </div>
    </div>
  );
}

function InsightBadge({ text, type = "info" }: { text: string; type?: "info" | "success" | "warning" }) {
  const styles = {
    info: { bg: "rgba(0,123,255,0.1)", color: "#007BFF", border: "rgba(0,123,255,0.2)" },
    success: { bg: "rgba(0,201,167,0.1)", color: "#00C9A7", border: "rgba(0,201,167,0.2)" },
    warning: { bg: "rgba(255,140,0,0.1)", color: "#FF8C00", border: "rgba(255,140,0,0.2)" },
  };
  const s = styles[type];
  return (
    <span className="inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {text}
    </span>
  );
}

/* ───────── Sidebar Navigation ───────── */

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, toggle } = useLang();
  const [activeId, setActiveId] = useState("intro");

  const navItems = [
    { id: "intro", label: t.navIntro[lang], icon: Globe },
    { id: "problem", label: t.navProblem[lang], icon: AlertTriangle },
    { id: "eda", label: t.navEda[lang], icon: Database },
    { id: "global", label: t.navGlobal[lang], icon: TrendingUp },
    { id: "region", label: t.navRegion[lang], icon: MapPin },
    { id: "models", label: t.navModels[lang], icon: Car },
    { id: "egypt", label: t.navEgypt[lang], icon: BarChart3 },
    { id: "ratings", label: t.navRatings[lang], icon: Star },
    { id: "recommendations", label: t.navRecommendations[lang], icon: Lightbulb },
  ];

  /* Scroll spy */
  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    function onScroll() {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveId(ids[i]);
          break;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed top-0 h-full w-64 glass-dark text-white z-50
        flex flex-col shadow-2xl transition-all duration-300
        ${lang === "ar" ? "right-0" : "left-0"}
        ${open ? "translate-x-0 visible" : (lang === "ar" ? "translate-x-full invisible lg:visible" : "-translate-x-full invisible lg:visible")}
        lg:translate-x-0`}>

        {/* Logo area */}
        <div className="p-5 sm:p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700
              flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">{t.sidebarTitle[lang]}</h1>
              <p className="text-[10px] text-blue-300/70 uppercase tracking-widest">{t.sidebarSub[lang]}</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/10 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Language toggle */}
        <button onClick={toggle}
          className="mx-4 mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl
            bg-gradient-to-r from-blue-500/10 to-purple-500/10
            hover:from-blue-500/20 hover:to-purple-500/20
            border border-white/5 hover:border-white/15 transition-all text-sm group">
          <Languages size={16} className="text-blue-400 group-hover:rotate-12 transition-transform" />
          <span className="text-gray-300 text-xs font-medium">{lang === "ar" ? "English" : "عربي"}</span>
        </button>

        <nav className="flex-1 p-3 mt-2 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeId === id;
            return (
              <a key={id} href={`#${id}`} onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm mb-1 transition-all duration-300 group
                  ${isActive
                    ? "nav-active bg-gradient-to-r from-blue-500/15 to-purple-500/10 text-white shadow-lg shadow-blue-500/5"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                  ${isActive
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-500/30"
                    : "bg-white/5 group-hover:bg-white/10"}`}>
                  <Icon size={16} className={isActive ? "text-white" : "text-gray-500 group-hover:text-blue-400"} />
                </div>
                <span className="font-medium">{label}</span>
                {isActive && (
                  <div className={`w-1.5 h-1.5 rounded-full bg-blue-400 ${lang === "ar" ? "mr-auto" : "ml-auto"} animate-pulse`} />
                )}
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="text-center">
            <p className="text-[10px] text-gray-600 uppercase tracking-wider">{t.sidebarFooter[lang]}</p>
            <div className="mt-2 h-0.5 w-12 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30" />
          </div>
        </div>
      </aside>
    </>
  );
}

/* ───────── MAIN PAGE ───────── */

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { lang } = useLang();

  return (
    <div className="flex relative overflow-x-hidden max-w-[100vw]">
      <ScrollProgress />
      <FloatingParticles />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 lg:hidden glass-dark
        flex items-center justify-between px-4 py-3 shadow-lg border-b border-white/5">
        <button onClick={() => setSidebarOpen(true)} className="text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <Zap size={12} className="text-white" />
          </div>
          <span className="text-white font-bold text-sm tracking-wide">SUZUKI</span>
        </div>
        <div className="w-8" />
      </div>

      <main className={`flex-1 min-h-screen p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 relative z-10
        ${lang === "ar" ? "lg:mr-64" : "lg:ml-64"}`}>

        {/* ═══════ Hero Header ═══════ */}
        <div id="intro" className="scroll-mt-20 relative overflow-hidden rounded-2xl sm:rounded-3xl
          p-6 sm:p-10 lg:p-12 mb-8 sm:mb-10 text-white shadow-2xl">

          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#162240] to-[#0a1628]" />

          {/* Floating blobs */}
          <div className="absolute top-[-40px] left-[-40px] w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-blob1" />
          <div className="absolute bottom-[-60px] right-[-30px] w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-blob2" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-blob3" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "30px 30px" }} />

          {/* Sparkle accents */}
          <div className="absolute top-8 right-16 sm:right-24 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute top-20 right-8 sm:right-12 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-12 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1.5 bg-blue-500/15 border border-blue-400/20 rounded-full text-xs text-blue-300
                backdrop-blur flex items-center gap-1.5">
                <Sparkles size={12} />
                {t.heroBadge1[lang]}
              </span>
              <span className="px-3 py-1.5 bg-red-500/15 border border-red-400/20 rounded-full text-xs text-red-300 backdrop-blur">
                {t.heroBadge2[lang]}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              <TypeWriter text={t.heroTitle[lang]} speed={40} />
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl leading-relaxed">
              {t.heroDesc[lang]}
            </p>

            {/* Animated stats mini bar */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 pt-6 border-t border-white/10">
              {[
                { val: "3.25M", label: lang === "ar" ? "مبيعات" : "Sales" },
                { val: "+190", label: lang === "ar" ? "دولة" : "Countries" },
                { val: "10", label: lang === "ar" ? "موديل" : "Models" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300
                    bg-clip-text text-transparent">{s.val}</span>
                  <span className="text-sm text-gray-300 font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ Stats Row ═══════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-10 sm:mb-12">
          <StatCard icon={TrendingUp} label={t.statGlobalSales[lang]} value="3.25M"
            numValue={3.25} suffix="M" gradient="#007BFF, #0066dd"
            sub={t.statGlobalSub[lang]} color="#007BFF" delay={100} />
          <StatCard icon={Globe} label={t.statCountries[lang]} value="+190"
            numValue={190} suffix="+" gradient="#00C9A7, #00b096"
            sub={t.statCountriesSub[lang]} color="#00C9A7" delay={200} />
          <StatCard icon={Car} label={t.statModels[lang]} value="10"
            numValue={10} suffix="" gradient="#FF8C00, #e07d00"
            sub={t.statModelsSub[lang]} color="#FF8C00" delay={300} />
          <StatCard icon={Star} label={t.statRating[lang]} value="4.17"
            numValue={4.17} suffix="" gradient="#6C5CE7, #5b4dd6"
            sub={t.statRatingSub[lang]} color="#6C5CE7" delay={400} />
        </div>

        {/* ═══════ Problem & Objectives ═══════ */}
        <SectionTitle icon={AlertTriangle} title={t.problemTitle[lang]}
          subtitle={t.problemSubtitle[lang]} id="problem" color="#E30013" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
          <AnimateOnScroll direction="right">
            <Tilt3D intensity={5}>
              <GlowCard color="#E30013" className="h-full">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600
                      flex items-center justify-center shadow-lg shadow-red-500/20">
                      <AlertTriangle size={18} className="text-white" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-extrabold text-red-600">{t.problemLabel[lang]}</h3>
                  </div>
                  <StaggerChildren className="space-y-3" staggerMs={150}>
                    {t.problems[lang].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100/50
                        hover:bg-red-50 hover:border-red-200 transition-all duration-300 group">
                        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center
                          justify-center text-xs font-bold shrink-0 shadow-sm group-hover:scale-110 transition-transform">{i + 1}</span>
                        <p className="text-sm lg:text-base text-gray-800 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </StaggerChildren>
                </div>
              </GlowCard>
            </Tilt3D>
          </AnimateOnScroll>

          <AnimateOnScroll direction="left">
            <Tilt3D intensity={5}>
              <GlowCard color="#00C9A7" className="h-full">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600
                      flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Target size={18} className="text-white" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-extrabold text-emerald-600">{t.objectivesLabel[lang]}</h3>
                  </div>
                  <StaggerChildren className="space-y-3" staggerMs={150}>
                    {t.objectives[lang].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/50
                        hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300 group">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500
                          flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                        <p className="text-sm lg:text-base text-gray-800 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </StaggerChildren>
                </div>
              </GlowCard>
            </Tilt3D>
          </AnimateOnScroll>
        </div>

        {/* ═══════ EDA Section ═══════ */}
        <SectionTitle icon={Database} title={t.edaTitle[lang]} subtitle={t.edaSubtitle[lang]} id="eda" color="#6C5CE7" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6">
          {[
            { title: t.edaOverview[lang], color: "#007BFF", gradient: "from-blue-500 to-blue-600", items: [`${t.edaRows[lang]}: ${stats.totalModels}`, `${t.edaCols[lang]}: ${stats.totalColumns}`, `${t.edaCategories[lang]}: ${stats.categories}`] },
            { title: t.edaQuality[lang], color: "#00C9A7", gradient: "from-emerald-500 to-emerald-600", items: [`${t.edaNulls[lang]}: ${stats.nullValues}`, `${t.edaDuplicates[lang]}: ${stats.duplicates}`, t.edaTypes[lang]] },
            { title: t.edaStats[lang], color: "#E30013", gradient: "from-red-500 to-red-600", items: [`${t.edaMinPrice[lang]}: ${stats.priceMin}K`, `${t.edaMaxPrice[lang]}: ${stats.priceMax}K`, `${t.edaAvgRating[lang]}: ${stats.avgRating}`] },
          ].map((card, i) => (
            <AnimateOnScroll key={i} delay={i * 150} direction="up">
              <Tilt3D intensity={6}>
                <ChartCard glow={card.color}>
                  <div className={`h-1.5 rounded-full mb-4 bg-gradient-to-r ${card.gradient} shadow-sm`} />
                  <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-3">{card.title}</h4>
                  <div className="space-y-2.5">
                    {card.items.map((item, j) => (
                      <p key={j} className="text-base text-gray-700 flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full shadow-sm" style={{ background: card.color }}></span>
                        {item}
                      </p>
                    ))}
                  </div>
                </ChartCard>
              </Tilt3D>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
          <AnimateOnScroll direction="right"><ChartCard glow="#6C5CE7">
            <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">{t.edaCategoryDist[lang]}</h4>
            <CategoryPieChart />
          </ChartCard></AnimateOnScroll>
          <AnimateOnScroll direction="left"><ChartCard glow="#00C9A7">
            <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">{t.edaQualityCriteria[lang]}</h4>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { label: "Accuracy", ar: t.accuracy[lang], color: "#007BFF" },
                { label: "Completeness", ar: t.completeness[lang], color: "#00C9A7" },
                { label: "Consistency", ar: t.consistency[lang], color: "#6C5CE7" },
                { label: "Relevancy", ar: t.relevancy[lang], color: "#FF8C00" },
                { label: "Validity", ar: t.validity[lang], color: "#E30013" },
                { label: "Uniqueness", ar: t.uniqueness[lang], color: "#00C9A7" },
              ].map((c, i) => (
                <AnimateOnScroll key={i} delay={i * 80} direction="up">
                  <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-white/60 border border-white/40
                    hover:bg-white/80 hover:shadow-md transition-all duration-300 group">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                      group-hover:scale-110 transition-transform"
                      style={{ background: `${c.color}15` }}>
                      <CheckCircle size={14} style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{c.label}</p>
                      <p className="text-[10px] text-gray-500">{c.ar}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </ChartCard></AnimateOnScroll>
        </div>

        {/* ═══════ Global Sales ═══════ */}
        <SectionTitle icon={TrendingUp} title={t.globalTitle[lang]} subtitle={t.globalSubtitle[lang]} id="global" />

        <AnimateOnScroll direction="up"><div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          <ChartCard className="lg:col-span-2" glow="#007BFF">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h4 className="text-base lg:text-lg font-bold text-gray-900">{t.globalTrend[lang]}</h4>
              <InsightBadge text={t.globalGrowth[lang]} type="success" />
            </div>
            <GlobalSalesChart />
          </ChartCard>
          <ChartCard glow="#6C5CE7">
            <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">{t.globalKeyPoints[lang]}</h4>
            <div className="space-y-3">
              {[
                { icon: ArrowUpRight, title: t.globalHighest[lang], desc: t.globalHighestDesc[lang], color: "#007BFF" },
                { icon: ArrowDownRight, title: t.globalLowest[lang], desc: t.globalLowestDesc[lang], color: "#E30013" },
                { icon: TrendingUp, title: t.globalRecovery[lang], desc: t.globalRecoveryDesc[lang], color: "#00C9A7" },
                { icon: Target, title: t.globalTarget[lang], desc: t.globalTargetDesc[lang], color: "#6C5CE7" },
              ].map((item, i) => (
                <AnimateOnScroll key={i} delay={i * 100} direction="left">
                  <div className="p-3 rounded-xl border border-gray-100/50 hover:border-gray-200 hover:shadow-md
                    transition-all duration-300 group" style={{ background: `${item.color}08` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center"
                        style={{ background: `${item.color}15` }}>
                        <item.icon size={14} style={{ color: item.color }} />
                      </div>
                      <span className="text-sm lg:text-base font-bold" style={{ color: item.color }}>{item.title}</span>
                    </div>
                    <p className="text-sm text-gray-700">{item.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </ChartCard>
        </div></AnimateOnScroll>

        {/* ═══════ Region Sales ═══════ */}
        <SectionTitle icon={MapPin} title={t.regionTitle[lang]} subtitle={t.regionSubtitle[lang]} id="region" color="#E30013" />

        <AnimateOnScroll direction="up"><div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          <ChartCard className="lg:col-span-2" glow="#E30013">
            <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">{t.regionChartTitle[lang]}</h4>
            <RegionPieChart />
          </ChartCard>
          <ChartCard glow="#FF8C00">
            <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">{t.regionAnalysis[lang]}</h4>
            <div className="space-y-2.5">
              {[
                { region: t.regionIndia[lang], pct: "55.1%", val: "1.79M", color: "#E30013" },
                { region: t.regionJapan[lang], pct: "22.2%", val: "722K", color: "#007BFF" },
                { region: t.regionAsia[lang], pct: "9.5%", val: "310K", color: "#00C9A7" },
                { region: t.regionEurope[lang], pct: "8.6%", val: "280K", color: "#FF8C00" },
                { region: t.regionOther[lang], pct: "4.5%", val: "145K", color: "#6C5CE7" },
              ].map((r, i) => (
                <AnimateOnScroll key={i} delay={i * 80} direction="right">
                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white/50
                    border border-white/30 hover:bg-white/70 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ background: r.color }} />
                      <span className="text-sm lg:text-base font-medium text-gray-800">{r.region}</span>
                    </div>
                    <div className={lang === "ar" ? "text-left" : "text-right"}>
                      <span className="text-sm lg:text-base font-bold text-gray-900">{r.pct}</span>
                      <span className={`text-xs text-gray-400 ${lang === "ar" ? "mr-2" : "ml-2"}`}>{r.val}</span>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200/50 backdrop-blur">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={14} className="text-amber-600" />
                <span className="text-xs font-bold text-amber-700">{lang === "ar" ? "تحذير" : "Warning"}</span>
              </div>
              <p className="text-[11px] text-amber-700/80">{t.regionWarning[lang]}</p>
            </div>
          </ChartCard>
        </div></AnimateOnScroll>

        {/* ═══════ Top Models ═══════ */}
        <SectionTitle icon={Car} title={t.modelsTitle[lang]} subtitle={t.modelsSubtitle[lang]} id="models" color="#FF8C00" />

        <AnimateOnScroll direction="up"><div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          <ChartCard className="lg:col-span-2" glow="#FF8C00">
            <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">{t.modelsChartTitle[lang]}</h4>
            <TopModelsChart />
          </ChartCard>
          <div className="space-y-3">
            {[
              { model: "Swift", sales: "16,854", badge: t.modelsFirst[lang], color: "#007BFF", rank: 1 },
              { model: "Wagon R", sales: "15,200", badge: t.modelsSecond[lang], color: "#00C9A7", rank: 2 },
              { model: "Ertiga", sales: "14,500", badge: t.modelsThird[lang], color: "#FF8C00", rank: 3 },
            ].map((m, i) => (
              <AnimateOnScroll key={i} delay={i * 150} direction="left">
                <Tilt3D intensity={8}>
                  <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 glass border border-white/40
                    hover:border-white/60 hover:shadow-lg transition-all duration-500 group">
                    {/* Rank badge */}
                    <div className="absolute -top-1 -right-1 w-10 h-10 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)` }}>
                        #{m.rank}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Car size={16} style={{ color: m.color }} />
                      <span className="font-bold text-gray-800">{m.model}</span>
                    </div>
                    <p className="text-3xl lg:text-4xl font-extrabold mb-1" style={{ color: m.color }}>{m.sales}</p>
                    <p className="text-sm text-gray-500 font-medium">{t.modelsUnit[lang]}</p>

                    {/* Hover glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }} />
                  </div>
                </Tilt3D>
              </AnimateOnScroll>
            ))}
          </div>
        </div></AnimateOnScroll>

        {/* ═══════ Egypt Market ═══════ */}
        <SectionTitle icon={BarChart3} title={t.egyptTitle[lang]} subtitle={t.egyptSubtitle[lang]} id="egypt" color="#00C9A7" />

        <AnimateOnScroll direction="up"><ChartCard className="mb-6" glow="#007BFF">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h4 className="text-base lg:text-lg font-bold text-gray-900 text-sm sm:text-base">{t.egyptPriceTitle[lang]}</h4>
            <div className="flex gap-2">
              <InsightBadge text="Hatchback" type="info" />
              <InsightBadge text="SUV" type="warning" />
              <InsightBadge text="Sedan" type="success" />
            </div>
          </div>
          <EgyptPricesChart />
        </ChartCard></AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={200}><ChartCard className="mb-10 sm:mb-12 overflow-hidden" glow="#00C9A7">
          <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">{t.egyptTableTitle[lang]}</h4>
          <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-xl">
            <table className="w-full text-sm lg:text-base min-w-[500px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#0a1628] to-[#162240] text-white">
                  <th className={`px-3 sm:px-4 py-3.5 ${lang === "ar" ? "text-right rounded-tr-xl" : "text-left rounded-tl-xl"}`}>{t.egyptThModel[lang]}</th>
                  <th className={`px-3 sm:px-4 py-3.5 ${lang === "ar" ? "text-right" : "text-left"}`}>{t.egyptThCategory[lang]}</th>
                  <th className={`px-3 sm:px-4 py-3.5 ${lang === "ar" ? "text-right" : "text-left"}`}>{t.egyptThPrice[lang]}</th>
                  <th className={`px-3 sm:px-4 py-3.5 ${lang === "ar" ? "text-right" : "text-left"}`}>{t.egyptThEngine[lang]}</th>
                  <th className={`px-3 sm:px-4 py-3.5 ${lang === "ar" ? "text-right rounded-tl-xl" : "text-left rounded-tr-xl"}`}>{t.egyptThRating[lang]}</th>
                </tr>
              </thead>
              <tbody>
                {egyptModels.map((m, i) => (
                  <tr key={i} className={`border-b border-gray-100/50 ${i % 2 === 0 ? "bg-gray-50/30" : "bg-white/30"}
                    hover:bg-blue-50/40 transition-all duration-300 group`}>
                    <td className="px-3 sm:px-4 py-3 font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{m.model}</td>
                    <td className="px-3 sm:px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium ${
                        m.category === "Hatchback" ? "bg-blue-100/80 text-blue-700" :
                        m.category === "SUV" ? "bg-red-100/80 text-red-700" : "bg-emerald-100/80 text-emerald-700"
                      }`}>{m.category}</span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 font-medium">{m.price.toLocaleString()}</td>
                    <td className="px-3 sm:px-4 py-3 text-gray-500">{m.engine.toLocaleString()}</td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="font-bold">{m.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard></AnimateOnScroll>

        {/* ═══════ Ratings ═══════ */}
        <SectionTitle icon={Star} title={t.ratingsTitle[lang]} subtitle={t.ratingsSubtitle[lang]} id="ratings" color="#FF8C00" />

        <AnimateOnScroll direction="up"><div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          <ChartCard className="lg:col-span-2" glow="#FF8C00">
            <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">{t.ratingsChartTitle[lang]}</h4>
            <RatingsChart />
          </ChartCard>
          <ChartCard glow="#6C5CE7">
            <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-4">{t.ratingsTopTitle[lang]}</h4>
            <div className="space-y-4">
              {[...egyptModels].sort((a, b) => b.rating - a.rating).slice(0, 4).map((m, i) => (
                <AnimateOnScroll key={i} delay={i * 100} direction="right">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500
                        text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-amber-400/20
                        group-hover:scale-110 transition-transform">{i + 1}</span>
                      <span className="text-sm font-medium text-gray-800">{m.model}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50/80">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="font-bold text-gray-900">{m.rating}</span>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/80 border border-amber-200/50">
              <p className="text-base font-bold text-amber-800 mb-1">{t.ratingsAvgTitle[lang]}</p>
              <div className="flex items-center gap-2">
                <span className="text-5xl font-extrabold bg-gradient-to-r from-amber-500 to-orange-500
                  bg-clip-text text-transparent">{stats.avgRating}</span>
                <span className="text-gray-500 text-xl">/ 5</span>
              </div>
            </div>
          </ChartCard>
        </div></AnimateOnScroll>

        {/* ═══════ Recommendations ═══════ */}
        <SectionTitle icon={Lightbulb} title={t.recsTitle[lang]}
          subtitle={t.recsSubtitle[lang]} id="recommendations" color="#00C9A7" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
          <AnimateOnScroll direction="right">
            <GlowCard color="#00C9A7">
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600
                    flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Lightbulb size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-extrabold text-emerald-600">{t.recsLabel[lang]}</h3>
                </div>
                <StaggerChildren className="space-y-3" staggerMs={120}>
                  {t.recs[lang].map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/30 border border-emerald-100/50
                      hover:bg-emerald-50/60 hover:border-emerald-200 transition-all duration-300 group">
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white
                        flex items-center justify-center text-xs font-bold shrink-0 shadow-sm
                        group-hover:scale-110 transition-transform">{i + 1}</span>
                      <p className="text-sm lg:text-base text-gray-800 leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </StaggerChildren>
              </div>
            </GlowCard>
          </AnimateOnScroll>

          <AnimateOnScroll direction="left">
            <GlowCard color="#007BFF">
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600
                    flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Shield size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-extrabold text-blue-600">{t.conclusionLabel[lang]}</h3>
                </div>
                <StaggerChildren className="space-y-3" staggerMs={100}>
                  {[
                    { icon: TrendingUp, title: t.concStrong[lang], desc: t.concStrongDesc[lang], color: "#007BFF" },
                    { icon: BarChart3, title: t.concSales[lang], desc: t.concSalesDesc[lang], color: "#00C9A7" },
                    { icon: Globe, title: t.concIndia[lang], desc: t.concIndiaDesc[lang], color: "#E30013" },
                    { icon: MapPin, title: t.concEgypt[lang], desc: t.concEgyptDesc[lang], color: "#FF8C00" },
                    { icon: Lightbulb, title: t.concFuture[lang], desc: t.concFutureDesc[lang], color: "#6C5CE7" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 sm:p-4 rounded-xl border transition-all duration-300
                      hover:shadow-md group" style={{ background: `${item.color}08`, borderColor: `${item.color}20` }}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center
                          group-hover:scale-110 transition-transform"
                          style={{ background: `${item.color}15` }}>
                          <item.icon size={14} style={{ color: item.color }} />
                        </div>
                        <span className="text-sm lg:text-base font-bold" style={{ color: item.color }}>{item.title}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </StaggerChildren>
              </div>
            </GlowCard>
          </AnimateOnScroll>
        </div>

        {/* ═══════ Footer ═══════ */}
        <AnimateOnScroll direction="up">
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-10 text-center text-white shadow-2xl">
            {/* Gradient BG */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#162240] to-[#0a1628]" />
            <div className="absolute top-0 left-1/4 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl animate-blob1" />
            <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl animate-blob2" />

            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600
                flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Sparkles size={24} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">{t.footerTitle[lang]}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{t.footerSub[lang]}</p>
              <div className="mt-4 h-0.5 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50" />
              <p className="text-gray-500 text-xs mt-4">{t.footerSmall[lang]}</p>
            </div>
          </div>
        </AnimateOnScroll>
      </main>
    </div>
  );
}
