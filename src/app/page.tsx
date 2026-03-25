"use client";

import { useState } from "react";
import {
  TrendingUp, Target, AlertTriangle, CheckCircle, BarChart3,
  Globe, Car, MapPin, Star, Lightbulb, Database, Shield,
  ArrowUpRight, ArrowDownRight, Menu, X, Languages,
} from "lucide-react";
import {
  GlobalSalesChart, RegionPieChart, TopModelsChart,
  EgyptPricesChart, RatingsChart, CategoryPieChart,
} from "@/components/Charts";
import { stats, egyptModels } from "@/lib/data";
import { AnimateOnScroll, StaggerChildren, AnimatedCounter, HoverScale } from "@/components/Animate";
import { useLang } from "@/components/LangProvider";
import { t } from "@/lib/translations";

/* ───────── Small reusable pieces ───────── */

function StatCard({ icon: Icon, label, value, numValue, suffix, sub, color, delay }: {
  icon: React.ElementType; label: string; value: string;
  numValue?: number; suffix?: string;
  sub?: string; color: string; delay: number;
}) {
  return (
    <AnimateOnScroll delay={delay} direction="up">
      <HoverScale className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs sm:text-sm text-gray-500 font-medium">{label}</span>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
            style={{ background: color + "18" }}>
            <Icon size={18} style={{ color }} />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
          {numValue != null ? (
            <AnimatedCounter target={numValue} suffix={suffix || ""} decimals={suffix === "M" || suffix === "" ? 2 : 0} duration={1800} />
          ) : value}
        </p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </HoverScale>
    </AnimateOnScroll>
  );
}

function SectionTitle({ icon: Icon, title, subtitle, id }: {
  icon: React.ElementType; title: string; subtitle: string; id: string;
}) {
  return (
    <div id={id} className="flex items-center gap-3 mb-6 scroll-mt-24">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700
        flex items-center justify-center shadow-lg shadow-blue-200">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

function ChartCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 ${className}`}>
      {children}
    </div>
  );
}

function InsightBadge({ text, type = "info" }: { text: string; type?: "info" | "success" | "warning" }) {
  const colors = {
    info: "bg-blue-50 text-blue-700 border-blue-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return (
    <span className={`inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold border ${colors[type]}`}>
      {text}
    </span>
  );
}

/* ───────── Sidebar Navigation ───────── */

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, toggle } = useLang();

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

  return (
    <>
      {/* Backdrop (mobile only) */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed top-0 h-full w-64 bg-[#0f1a2e] text-white z-50
        flex flex-col shadow-2xl transition-transform duration-300
        ${lang === "ar" ? "right-0" : "left-0"}
        ${open ? "translate-x-0" : (lang === "ar" ? "translate-x-full" : "-translate-x-full")}
        lg:translate-x-0`}>
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{t.sidebarTitle[lang]}</h1>
            <p className="text-xs text-blue-300 mt-1">{t.sidebarSub[lang]}</p>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/10 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Language toggle */}
        <button onClick={toggle}
          className="mx-4 mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl
            bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm">
          <Languages size={16} className="text-blue-400" />
          <span className="text-gray-300">{lang === "ar" ? "English" : "عربي"}</span>
        </button>

        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => (
            <a key={id} href={`#${id}`} onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300
                hover:bg-white/10 hover:text-white transition-all duration-200 mb-1 group">
              <Icon size={18} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 text-xs text-gray-500 text-center">
          {t.sidebarFooter[lang]}
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
    <div className="flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 lg:hidden bg-[#0f1a2e]/95 backdrop-blur
        flex items-center justify-between px-4 py-3 shadow-lg">
        <button onClick={() => setSidebarOpen(true)} className="text-white p-1.5 hover:bg-white/10 rounded-lg">
          <Menu size={22} />
        </button>
        <span className="text-white font-bold text-sm">SUZUKI Dashboard</span>
        <div className="w-8" />
      </div>

      <main className={`flex-1 min-h-screen p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8
        ${lang === "ar" ? "lg:mr-64" : "lg:ml-64"}`}>

        {/* Hero Header */}
        <div id="intro" className="scroll-mt-20 relative overflow-hidden bg-gradient-to-bl
          from-[#0f1a2e] via-[#1b2a4a] to-[#0f1a2e] rounded-2xl sm:rounded-3xl p-6 sm:p-10 mb-6 sm:mb-8 text-white shadow-xl">
          <div className="absolute top-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-300">
                {t.heroBadge1[lang]}
              </span>
              <span className="px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-full text-xs text-red-300">
                {t.heroBadge2[lang]}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">{t.heroTitle[lang]}</h1>
            <p className="text-sm sm:text-lg text-gray-300 max-w-2xl">{t.heroDesc[lang]}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10">
          <StatCard icon={TrendingUp} label={t.statGlobalSales[lang]} value="3.25M"
            numValue={3.25} suffix="M"
            sub={t.statGlobalSub[lang]} color="#007BFF" delay={100} />
          <StatCard icon={Globe} label={t.statCountries[lang]} value="+190"
            numValue={190} suffix="+"
            sub={t.statCountriesSub[lang]} color="#00C9A7" delay={200} />
          <StatCard icon={Car} label={t.statModels[lang]} value="10"
            numValue={10} suffix=""
            sub={t.statModelsSub[lang]} color="#FF8C00" delay={300} />
          <StatCard icon={Star} label={t.statRating[lang]} value="4.17"
            numValue={4.17} suffix=""
            sub={t.statRatingSub[lang]} color="#6C5CE7" delay={400} />
        </div>

        {/* Problem & Objectives */}
        <SectionTitle icon={AlertTriangle} title={t.problemTitle[lang]}
          subtitle={t.problemSubtitle[lang]} id="problem" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <AnimateOnScroll direction="right">
            <HoverScale className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-red-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-red-600">{t.problemLabel[lang]}</h3>
              </div>
              <StaggerChildren className="space-y-3" staggerMs={120}>
                {t.problems[lang].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center
                      justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-xs sm:text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </StaggerChildren>
            </HoverScale>
          </AnimateOnScroll>

          <AnimateOnScroll direction="left">
            <HoverScale className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Target size={16} className="text-emerald-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-600">{t.objectivesLabel[lang]}</h3>
              </div>
              <StaggerChildren className="space-y-3" staggerMs={120}>
                {t.objectives[lang].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </StaggerChildren>
            </HoverScale>
          </AnimateOnScroll>
        </div>

        {/* EDA Section */}
        <SectionTitle icon={Database} title={t.edaTitle[lang]} subtitle={t.edaSubtitle[lang]} id="eda" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6">
          {[
            { title: t.edaOverview[lang], color: "#007BFF", items: [`${t.edaRows[lang]}: ${stats.totalModels}`, `${t.edaCols[lang]}: ${stats.totalColumns}`, `${t.edaCategories[lang]}: ${stats.categories}`] },
            { title: t.edaQuality[lang], color: "#00C9A7", items: [`${t.edaNulls[lang]}: ${stats.nullValues}`, `${t.edaDuplicates[lang]}: ${stats.duplicates}`, t.edaTypes[lang]] },
            { title: t.edaStats[lang], color: "#E30013", items: [`${t.edaMinPrice[lang]}: ${stats.priceMin}K`, `${t.edaMaxPrice[lang]}: ${stats.priceMax}K`, `${t.edaAvgRating[lang]}: ${stats.avgRating}`] },
          ].map((card, i) => (
            <AnimateOnScroll key={i} delay={i * 150} direction="up"><ChartCard>
              <div className="h-1 rounded-full mb-4" style={{ background: card.color }}></div>
              <h4 className="font-bold text-gray-800 mb-3">{card.title}</h4>
              <div className="space-y-2">
                {card.items.map((item, j) => (
                  <p key={j} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: card.color }}></span>
                    {item}
                  </p>
                ))}
              </div>
            </ChartCard></AnimateOnScroll>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <AnimateOnScroll direction="right"><ChartCard>
            <h4 className="font-bold text-gray-800 mb-4">{t.edaCategoryDist[lang]}</h4>
            <CategoryPieChart />
          </ChartCard></AnimateOnScroll>
          <AnimateOnScroll direction="left"><ChartCard>
            <h4 className="font-bold text-gray-800 mb-4">{t.edaQualityCriteria[lang]}</h4>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { label: "Accuracy", ar: t.accuracy[lang] },
                { label: "Completeness", ar: t.completeness[lang] },
                { label: "Consistency", ar: t.consistency[lang] },
                { label: "Relevancy", ar: t.relevancy[lang] },
                { label: "Validity", ar: t.validity[lang] },
                { label: "Uniqueness", ar: t.uniqueness[lang] },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-800">{c.label}</p>
                    <p className="text-xs text-gray-500">{c.ar}</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard></AnimateOnScroll>
        </div>

        {/* Global Sales */}
        <SectionTitle icon={TrendingUp} title={t.globalTitle[lang]} subtitle={t.globalSubtitle[lang]} id="global" />

        <AnimateOnScroll direction="up"><div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <ChartCard className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h4 className="font-bold text-gray-800">{t.globalTrend[lang]}</h4>
              <InsightBadge text={t.globalGrowth[lang]} type="success" />
            </div>
            <GlobalSalesChart />
          </ChartCard>
          <ChartCard>
            <h4 className="font-bold text-gray-800 mb-4">{t.globalKeyPoints[lang]}</h4>
            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: ArrowUpRight, title: t.globalHighest[lang], desc: t.globalHighestDesc[lang], color: "blue" },
                { icon: ArrowDownRight, title: t.globalLowest[lang], desc: t.globalLowestDesc[lang], color: "red" },
                { icon: TrendingUp, title: t.globalRecovery[lang], desc: t.globalRecoveryDesc[lang], color: "emerald" },
                { icon: Target, title: t.globalTarget[lang], desc: t.globalTargetDesc[lang], color: "purple" },
              ].map((item, i) => (
                <div key={i} className={`p-3 rounded-xl bg-${item.color}-50 border border-${item.color}-100`}>
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon size={16} className={`text-${item.color}-600`} />
                    <span className={`text-xs sm:text-sm font-bold text-${item.color}-700`}>{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </ChartCard>
        </div></AnimateOnScroll>

        {/* Region Sales */}
        <SectionTitle icon={MapPin} title={t.regionTitle[lang]} subtitle={t.regionSubtitle[lang]} id="region" />

        <AnimateOnScroll direction="up"><div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <ChartCard className="lg:col-span-2">
            <h4 className="font-bold text-gray-800 mb-4">{t.regionChartTitle[lang]}</h4>
            <RegionPieChart />
          </ChartCard>
          <ChartCard>
            <h4 className="font-bold text-gray-800 mb-4">{t.regionAnalysis[lang]}</h4>
            <div className="space-y-3">
              {[
                { region: t.regionIndia[lang], pct: "55.1%", val: "1.79M", color: "#E30013" },
                { region: t.regionJapan[lang], pct: "22.2%", val: "722K", color: "#007BFF" },
                { region: t.regionAsia[lang], pct: "9.5%", val: "310K", color: "#00C9A7" },
                { region: t.regionEurope[lang], pct: "8.6%", val: "280K", color: "#FF8C00" },
                { region: t.regionOther[lang], pct: "4.5%", val: "145K", color: "#6C5CE7" },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: r.color }}></div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{r.region}</span>
                  </div>
                  <div className={lang === "ar" ? "text-left" : "text-right"}>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">{r.pct}</span>
                    <span className={`text-xs text-gray-400 ${lang === "ar" ? "mr-2" : "ml-2"}`}>{r.val}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-xs text-amber-700 font-medium">{t.regionWarning[lang]}</p>
            </div>
          </ChartCard>
        </div></AnimateOnScroll>

        {/* Top Models */}
        <SectionTitle icon={Car} title={t.modelsTitle[lang]} subtitle={t.modelsSubtitle[lang]} id="models" />

        <AnimateOnScroll direction="up"><div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <ChartCard className="lg:col-span-2">
            <h4 className="font-bold text-gray-800 mb-4">{t.modelsChartTitle[lang]}</h4>
            <TopModelsChart />
          </ChartCard>
          <ChartCard>
            <h4 className="font-bold text-gray-800 mb-4">{t.modelsRanking[lang]}</h4>
            <div className="space-y-3">
              {[
                { model: "Swift", sales: "16,854", badge: t.modelsFirst[lang], color: "#007BFF" },
                { model: "Wagon R", sales: "15,200", badge: t.modelsSecond[lang], color: "#00C9A7" },
                { model: "Ertiga", sales: "14,500", badge: t.modelsThird[lang], color: "#FF8C00" },
              ].map((m, i) => (
                <div key={i} className="p-3 sm:p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800">{m.model}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ background: m.color }}>{m.badge}</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold" style={{ color: m.color }}>{m.sales}</p>
                  <p className="text-xs text-gray-400">{t.modelsUnit[lang]}</p>
                </div>
              ))}
            </div>
          </ChartCard>
        </div></AnimateOnScroll>

        {/* Egypt Market */}
        <SectionTitle icon={BarChart3} title={t.egyptTitle[lang]} subtitle={t.egyptSubtitle[lang]} id="egypt" />

        <AnimateOnScroll direction="up"><ChartCard className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h4 className="font-bold text-gray-800 text-sm sm:text-base">{t.egyptPriceTitle[lang]}</h4>
            <div className="flex gap-2">
              <InsightBadge text="Hatchback" type="info" />
              <InsightBadge text="SUV" type="warning" />
              <InsightBadge text="Sedan" type="success" />
            </div>
          </div>
          <EgyptPricesChart />
        </ChartCard></AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={200}><ChartCard className="mb-8 sm:mb-10 overflow-hidden">
          <h4 className="font-bold text-gray-800 mb-4">{t.egyptTableTitle[lang]}</h4>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-xs sm:text-sm min-w-[500px]">
              <thead>
                <tr className="bg-[#0f1a2e] text-white">
                  <th className={`px-3 sm:px-4 py-3 ${lang === "ar" ? "text-right rounded-tr-xl" : "text-left rounded-tl-xl"}`}>{t.egyptThModel[lang]}</th>
                  <th className={`px-3 sm:px-4 py-3 ${lang === "ar" ? "text-right" : "text-left"}`}>{t.egyptThCategory[lang]}</th>
                  <th className={`px-3 sm:px-4 py-3 ${lang === "ar" ? "text-right" : "text-left"}`}>{t.egyptThPrice[lang]}</th>
                  <th className={`px-3 sm:px-4 py-3 ${lang === "ar" ? "text-right" : "text-left"}`}>{t.egyptThEngine[lang]}</th>
                  <th className={`px-3 sm:px-4 py-3 ${lang === "ar" ? "text-right rounded-tl-xl" : "text-left rounded-tr-xl"}`}>{t.egyptThRating[lang]}</th>
                </tr>
              </thead>
              <tbody>
                {egyptModels.map((m, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-gray-50/50" : ""} hover:bg-blue-50/50 transition-colors`}>
                    <td className="px-3 sm:px-4 py-3 font-bold text-gray-800">{m.model}</td>
                    <td className="px-3 sm:px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                        m.category === "Hatchback" ? "bg-blue-100 text-blue-700" :
                        m.category === "SUV" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                      }`}>{m.category}</span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 font-medium">{m.price.toLocaleString()}</td>
                    <td className="px-3 sm:px-4 py-3">{m.engine.toLocaleString()}</td>
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

        {/* Ratings */}
        <SectionTitle icon={Star} title={t.ratingsTitle[lang]} subtitle={t.ratingsSubtitle[lang]} id="ratings" />

        <AnimateOnScroll direction="up"><div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <ChartCard className="lg:col-span-2">
            <h4 className="font-bold text-gray-800 mb-4">{t.ratingsChartTitle[lang]}</h4>
            <RatingsChart />
          </ChartCard>
          <ChartCard>
            <h4 className="font-bold text-gray-800 mb-4">{t.ratingsTopTitle[lang]}</h4>
            <div className="space-y-4">
              {[...egyptModels].sort((a, b) => b.rating - a.rating).slice(0, 4).map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500
                      text-white font-bold text-xs flex items-center justify-center">{i + 1}</span>
                    <span className="text-sm font-medium text-gray-800">{m.model}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span className="font-bold text-gray-900">{m.rating}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
              <p className="text-sm font-bold text-amber-800 mb-1">{t.ratingsAvgTitle[lang]}</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-amber-600">{stats.avgRating}</span>
                <span className="text-gray-500">/ 5</span>
              </div>
            </div>
          </ChartCard>
        </div></AnimateOnScroll>

        {/* Recommendations */}
        <SectionTitle icon={Lightbulb} title={t.recsTitle[lang]}
          subtitle={t.recsSubtitle[lang]} id="recommendations" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <AnimateOnScroll direction="right"><ChartCard>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Lightbulb size={16} className="text-emerald-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-emerald-600">{t.recsLabel[lang]}</h3>
            </div>
            <StaggerChildren className="space-y-3" staggerMs={100}>
              {t.recs[lang].map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100
                  hover:bg-emerald-50 transition-colors">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center
                    text-xs font-bold shrink-0">{i + 1}</span>
                  <p className="text-xs sm:text-sm text-gray-700">{rec}</p>
                </div>
              ))}
            </StaggerChildren>
          </ChartCard></AnimateOnScroll>

          <AnimateOnScroll direction="left"><ChartCard>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Shield size={16} className="text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-blue-600">{t.conclusionLabel[lang]}</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: TrendingUp, title: t.concStrong[lang], desc: t.concStrongDesc[lang], color: "blue" },
                { icon: BarChart3, title: t.concSales[lang], desc: t.concSalesDesc[lang], color: "emerald" },
                { icon: Globe, title: t.concIndia[lang], desc: t.concIndiaDesc[lang], color: "red" },
                { icon: MapPin, title: t.concEgypt[lang], desc: t.concEgyptDesc[lang], color: "amber" },
                { icon: Lightbulb, title: t.concFuture[lang], desc: t.concFutureDesc[lang], color: "purple" },
              ].map((item, i) => (
                <div key={i} className={`p-3 sm:p-4 rounded-xl bg-${item.color}-50 border border-${item.color}-100`}>
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon size={16} className={`text-${item.color}-600`} />
                    <span className={`text-xs sm:text-sm font-bold text-${item.color}-700`}>{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </ChartCard></AnimateOnScroll>
        </div>

        {/* Footer */}
        <AnimateOnScroll direction="up">
          <div className="bg-[#0f1a2e] rounded-2xl p-6 sm:p-8 text-center text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-2">{t.footerTitle[lang]}</h3>
            <p className="text-gray-400 text-xs sm:text-sm">{t.footerSub[lang]}</p>
            <p className="text-gray-500 text-xs mt-2">{t.footerSmall[lang]}</p>
          </div>
        </AnimateOnScroll>
      </main>
    </div>
  );
}
