import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteProvider } from "@/context/SiteContext";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import AdminPage from "@/pages/admin";
import { useSite } from "@/context/SiteContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { ExternalLink, FileText, Loader2 } from "lucide-react";

function DynamicPage({ path }: { path: string }) {
  const { navItems } = useSite();
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navItem = navItems.find(n => n.href === path);
  
  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setLoading(true);
        const cleanPath = path.startsWith("/") ? path.slice(1) : path;
        const response = await fetch(`/api/pages/${cleanPath}`);
        if (response.ok) {
          const data = await response.json();
          setSections(data.sections || []);
        } else {
          setSections([]);
        }
      } catch (error) {
        console.error("Error fetching page content:", error);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPageContent();
  }, [path]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }
  
  const formatUrl = (url: string): string => {
    if (!url || url === "#") return "#";
    const trimmedUrl = url.trim();
    if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) return trimmedUrl;
    if (trimmedUrl.startsWith("/")) return trimmedUrl;
    return `https://${trimmedUrl}`;
  };

  return (
    <DashboardLayout>
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="bg-white border-b border-slate-100 mb-10">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{navItem?.name || "Page"}</h1>
            <p className="text-slate-500 text-lg">Browse resources and tools for {navItem?.name}.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {sections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections.map((section: any) => (
                <div key={section.id} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-50 pb-3">{section.name}</h3>
                  <ul className="space-y-4">
                    {section.links.map((link: any) => (
                      <li key={link.id}>
                        <a 
                          href={formatUrl(link.url)} 
                          target={link.url !== "#" && !link.url.startsWith("/") ? "_blank" : undefined}
                          rel={link.url !== "#" && !link.url.startsWith("/") ? "noopener noreferrer" : undefined}
                          className="text-slate-700 hover:text-green-600 font-bold transition-colors flex items-center gap-3 group"
                        >
                          <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-green-500 transition-colors shrink-0" />
                          {link.name}
                          <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-slate-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Under Construction</h3>
              <p className="text-slate-500">The content for this page is being prepared.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function Router() {
  const { navItems } = useSite();
  
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/admin" component={AdminPage} />
      {navItems.map(item => (
        <Route key={item.id} path={item.href}>
          <DynamicPage path={item.href} />
        </Route>
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SiteProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </SiteProvider>
    </QueryClientProvider>
  );
}

export default App;
