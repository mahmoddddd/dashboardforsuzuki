export type Lang = "ar" | "en";

export const t = {
  // Nav
  navIntro: { ar: "المقدمة", en: "Introduction" },
  navProblem: { ar: "المشكلة", en: "Problem" },
  navEda: { ar: "EDA", en: "EDA" },
  navGlobal: { ar: "المبيعات العالمية", en: "Global Sales" },
  navRegion: { ar: "المناطق", en: "Regions" },
  navModels: { ar: "الموديلات", en: "Models" },
  navEgypt: { ar: "السوق المصري", en: "Egypt Market" },
  navRatings: { ar: "التقييمات", en: "Ratings" },
  navRecommendations: { ar: "التوصيات", en: "Recommendations" },

  // Sidebar
  sidebarTitle: { ar: "SUZUKI", en: "SUZUKI" },
  sidebarSub: { ar: "لوحة تحليل البيانات", en: "Data Analysis Dashboard" },
  sidebarFooter: { ar: "مشروع تخرج 2024/2025", en: "Graduation Project 2024/2025" },

  // Hero
  heroBadge1: { ar: "تحليل بيانات", en: "Data Analysis" },
  heroBadge2: { ar: "2024", en: "2024" },
  heroTitle: { ar: "تحليل بيانات شركة سوزوكي", en: "Suzuki Corporation Data Analysis" },
  heroDesc: {
    ar: "تحليل شامل لمبيعات وأداء شركة سوزوكي عالمياً ومحلياً - يشمل المبيعات العالمية، توزيع المناطق، أفضل الموديلات، تحليل السوق المصري، وتقييمات العملاء",
    en: "Comprehensive analysis of Suzuki's global & local performance — covering global sales, regional distribution, top models, Egypt market analysis, and customer ratings",
  },

  // Stats
  statGlobalSales: { ar: "المبيعات العالمية", en: "Global Sales" },
  statGlobalSub: { ar: "وحدة في 2024", en: "units in 2024" },
  statCountries: { ar: "عدد الدول", en: "Countries" },
  statCountriesSub: { ar: "دولة حول العالم", en: "countries worldwide" },
  statModels: { ar: "الموديلات في مصر", en: "Models in Egypt" },
  statModelsSub: { ar: "موديل متاح", en: "available models" },
  statRating: { ar: "متوسط التقييم", en: "Average Rating" },
  statRatingSub: { ar: "من 5 نجوم", en: "out of 5 stars" },

  // Problem & Objectives
  problemTitle: { ar: "مشكلة الدراسة وأهداف المشروع", en: "Problem Statement & Project Objectives" },
  problemSubtitle: { ar: "Problem Statement & Objectives", en: "Research Focus" },
  problemLabel: { ar: "مشكلة الدراسة", en: "Problem Statement" },
  objectivesLabel: { ar: "أهداف المشروع", en: "Project Objectives" },
  problems: {
    ar: [
      "عدم وجود رؤية واضحة لأداء سوزوكي في الأسواق المختلفة",
      "صعوبة المقارنة بين الموديلات من حيث السعر والمواصفات",
      "غياب تحليل منظم ومبني على بيانات للمبيعات والأسعار",
      "الحاجة لفهم اتجاهات السوق واحتياجات العملاء بشكل علمي",
    ],
    en: [
      "Lack of clear visibility into Suzuki's performance across different markets",
      "Difficulty comparing models in terms of pricing and specifications",
      "Absence of structured, data-driven analysis for sales and pricing",
      "Need for scientific understanding of market trends and customer needs",
    ],
  },
  objectives: {
    ar: [
      "تحليل بيانات مبيعات سوزوكي العالمية من 2018 إلى 2024",
      "تحديد أفضل الموديلات مبيعاً في الأسواق الرئيسية",
      "تحليل الأسعار والفئات في السوق المصري بالتفصيل",
      "قياس رضا العملاء عن موديلات سوزوكي المختلفة",
      "تقديم توصيات استراتيجية مبنية على البيانات",
    ],
    en: [
      "Analyze Suzuki's global sales data from 2018 to 2024",
      "Identify top-selling models in key markets",
      "Detailed analysis of pricing and categories in the Egyptian market",
      "Measure customer satisfaction across Suzuki models",
      "Provide data-driven strategic recommendations",
    ],
  },

  // EDA
  edaTitle: { ar: "استكشاف البيانات", en: "Exploratory Data Analysis" },
  edaSubtitle: { ar: "Exploratory Data Analysis (EDA)", en: "Data Exploration & Quality Assessment" },
  edaOverview: { ar: "نظرة عامة", en: "Overview" },
  edaQuality: { ar: "جودة البيانات", en: "Data Quality" },
  edaStats: { ar: "إحصائيات", en: "Statistics" },
  edaRows: { ar: "الصفوف", en: "Rows" },
  edaCols: { ar: "الأعمدة", en: "Columns" },
  edaCategories: { ar: "الفئات", en: "Categories" },
  edaNulls: { ar: "القيم الفارغة", en: "Null Values" },
  edaDuplicates: { ar: "المكررة", en: "Duplicates" },
  edaTypes: { ar: "الأنواع: متسقة", en: "Types: Consistent" },
  edaMinPrice: { ar: "أقل سعر", en: "Min Price" },
  edaMaxPrice: { ar: "أعلى سعر", en: "Max Price" },
  edaAvgRating: { ar: "متوسط التقييم", en: "Avg Rating" },
  edaCategoryDist: { ar: "توزيع الفئات", en: "Category Distribution" },
  edaQualityCriteria: { ar: "معايير جودة البيانات", en: "Data Quality Criteria" },

  // Global Sales
  globalTitle: { ar: "المبيعات العالمية", en: "Global Sales" },
  globalSubtitle: { ar: "Global Sales (2018-2024)", en: "Annual Trend (2018-2024)" },
  globalTrend: { ar: "اتجاه المبيعات العالمية", en: "Global Sales Trend" },
  globalGrowth: { ar: "نمو 4.1% سنوياً", en: "4.1% annual growth" },
  globalKeyPoints: { ar: "النقاط الرئيسية", en: "Key Highlights" },
  globalHighest: { ar: "أعلى مبيعات", en: "Peak Sales" },
  globalHighestDesc: { ar: "2018: 3.33 مليون وحدة", en: "2018: 3.33 million units" },
  globalLowest: { ar: "أدنى مبيعات", en: "Lowest Sales" },
  globalLowestDesc: { ar: "2020: 2.48 مليون (كورونا)", en: "2020: 2.48M (COVID-19)" },
  globalRecovery: { ar: "التعافي", en: "Recovery" },
  globalRecoveryDesc: { ar: "نمو مستمر 2021-2024", en: "Steady growth 2021-2024" },
  globalTarget: { ar: "هدف 2030", en: "2030 Target" },
  globalTargetDesc: { ar: "4.2 مليون وحدة سنوياً", en: "4.2 million units annually" },

  // Region
  regionTitle: { ar: "المبيعات حسب المنطقة", en: "Sales by Region" },
  regionSubtitle: { ar: "Sales by Region (2024)", en: "Geographic Distribution (2024)" },
  regionChartTitle: { ar: "توزيع المبيعات الجغرافي", en: "Geographic Sales Distribution" },
  regionAnalysis: { ar: "التحليل", en: "Analysis" },
  regionWarning: {
    ar: "تحذير: اعتماد كبير على سوق واحد (الهند 55%) - يُنصح بتنويع الأسواق",
    en: "Warning: Heavy reliance on one market (India 55%) — market diversification recommended",
  },
  regionIndia: { ar: "الهند", en: "India" },
  regionJapan: { ar: "اليابان", en: "Japan" },
  regionAsia: { ar: "آسيا", en: "Asia" },
  regionEurope: { ar: "أوروبا", en: "Europe" },
  regionOther: { ar: "أخرى", en: "Other" },

  // Models
  modelsTitle: { ar: "أفضل الموديلات مبيعاً", en: "Best Selling Models" },
  modelsSubtitle: { ar: "Best Selling Models (Monthly 2024)", en: "Monthly Sales (2024)" },
  modelsChartTitle: { ar: "المبيعات الشهرية لأفضل الموديلات", en: "Monthly Sales for Top Models" },
  modelsRanking: { ar: "ترتيب الموديلات", en: "Model Rankings" },
  modelsFirst: { ar: "الأول", en: "#1" },
  modelsSecond: { ar: "الثاني", en: "#2" },
  modelsThird: { ar: "الثالث", en: "#3" },
  modelsUnit: { ar: "وحدة / شهر", en: "units / month" },

  // Egypt
  egyptTitle: { ar: "تحليل السوق المصري", en: "Egypt Market Analysis" },
  egyptSubtitle: { ar: "Egypt Market Analysis", en: "Pricing & Model Comparison" },
  egyptPriceTitle: { ar: "أسعار موديلات سوزوكي في مصر (بالألف جنيه)", en: "Suzuki Model Prices in Egypt (K EGP)" },
  egyptTableTitle: { ar: "جدول تفصيلي لموديلات سوزوكي في مصر", en: "Detailed Suzuki Egypt Model Comparison" },
  egyptThModel: { ar: "الموديل", en: "Model" },
  egyptThCategory: { ar: "الفئة", en: "Category" },
  egyptThPrice: { ar: "السعر (K EGP)", en: "Price (K EGP)" },
  egyptThEngine: { ar: "المحرك (CC)", en: "Engine (CC)" },
  egyptThRating: { ar: "التقييم", en: "Rating" },

  // Ratings
  ratingsTitle: { ar: "تقييم رضا العملاء", en: "Customer Satisfaction" },
  ratingsSubtitle: { ar: "Customer Satisfaction Rating", en: "Model Ratings & Reviews" },
  ratingsChartTitle: { ar: "تقييمات العملاء لكل موديل", en: "Customer Ratings per Model" },
  ratingsTopTitle: { ar: "أعلى التقييمات", en: "Top Rated" },
  ratingsAvgTitle: { ar: "متوسط التقييم العام", en: "Overall Average Rating" },

  // Recommendations
  recsTitle: { ar: "التوصيات والخلاصة", en: "Recommendations & Conclusion" },
  recsSubtitle: { ar: "Recommendations & Conclusion", en: "Strategic Insights" },
  recsLabel: { ar: "التوصيات", en: "Recommendations" },
  conclusionLabel: { ar: "الخلاصة", en: "Conclusion" },
  recs: {
    ar: [
      "تنويع الأسواق وتقليل الاعتماد على الهند",
      "تطوير Swift و Wagon R (الأكثر مبيعاً)",
      "تسريع إنتاج السيارات الكهربائية e-VITARA",
      "زيادة التركيز على فئة SUV في مصر",
      "تحسين خدمة ما بعد البيع وضمان رضا العملاء",
      "تقديم عروض تمويل تنافسية بالسوق المصري",
      "استهداف أسواق أفريقيا والشرق الأوسط بقوة",
    ],
    en: [
      "Diversify markets and reduce dependence on India",
      "Invest in Swift & Wagon R development (top sellers)",
      "Accelerate electric vehicle production (e-VITARA)",
      "Increase focus on SUV segment in Egypt",
      "Improve after-sales service and customer satisfaction",
      "Offer competitive financing options in the Egyptian market",
      "Aggressively target African and Middle Eastern markets",
    ],
  },
  concStrong: { ar: "أداء قوي", en: "Strong Performance" },
  concStrongDesc: { ar: "سوزوكي تعافت بالكامل بعد جائحة كورونا مع نمو مستمر", en: "Suzuki fully recovered post-COVID with sustained growth" },
  concSales: { ar: "المبيعات 2024", en: "2024 Sales" },
  concSalesDesc: { ar: "3.25 مليون وحدة - قريبة من الرقم القياسي", en: "3.25 million units — near all-time high" },
  concIndia: { ar: "الهند", en: "India" },
  concIndiaDesc: { ar: "تمثل 55% من المبيعات - الركيزة الأساسية للشركة", en: "Accounts for 55% of sales — core market pillar" },
  concEgypt: { ar: "السوق المصري", en: "Egypt Market" },
  concEgyptDesc: { ar: "واعد مع تنوع في الفئات السعرية وتقييمات إيجابية", en: "Promising with diverse pricing tiers and positive ratings" },
  concFuture: { ar: "المستقبل", en: "Future Outlook" },
  concFutureDesc: { ar: "التحول للكهرباء والهجين مع هدف 4.2M بحلول 2030", en: "Shift to electric/hybrid with 4.2M target by 2030" },

  // Footer
  footerTitle: { ar: "شكراً لحسن استماعكم", en: "Thank You for Your Attention" },
  footerSub: { ar: "مشروع تخرج - نظم المعلومات الإدارية - 2024/2025", en: "Graduation Project — Management Information Systems — 2024/2025" },
  footerSmall: { ar: "Suzuki Data Analysis Dashboard", en: "Suzuki Data Analysis Dashboard" },

  // Data quality labels
  accuracy: { ar: "الدقة", en: "Accuracy" },
  completeness: { ar: "الاكتمال", en: "Completeness" },
  consistency: { ar: "الاتساق", en: "Consistency" },
  relevancy: { ar: "الملائمة", en: "Relevancy" },
  validity: { ar: "الصحة", en: "Validity" },
  uniqueness: { ar: "عدم التكرار", en: "Uniqueness" },
} as const;
