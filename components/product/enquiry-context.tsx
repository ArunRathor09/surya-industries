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

const STORAGE_KEY = "spi-product-enquiry-list";

type EnquiryContextValue = {
  productSlugs: string[];
  isDrawerOpen: boolean;
  hasProduct: (slug: string) => boolean;
  addProduct: (slug: string) => void;
  removeProduct: (slug: string) => void;
  clearProducts: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [productSlugs, setProductSlugs] = useState<string[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: unknown = JSON.parse(stored);
        if (
          Array.isArray(parsed) &&
          parsed.every((slug): slug is string => typeof slug === "string")
        ) {
          setProductSlugs(parsed);
        } else {
          console.error("Saved SPI enquiry list has an invalid format.");
        }
      } catch (error) {
        console.error("Could not read the saved SPI enquiry list.", error);
      }
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(productSlugs));
    } catch (error) {
      console.error("Could not save the SPI enquiry list.", error);
    }
  }, [productSlugs, storageReady]);

  const hasProduct = useCallback(
    (slug: string) => productSlugs.includes(slug),
    [productSlugs],
  );
  const addProduct = useCallback((slug: string) => {
    if (!slug.trim()) {
      console.error("Cannot add a product without a valid slug to the enquiry list.");
      return;
    }
    setProductSlugs((current) =>
      current.includes(slug) ? current : [...current, slug],
    );
  }, []);
  const removeProduct = useCallback(
    (slug: string) =>
      setProductSlugs((current) => current.filter((item) => item !== slug)),
    [],
  );
  const clearProducts = useCallback(() => setProductSlugs([]), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo(
    () => ({
      productSlugs,
      isDrawerOpen,
      hasProduct,
      addProduct,
      removeProduct,
      clearProducts,
      openDrawer,
      closeDrawer,
    }),
    [
      addProduct,
      clearProducts,
      closeDrawer,
      hasProduct,
      isDrawerOpen,
      openDrawer,
      productSlugs,
      removeProduct,
    ],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiryList() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiryList must be used within EnquiryProvider.");
  }
  return context;
}
