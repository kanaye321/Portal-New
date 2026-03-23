import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSite } from "@/context/SiteContext";
import { cn } from "@/lib/utils";
import { 
  Lock, Eye, EyeOff, Save, Plus, Trash2, Edit2, Image, Link as LinkIcon, 
  LayoutDashboard, Settings, LogOut, GripVertical, Navigation, FileText, 
  Mail, Phone, MapPin, ChevronUp, ChevronDown, Star, Bot, Menu, X
} from "lucide-react";

export default function AdminPage() {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [saved, setSaved] = useState(false);

  const {
    siteName, setSiteName, siteTagline, setSiteTagline,
    navItems, setNavItems, ctaButtonText, setCtaButtonText, ctaButtonLink, setCtaButtonLink,
    heroTitle1, setHeroTitle1, heroTitle2, setHeroTitle2, heroDescription, setHeroDescription,
    heroPrimaryBtn, setHeroPrimaryBtn, heroSecondaryBtn, setHeroSecondaryBtn,
    stats, setStats, categories, setCategories, footerCopyright, setFooterCopyright,
    featuredCategories, setFeaturedCategories, chatApiKey, setChatApiKey,
    chatEndpoint, setChatEndpoint, chatApiKey2, setChatApiKey2,
    chatEndpoint2, setChatEndpoint2, activeChatOption, setActiveChatOption,
    pageContent, setPageContent,
    logoUrl, setLogoUrl,
    faviconUrl, setFaviconUrl,
    websiteTitle, setWebsiteTitle,
    saveConfig, isSaving,
  } = useSite();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("admin_auth", "true");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_auth");
  };

  const handleSave = async () => {
    await saveConfig();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addNavItem = () => {
    const newId = Math.max(...navItems.map(n => n.id), 0) + 1;
    setNavItems([...navItems, { id: newId, name: "New Page", href: "/new", visible: true }]);
  };

  const updateNavItem = (id: number, field: string, value: string | boolean) => {
    setNavItems(navItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeNavItem = (id: number) => {
    setNavItems(navItems.filter(item => item.id !== id));
  };

  const moveNavItem = (id: number, direction: "up" | "down") => {
    const index = navItems.findIndex(item => item.id === id);
    if ((direction === "up" && index === 0) || (direction === "down" && index === navItems.length - 1)) return;
    const newItems = [...navItems];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    setNavItems(newItems);
  };

  const addCategory = () => {
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    setCategories([...categories, { id: newId, name: "New Category", links: [] }]);
  };

  const updateCategory = (id: number, name: string) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, name } : cat));
  };

  const removeCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const addLinkToCategory = (catId: number) => {
    setCategories(categories.map(cat => {
      if (cat.id === catId) {
        const newLinkId = Math.max(...cat.links.map(l => l.id), 0) + 1;
        return { ...cat, links: [...cat.links, { id: newLinkId, name: "New Link", url: "#" }] };
      }
      return cat;
    }));
  };

  const updateLink = (catId: number, linkId: number, field: "name" | "url", value: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === catId) {
        return { ...cat, links: cat.links.map(link => link.id === linkId ? { ...link, [field]: value } : link) };
      }
      return cat;
    }));
  };

  const removeLink = (catId: number, linkId: number) => {
    setCategories(categories.map(cat => {
      if (cat.id === catId) {
        return { ...cat, links: cat.links.filter(link => link.id !== linkId) };
      }
      return cat;
    }));
  };

  const updateStat = (id: number, field: "value" | "label", value: string) => {
    setStats(stats.map(stat => stat.id === id ? { ...stat, [field]: value } : stat));
  };

  const addFeaturedCategory = () => {
    const newId = Math.max(...featuredCategories.map(c => c.id), 0) + 1;
    setFeaturedCategories([...featuredCategories, { id: newId, title: "New Category", links: [] }]);
  };

  const updateFeaturedCategory = (id: number, title: string) => {
    setFeaturedCategories(featuredCategories.map(cat => cat.id === id ? { ...cat, title } : cat));
  };

  const removeFeaturedCategory = (id: number) => {
    setFeaturedCategories(featuredCategories.filter(cat => cat.id !== id));
  };

  const addLinkToFeaturedCategory = (catId: number) => {
    setFeaturedCategories(featuredCategories.map(cat => {
      if (cat.id === catId) {
        const newLinkId = cat.links.length > 0 ? Math.max(...cat.links.map(l => l.id)) + 1 : 1;
        return { ...cat, links: [...cat.links, { id: newLinkId, name: "New Link", url: "https://", tooltip: "Enter link description" }] };
      }
      return cat;
    }));
  };

  const updateFeaturedLink = (catId: number, linkId: number, field: "name" | "url" | "tooltip", value: string) => {
    setFeaturedCategories(featuredCategories.map(cat => {
      if (cat.id === catId) {
        return { ...cat, links: cat.links.map(link => link.id === linkId ? { ...link, [field]: value } : link) };
      }
      return cat;
    }));
  };

  const removeFeaturedLink = (catId: number, linkId: number) => {
    setFeaturedCategories(featuredCategories.map(cat => {
      if (cat.id === catId) {
        return { ...cat, links: cat.links.filter(link => link.id !== linkId) };
      }
      return cat;
    }));
  };

  const updatePageContent = async (path: string, name: string, sections: any[]) => {
    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, name, sections }),
      });
      if (response.ok) {
        setPageContent({ ...pageContent, [path]: JSON.stringify(sections) });
      }
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };

  const addCategoryToPage = (path: string, pageName: string) => {
    const currentData = pageContent[path] ? JSON.parse(pageContent[path]) : [];
    const newId = Math.max(...currentData.map((c: any) => c.id), 0) + 1;
    const newData = [...currentData, { id: newId, name: "New Section", links: [] }];
    updatePageContent(path, pageName, newData);
  };

  const updateCategoryInPage = (path: string, pageName: string, catId: number, name: string) => {
    const currentData = JSON.parse(pageContent[path]);
    const newData = currentData.map((cat: any) => cat.id === catId ? { ...cat, name } : cat);
    updatePageContent(path, pageName, newData);
  };

  const removeCategoryFromPage = (path: string, pageName: string, catId: number) => {
    const currentData = JSON.parse(pageContent[path]);
    const newData = currentData.filter((cat: any) => cat.id !== catId);
    updatePageContent(path, pageName, newData);
  };

  const addLinkToPageCategory = (path: string, pageName: string, catId: number) => {
    const currentData = JSON.parse(pageContent[path]);
    const newData = currentData.map((cat: any) => {
      if (cat.id === catId) {
        const newLinkId = Math.max(...cat.links.map((l: any) => l.id), 0) + 1;
        return { ...cat, links: [...cat.links, { id: newLinkId, name: "New Tool", url: "https://" }] };
      }
      return cat;
    });
    updatePageContent(path, pageName, newData);
  };

  const updateLinkInPage = (path: string, pageName: string, catId: number, linkId: number, field: string, value: string) => {
    const currentData = JSON.parse(pageContent[path]);
    const newData = currentData.map((cat: any) => {
      if (cat.id === catId) {
        return { ...cat, links: cat.links.map((link: any) => link.id === linkId ? { ...link, [field]: value } : link) };
      }
      return cat;
    });
    updatePageContent(path, pageName, newData);
  };

  const removeLinkFromPage = (path: string, pageName: string, catId: number, linkId: number) => {
    const currentData = JSON.parse(pageContent[path]);
    const newData = currentData.map((cat: any) => {
      if (cat.id === catId) {
        return { ...cat, links: cat.links.filter((link: any) => link.id !== linkId) };
      }
      return cat;
    });
    updatePageContent(path, pageName, newData);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Lock className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-slate-600 mt-2">Sign in to manage the portal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter username" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-12" placeholder="Enter password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-lg font-bold">SRPH Admin</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={cn(
        "w-full lg:w-64 bg-slate-900 text-white p-6 flex flex-col fixed lg:h-full z-40 transition-transform duration-300",
        mobileMenuOpen ? "translate-y-0" : "-translate-y-full lg:translate-y-0"
      )}>
        <div className="hidden lg:block mb-8">
          <h1 className="text-xl font-bold">SRPH Admin</h1>
          <p className="text-slate-400 text-sm">Portal Management</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
            { id: "header", icon: Navigation, label: "Header & Navigation" },
            { id: "hero", icon: FileText, label: "Hero Section" },
            { id: "featured", icon: Star, label: "Featured Quick Links" },
            { id: "stats", icon: LayoutDashboard, label: "Statistics" },
            { id: "quicklinks", icon: LinkIcon, label: "All Quick Links" },
            { id: "footer", icon: Mail, label: "Footer" },
            { id: "chatbot", icon: Bot, label: "AI Chatbot" },
            { id: "pages", icon: FileText, label: "Page Editor" },
            { id: "images", icon: Image, label: "Images" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${activeTab === item.id ? "bg-green-600" : "hover:bg-slate-800"}`}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </button>
          ))}
        </nav>
        <div className="pt-6 border-t border-slate-700 space-y-1">
          <button onClick={() => setLocation("/")} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-sm">
            <LayoutDashboard className="h-4 w-4" /> View Portal
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-sm text-red-400">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900">
            {activeTab === "dashboard" && "Admin Overview"}
            {activeTab === "header" && "Header & Navigation"}
            {activeTab === "hero" && "Hero Section"}
            {activeTab === "featured" && "Featured Quick Links"}
            {activeTab === "stats" && "Statistics"}
            {activeTab === "quicklinks" && "All Quick Links"}
            {activeTab === "footer" && "Footer"}
            {activeTab === "chatbot" && "AI Chatbot Settings"}
            {activeTab === "pages" && "Page Content Editor"}
            {activeTab === "images" && "Images"}
            {activeTab === "settings" && "Settings"}
          </h2>
          <button onClick={handleSave} className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm ${saved ? "bg-green-100 text-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}>
            <Save className="h-4 w-4" /> {isSaving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        <div className="max-w-4xl">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Navigation className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium">Nav Items</h3>
                  <p className="text-2xl font-bold text-slate-900">{navItems.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium">Pages</h3>
                  <p className="text-2xl font-bold text-slate-900">{Object.keys(pageContent).length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Star className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium">Featured Links</h3>
                  <p className="text-2xl font-bold text-slate-900">{featuredCategories.reduce((acc, cat) => acc + cat.links.length, 0)}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">Quick Start Guide</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm font-bold text-green-600">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Branding & Nav</h4>
                      <p className="text-sm text-slate-600">Update your site name and navigation menu in the Header tab.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm font-bold text-green-600">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Custom Content</h4>
                      <p className="text-sm text-slate-600">Use the Page Editor to add text content to your custom navigation links.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm font-bold text-green-600">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900">AI Integration</h4>
                      <p className="text-sm text-slate-600">Configure your Samsung AI Agent API key and endpoint to enable the chatbot.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "header" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-green-600" />
                  Site Branding
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Site Name</label>
                    <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tagline</label>
                    <input type="text" value={siteTagline} onChange={(e) => setSiteTagline(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-green-600" />
                    Navigation Menu
                  </h3>
                  <button onClick={addNavItem} className="flex items-center gap-1 text-sm font-bold text-green-600 hover:text-green-700 bg-green-50 px-3 py-1.5 rounded-full transition-colors">
                    <Plus className="h-4 w-4" /> Add Tab
                  </button>
                </div>
                <div className="space-y-3">
                  {navItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex sm:flex-col gap-1 order-last sm:order-first">
                        <button onClick={() => moveNavItem(item.id, "up")} className="p-1 text-slate-400 hover:text-slate-600 bg-white rounded border border-slate-200"><ChevronUp className="h-3 w-3" /></button>
                        <button onClick={() => moveNavItem(item.id, "down")} className="p-1 text-slate-400 hover:text-slate-600 bg-white rounded border border-slate-200"><ChevronDown className="h-3 w-3" /></button>
                      </div>
                      <input type="text" value={item.name} onChange={(e) => updateNavItem(item.id, "name", e.target.value)} className="w-full sm:flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium" placeholder="Tab Name" />
                      <input type="text" value={item.href} onChange={(e) => updateNavItem(item.id, "href", e.target.value)} className="w-full sm:flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium" placeholder="/path" />
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <input type="checkbox" checked={item.visible} onChange={(e) => updateNavItem(item.id, "visible", e.target.checked)} className="rounded text-green-600 focus:ring-green-500" /> Visible
                        </label>
                        <button onClick={() => removeNavItem(item.id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-green-600" />
                  CTA Button
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Button Text</label>
                    <input type="text" value={ctaButtonText} onChange={(e) => setCtaButtonText(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Button Link</label>
                    <input type="text" value={ctaButtonLink} onChange={(e) => setCtaButtonLink(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-600" />
                  Hero Content
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Title Line 1</label>
                    <input type="text" value={heroTitle1} onChange={(e) => setHeroTitle1(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Title Line 2 (Highlight)</label>
                    <input type="text" value={heroTitle2} onChange={(e) => setHeroTitle2(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Description</label>
                    <textarea value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">Hero Buttons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Primary Button Text</label>
                    <input type="text" value={heroPrimaryBtn} onChange={(e) => setHeroPrimaryBtn(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Secondary Button Text</label>
                    <input type="text" value={heroSecondaryBtn} onChange={(e) => setHeroSecondaryBtn(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "featured" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Star className="h-4 w-4 text-green-600" />
                  Featured Quick Links
                </h3>
                <button onClick={addFeaturedCategory} className="flex items-center gap-1 text-sm font-bold text-green-600 hover:text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                  <Plus className="h-4 w-4" /> Add Section
                </button>
              </div>
              {featuredCategories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-50">
                    <input type="text" value={cat.title} onChange={(e) => updateFeaturedCategory(cat.id, e.target.value)} className="text-lg font-bold text-slate-800 bg-transparent border-none focus:ring-0 p-0" />
                    <div className="flex items-center gap-2">
                      <button onClick={() => addLinkToFeaturedCategory(cat.id)} className="text-xs font-bold text-green-600 hover:bg-green-50 px-2 py-1 rounded">Add Link</button>
                      <button onClick={() => removeFeaturedCategory(cat.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cat.links.map((link) => (
                      <div key={link.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group">
                        <button onClick={() => removeFeaturedLink(cat.id, link.id)} className="absolute -top-2 -right-2 bg-white text-red-400 hover:text-red-600 p-1 rounded-full border border-slate-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
                        <div className="space-y-3">
                          <input type="text" value={link.name} onChange={(e) => updateFeaturedLink(cat.id, link.id, "name", e.target.value)} className="w-full text-sm font-bold bg-transparent border-none p-0 focus:ring-0" placeholder="Link Name" />
                          <input type="text" value={link.url} onChange={(e) => updateFeaturedLink(cat.id, link.id, "url", e.target.value)} className="w-full text-xs text-slate-500 bg-transparent border-none p-0 focus:ring-0" placeholder="URL" />
                          <input type="text" value={link.tooltip || ""} onChange={(e) => updateFeaturedLink(cat.id, link.id, "tooltip", e.target.value)} className="w-full text-xs text-slate-400 bg-transparent border-none p-0 focus:ring-0" placeholder="Description/Tooltip" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "stats" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Stat Value</label>
                      <input type="text" value={stat.value} onChange={(e) => updateStat(stat.id, "value", e.target.value)} className="text-2xl font-bold text-slate-900 w-full bg-transparent border-none p-0 focus:ring-0" />
                    </div>
                    <div className="flex-[2]">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Label</label>
                      <input type="text" value={stat.label} onChange={(e) => updateStat(stat.id, "label", e.target.value)} className="text-slate-600 w-full bg-transparent border-none p-0 focus:ring-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "quicklinks" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-green-600" />
                  Full System Directory
                </h3>
                <button onClick={addCategory} className="flex items-center gap-1 text-sm font-bold text-green-600 hover:text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                  <Plus className="h-4 w-4" /> Add Category
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((cat) => (
                  <div key={cat.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <input type="text" value={cat.name} onChange={(e) => updateCategory(cat.id, e.target.value)} className="font-bold text-slate-800 bg-transparent border-none p-0 focus:ring-0" />
                      <div className="flex items-center gap-2">
                        <button onClick={() => addLinkToCategory(cat.id)} className="p-1 text-green-600 hover:bg-green-50 rounded"><Plus className="h-4 w-4" /></button>
                        <button onClick={() => removeCategory(cat.id)} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {cat.links.map((link) => (
                        <div key={link.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg group">
                          <input type="text" value={link.name} onChange={(e) => updateLink(cat.id, link.id, "name", e.target.value)} className="flex-1 text-sm bg-transparent border-none p-0 focus:ring-0 font-medium" />
                          <input type="text" value={link.url} onChange={(e) => updateLink(cat.id, link.id, "url", e.target.value)} className="flex-1 text-xs text-slate-400 bg-transparent border-none p-0 focus:ring-0" />
                          <button onClick={() => removeLink(cat.id, link.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity"><X className="h-3 w-3" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "footer" && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-600" />
                Footer Configuration
              </h3>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Copyright Text</label>
                <input type="text" value={footerCopyright} onChange={(e) => setFooterCopyright(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>
          )}

          {activeTab === "chatbot" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Bot className="h-4 w-4 text-green-600" />
                    AI Chatbot Configuration
                  </h3>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 shadow-inner">
                    <button 
                      onClick={() => setActiveChatOption("1")}
                      className={cn(
                        "px-5 py-2 rounded-full text-xs font-bold transition-all duration-300",
                        activeChatOption === "1" 
                          ? "bg-green-600 text-white shadow-lg scale-105 ring-2 ring-green-100" 
                          : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                      )}
                    >
                      Option 1
                    </button>
                    <button 
                      onClick={() => setActiveChatOption("2")}
                      className={cn(
                        "px-5 py-2 rounded-full text-xs font-bold transition-all duration-300",
                        activeChatOption === "2" 
                          ? "bg-green-600 text-white shadow-lg scale-105 ring-2 ring-green-100" 
                          : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                      )}
                    >
                      Option 2
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className={cn("space-y-4 p-4 rounded-xl border transition-all", activeChatOption === "1" ? "bg-green-50/30 border-green-100" : "bg-slate-50/30 border-slate-100")}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-700 text-sm">Option 1: Samsung AI Agent</h4>
                      {activeChatOption === "1" && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">API Key</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            value={chatApiKey} 
                            onChange={(e) => setChatApiKey(e.target.value)} 
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all pr-12" 
                            placeholder="Enter Samsung AI Agent API Key"
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">API Endpoint</label>
                        <input 
                          type="text" 
                          value={chatEndpoint} 
                          onChange={(e) => setChatEndpoint(e.target.value)} 
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                          placeholder="https://agent.sec.samsung.net/api/v1/run/..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className={cn("space-y-4 p-4 rounded-xl border transition-all", activeChatOption === "2" ? "bg-green-50/30 border-green-100" : "bg-slate-50/30 border-slate-100")}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-700 text-sm">Option 2: Alternative AI Agent</h4>
                      {activeChatOption === "2" && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">API Key</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            value={chatApiKey2} 
                            onChange={(e) => setChatApiKey2(e.target.value)} 
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all pr-12" 
                            placeholder="Enter Alternative API Key"
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">API Endpoint</label>
                        <input 
                          type="text" 
                          value={chatEndpoint2} 
                          onChange={(e) => setChatEndpoint2(e.target.value)} 
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                          placeholder="https://alternative-api.com/v1/..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pages" && (
            <div className="space-y-6">
              {navItems.filter(item => item.href !== "/" && item.href !== "/support").map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-4">
                    <div>
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500">{item.href}</p>
                    </div>
                    <button 
                      onClick={() => addCategoryToPage(item.href, item.name)}
                      className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Section
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {pageContent[item.href] && JSON.parse(pageContent[item.href]).map((section: any) => (
                      <div key={section.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                        <div className="flex items-center justify-between mb-3">
                          <input 
                            type="text" 
                            value={section.name} 
                            onChange={(e) => updateCategoryInPage(item.href, item.name, section.id, e.target.value)}
                            className="font-bold text-sm bg-transparent border-none p-0 focus:ring-0"
                          />
                          <div className="flex items-center gap-2">
                            <button onClick={() => addLinkToPageCategory(item.href, item.name, section.id)} className="text-green-600"><Plus className="h-4 w-4" /></button>
                            <button onClick={() => removeCategoryFromPage(item.href, item.name, section.id)} className="text-red-400"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {section.links.map((link: any) => (
                            <div key={link.id} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-100 group">
                              <input 
                                type="text" 
                                value={link.name} 
                                onChange={(e) => updateLinkInPage(item.href, item.name, section.id, link.id, "name", e.target.value)}
                                className="flex-1 text-xs font-medium border-none p-0 focus:ring-0"
                              />
                              <input 
                                type="text" 
                                value={link.url} 
                                onChange={(e) => updateLinkInPage(item.href, item.name, section.id, link.id, "url", e.target.value)}
                                className="flex-1 text-[10px] text-slate-400 border-none p-0 focus:ring-0"
                              />
                              <button onClick={() => removeLinkFromPage(item.href, item.name, section.id, link.id)} className="opacity-0 group-hover:opacity-100 text-red-400 transition-opacity"><X className="h-3 w-3" /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "images" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Image className="h-4 w-4 text-green-600" />
                  Logo & Branding
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Logo URL (Link)</label>
                      <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-2" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Upload Logo File</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const res = await fetch("/api/upload", {
                                method: "POST",
                                body: formData
                              });
                              if (res.ok) {
                                const data = await res.json();
                                setLogoUrl(data.url);
                              }
                            } catch (err) {
                              console.error("Upload failed:", err);
                            }
                          }
                        }}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
                      />
                    </div>
                    {logoUrl && (
                      <div className="mt-2 p-2 border border-slate-100 rounded-lg bg-slate-50 flex items-center justify-center">
                        <img src={logoUrl} alt="Logo Preview" className="h-12 object-contain" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Favicon URL (Link)</label>
                      <input type="text" value={faviconUrl} onChange={(e) => setFaviconUrl(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-2" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Upload Favicon File</label>
                      <input 
                        type="file" 
                        accept="image/x-icon,image/png"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const res = await fetch("/api/upload", {
                                method: "POST",
                                body: formData
                              });
                              if (res.ok) {
                                const data = await res.json();
                                setFaviconUrl(data.url);
                              }
                            } catch (err) {
                              console.error("Upload failed:", err);
                            }
                          }
                        }}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
                      />
                    </div>
                    {faviconUrl && (
                      <div className="mt-2 p-2 border border-slate-100 rounded-lg bg-slate-50 flex items-center justify-center">
                        <img src={faviconUrl} alt="Favicon Preview" className="h-8 w-8 object-contain" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-green-600" />
                  General Settings
                </h3>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Website Title (SEO)</label>
                  <input type="text" value={websiteTitle} onChange={(e) => setWebsiteTitle(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
