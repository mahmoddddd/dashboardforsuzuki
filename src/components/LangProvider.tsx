"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Lang } from "@/lib/translations";

type LangCtx = { lang: Lang; toggle: () => void; isRtl: boolean };

const LangContext = createContext<LangCtx>({ lang: "ar", toggle: () => {}, isRtl: true });

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const isRtl = lang === "ar";

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [lang, isRtl]);

  return (
    <LangContext.Provider value={{ lang, toggle, isRtl }}>
      {children}
    </LangContext.Provider>
  );
}
