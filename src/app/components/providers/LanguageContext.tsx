"use client";
import { usePathname } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";
import React from "react";
import { Dictionary } from "src/app/[lang]/dictionaries";
import { createClient } from "src/app/utils/supabase/client";

const localeContext = createContext<LocaleContextType | null>(null);
const locales = ["en-US", "ka"];

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  dictionary: Dictionary;
  // chatWindow: Record<string, string>;
  // informationBoard: Record<string, string>;
}
interface LocaleProviderProps {
  lang: string;
  children: React.ReactNode;
  // dictChat: Record<string, string>;
  // informationBoard: Record<string, string>;
}

export const LocaleProvider = (props: LocaleProviderProps) => {
  const [locale, setLocale] = useState<string>(props.lang);
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const supabase = createClient();

  const pathname = usePathname();

  useEffect(() => {
    async function fetchDictionary() {
      const currentLocale =
        locales.find((locale) => pathname.includes(`/${locale}`)) ?? props.lang;
      setLocale(currentLocale);
      const { data, error } = await supabase
        .from("dictionary")
        .select()
        .eq("locale", currentLocale)
        .single();
      if (data) {
        console.log(data);
        setDictionary(data.dictionary);
      }
    }
    fetchDictionary();
  }, [locale, pathname, props.lang]);

  if (dictionary) {
    const passedLocale: LocaleContextType = {
      locale: locale,
      setLocale(locale) {
        setLocale(locale);
      },
      dictionary: dictionary,
      // chatWindow: props.dictChat,
      // informationBoard: props.informationBoard,
    };
    return (
      <localeContext.Provider value={passedLocale}>
        {props.children}
      </localeContext.Provider>
    );
  }
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(localeContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
