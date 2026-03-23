import { ReactNode, useEffect } from "react";
import { TopNav } from "./TopNav";
import { GlobalChatbot } from "./GlobalChatbot";
import { GlobalFooter } from "./GlobalFooter";
import { useSite } from "@/context/SiteContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { websiteTitle, faviconUrl } = useSite();

  useEffect(() => {
    if (websiteTitle) {
      document.title = websiteTitle;
    }
    if (faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, [websiteTitle, faviconUrl]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TopNav />
      <main className="pt-16">
        {children}
      </main>
      <GlobalFooter />
      <GlobalChatbot />
    </div>
  );
}
