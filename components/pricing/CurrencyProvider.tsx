"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  fallbackRates,
  RATES_ENDPOINT,
  currencyMap,
} from "@/lib/currencies";

type CurrencyContextValue = {
  currency: string;
  setCurrency: (code: string) => void;
  rates: Record<string, number>;
  live: boolean;
  convert: (gbp: number) => number;
  format: (gbp: number) => string;
  availableCodes: string[];
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "jadeed-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState("GBP");
  const [rates, setRates] = useState<Record<string, number>>(fallbackRates);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    if (saved && currencyMap[saved]) setCurrencyState(saved);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(RATES_ENDPOINT);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || !data?.rates) return;
        setRates({ ...fallbackRates, ...data.rates, GBP: 1 });
        setLive(true);
      } catch {
        /* keep fallback rates */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((code: string) => {
    setCurrencyState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  const convert = useCallback(
    (gbp: number) => gbp * (rates[currency] ?? fallbackRates[currency] ?? 1),
    [rates, currency],
  );

  const format = useCallback(
    (gbp: number) => {
      const value = convert(gbp);
      const rounded = Math.round(value);
      try {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency,
          currencyDisplay: "narrowSymbol",
          maximumFractionDigits: 0,
        }).format(rounded);
      } catch {
        return `${currency} ${rounded.toLocaleString()}`;
      }
    },
    [convert, currency],
  );

  const availableCodes = useMemo(
    () => Object.keys(currencyMap).filter((code) => rates[code] != null),
    [rates],
  );

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      rates,
      live,
      convert,
      format,
      availableCodes,
    }),
    [currency, setCurrency, rates, live, convert, format, availableCodes],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
