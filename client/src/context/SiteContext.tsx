import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

interface NavItem {
  id: number;
  name: string;
  href: string;
  visible: boolean;
}

interface QuickLink {
  id: number;
  name: string;
  url: string;
  tooltip?: string;
}

interface Category {
  id: number;
  name: string;
  links: QuickLink[];
}

interface Stat {
  id: number;
  value: string;
  label: string;
}

interface FeaturedCategory {
  id: number;
  title: string;
  links: QuickLink[];
}

interface SiteData {
  siteName: string;
  siteTagline: string;
  navItems: NavItem[];
  ctaButtonText: string;
  ctaButtonLink: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDescription: string;
  heroPrimaryBtn: string;
  heroSecondaryBtn: string;
  stats: Stat[];
  categories: Category[];
  footerCopyright: string;
  featuredCategories: FeaturedCategory[];
  chatApiKey: string;
  chatEndpoint: string;
  chatApiKey2: string;
  chatEndpoint2: string;
  activeChatOption: string;
  pageContent: Record<string, string>;
  logoUrl: string;
  faviconUrl: string;
  websiteTitle: string;
}

interface SiteContextType extends SiteData {
  setSiteName: (v: string) => void;
  setSiteTagline: (v: string) => void;
  setNavItems: (v: NavItem[]) => void;
  setCtaButtonText: (v: string) => void;
  setCtaButtonLink: (v: string) => void;
  setHeroTitle1: (v: string) => void;
  setHeroTitle2: (v: string) => void;
  setHeroDescription: (v: string) => void;
  setHeroPrimaryBtn: (v: string) => void;
  setHeroSecondaryBtn: (v: string) => void;
  setStats: (v: Stat[]) => void;
  setCategories: (v: Category[]) => void;
  setFooterCopyright: (v: string) => void;
  setFeaturedCategories: (v: FeaturedCategory[]) => void;
  setChatApiKey: (v: string) => void;
  setChatEndpoint: (v: string) => void;
  setChatApiKey2: (v: string) => void;
  setChatEndpoint2: (v: string) => void;
  setActiveChatOption: (v: string) => void;
  setPageContent: (v: Record<string, string>) => void;
  setLogoUrl: (v: string) => void;
  setFaviconUrl: (v: string) => void;
  setWebsiteTitle: (v: string) => void;
  saveConfig: () => Promise<void>;
  isLoading: boolean;
  isSaving: boolean;
}

const defaultNavItems: NavItem[] = [
  { id: 1, name: "Home", href: "/", visible: true },
  { id: 2, name: "Systems", href: "/systems", visible: true },
  { id: 3, name: "IT Support", href: "/support", visible: true },
  { id: 4, name: "Knowledge Base", href: "/kb", visible: true },
  { id: 5, name: "Contact", href: "/contact", visible: true },
];

const defaultStats: Stat[] = [
  { id: 1, value: "50+", label: "Enterprise Systems" },
  { id: 2, value: "24/7", label: "IT Support Available" },
  { id: 3, value: "10K+", label: "Employees Connected" },
  { id: 4, value: "99.9%", label: "System Uptime" },
];

const defaultCategories: Category[] = [
  { id: 1, name: "Management", links: [
    { id: 1, name: "HQ) CPMS", url: "#" }, { id: 2, name: "HQ) GCMS", url: "#" }, { id: 3, name: "HQ) GPPM", url: "#" },
    { id: 4, name: "HQ) PLM", url: "#" }, { id: 5, name: "HQ) SEGAM", url: "#" }, { id: 6, name: "HQ) Global EHS", url: "#" },
  ]},
  { id: 2, name: "Common", links: [{ id: 1, name: "Samsung Semiconductor", url: "#" }]},
  { id: 3, name: "Service", links: [{ id: 1, name: "AP) GSPN", url: "#" }, { id: 2, name: "AP) GMIS", url: "#" }]},
  { id: 4, name: "HR", links: [{ id: 1, name: "HQ) GHRP Portal", url: "#" }]},
  { id: 5, name: "IT Support", links: [{ id: 1, name: "IT-VOC", url: "#" }, { id: 2, name: "IT4U", url: "#" }, { id: 3, name: "N-ERP(SET)", url: "#" }, { id: 4, name: "N-ERP(DS)", url: "#" }]},
  { id: 6, name: "Marketing", links: [{ id: 1, name: "VD GTM", url: "#" }, { id: 2, name: "HQ) mNet", url: "#" }, { id: 3, name: "AP) GSBN-PVI", url: "#" }, { id: 4, name: "MCS System", url: "#" }]},
  { id: 7, name: "Sales", links: [{ id: 1, name: "HQ) GSBN", url: "#" }]},
  { id: 8, name: "PRM System", links: [{ id: 1, name: "PRM System (SENZ)", url: "#" }, { id: 2, name: "PRM System (SEPCO)", url: "#" }, { id: 3, name: "PRM System (SAVINA)", url: "#" }]},
  { id: 9, name: "Logistics", links: [{ id: 1, name: "HQ) GSCM", url: "#" }, { id: 2, name: "HQ) GLS", url: "#" }, { id: 3, name: "AP) GLP", url: "#" }]},
  { id: 10, name: "Video Conference", links: [{ id: 1, name: "KNOX Connect", url: "#" }, { id: 2, name: "KNOX Meeting (SET)", url: "#" }]},
  { id: 11, name: "Purchasing", links: [{ id: 1, name: "HQ) G-SRM", url: "#" }, { id: 2, name: "HQ) GMCM", url: "#" }, { id: 3, name: "HQ) PES", url: "#" }]},
];

const defaultFeaturedCategories: FeaturedCategory[] = [
  { id: 1, title: "IT Support Tools", links: [
    { id: 1, name: "IT-VOC", url: "https://itvoc.samsung.com" },
    { id: 2, name: "IT4U", url: "https://it4u.samsung.com" },
    { id: 3, name: "Service Desk", url: "https://servicedesk.samsung.com" },
  ]},
  { id: 2, title: "HR & Employee Services", links: [
    { id: 1, name: "GHRP Portal", url: "https://ghrp.samsung.com" },
    { id: 2, name: "Employee Benefits", url: "https://benefits.samsung.com" },
    { id: 3, name: "Leave Management", url: "https://leave.samsung.com" },
  ]},
  { id: 3, title: "Productivity & Collaboration", links: [
    { id: 1, name: "KNOX Connect", url: "https://knox.samsung.com" },
    { id: 2, name: "Confluence", url: "https://confluence.samsung.com" },
    { id: 3, name: "Email & Calendar", url: "https://mail.samsung.com" },
  ]},
];

const defaultSiteData: SiteData = {
  siteName: "SRPH MIS",
  siteTagline: "Employee Portal",
  navItems: defaultNavItems,
  ctaButtonText: "IT Support",
  ctaButtonLink: "/support",
  heroTitle1: "Welcome to",
  heroTitle2: "SRPH MIS Portal",
  heroDescription: "Your one-stop access to all enterprise applications, tools, and resources. Find everything you need to work efficiently and stay connected.",
  heroPrimaryBtn: "Browse All Systems",
  heroSecondaryBtn: "IT Support",
  stats: defaultStats,
  categories: defaultCategories,
  footerCopyright: "© 2024 SRPH MIS. All rights reserved.",
  featuredCategories: defaultFeaturedCategories,
  chatApiKey: "",
  chatEndpoint: "https://agent.sec.samsung.net/api/v1/run/d98b0949-3362-46b8-947a-16084bb3a710",
  chatApiKey2: "",
  chatEndpoint2: "",
  activeChatOption: "1",
  pageContent: {},
  logoUrl: "",
  faviconUrl: "",
  websiteTitle: "SRPH MIS Portal",
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch("/api/config");
        if (response.ok) {
          const data = await response.json();
          setSiteData({
            siteName: data.siteName || defaultSiteData.siteName,
            siteTagline: data.siteTagline || defaultSiteData.siteTagline,
            navItems: data.navItems || defaultSiteData.navItems,
            ctaButtonText: data.ctaButtonText || defaultSiteData.ctaButtonText,
            ctaButtonLink: data.ctaButtonLink || defaultSiteData.ctaButtonLink,
            heroTitle1: data.heroTitle1 || defaultSiteData.heroTitle1,
            heroTitle2: data.heroTitle2 || defaultSiteData.heroTitle2,
            heroDescription: data.heroDescription || defaultSiteData.heroDescription,
            heroPrimaryBtn: data.heroPrimaryBtn || defaultSiteData.heroPrimaryBtn,
            heroSecondaryBtn: data.heroSecondaryBtn || defaultSiteData.heroSecondaryBtn,
            stats: data.stats || defaultSiteData.stats,
            categories: data.categories || defaultSiteData.categories,
            footerCopyright: data.footerCopyright || defaultSiteData.footerCopyright,
            featuredCategories: data.featuredCategories || defaultSiteData.featuredCategories,
            chatApiKey: data.chatApiKey || defaultSiteData.chatApiKey,
            chatEndpoint: data.chatEndpoint || defaultSiteData.chatEndpoint,
            chatApiKey2: data.chatApiKey2 || defaultSiteData.chatApiKey2,
            chatEndpoint2: data.chatEndpoint2 || defaultSiteData.chatEndpoint2,
            activeChatOption: data.activeChatOption || defaultSiteData.activeChatOption,
            pageContent: data.pageContent || defaultSiteData.pageContent,
            logoUrl: data.logoUrl || defaultSiteData.logoUrl,
            faviconUrl: data.faviconUrl || defaultSiteData.faviconUrl,
            websiteTitle: data.websiteTitle || defaultSiteData.websiteTitle,
          });
        }
      } catch (error) {
        console.error("Failed to load config:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadConfig();
  }, []);

  const saveConfig = useCallback(async (dataToSave?: Partial<SiteData>) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave || siteData),
      });
      if (!response.ok) throw new Error("Failed to save config");
    } catch (error) {
      console.error("Failed to save config:", error);
    } finally {
      setIsSaving(false);
    }
  }, [siteData]);

  const updateField = <K extends keyof SiteData>(field: K, value: SiteData[K]) => {
    setSiteData(prev => ({ ...prev, [field]: value }));
  };

  const contextValue: SiteContextType = {
    ...siteData,
    setSiteName: (v) => updateField("siteName", v),
    setSiteTagline: (v) => updateField("siteTagline", v),
    setNavItems: (v) => updateField("navItems", v),
    setCtaButtonText: (v) => updateField("ctaButtonText", v),
    setCtaButtonLink: (v) => updateField("ctaButtonLink", v),
    setHeroTitle1: (v) => updateField("heroTitle1", v),
    setHeroTitle2: (v) => updateField("heroTitle2", v),
    setHeroDescription: (v) => updateField("heroDescription", v),
    setHeroPrimaryBtn: (v) => updateField("heroPrimaryBtn", v),
    setHeroSecondaryBtn: (v) => updateField("heroSecondaryBtn", v),
    setStats: (v) => updateField("stats", v),
    setCategories: (v) => updateField("categories", v),
    setFooterCopyright: (v) => updateField("footerCopyright", v),
    setFeaturedCategories: (v) => updateField("featuredCategories", v),
    setChatApiKey: (v) => updateField("chatApiKey", v),
    setChatEndpoint: (v) => updateField("chatEndpoint", v),
    setChatApiKey2: (v) => updateField("chatApiKey2", v),
    setChatEndpoint2: (v) => updateField("chatEndpoint2", v),
    setActiveChatOption: (v) => updateField("activeChatOption", v),
    setPageContent: (v) => updateField("pageContent", v),
    setLogoUrl: (v) => updateField("logoUrl", v),
    setFaviconUrl: (v) => updateField("faviconUrl", v),
    setWebsiteTitle: (v) => updateField("websiteTitle", v),
    saveConfig,
    isLoading,
    isSaving,
  };

  return (
    <SiteContext.Provider value={contextValue}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within SiteProvider");
  return context;
}
