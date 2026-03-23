import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSite } from "@/context/SiteContext";
import logo from "@/assets/logo.png";

export function TopNav() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { siteName, siteTagline, logoUrl, navItems, ctaButtonText } = useSite();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleNavItems = navItems.filter(item => item.visible);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
      isScrolled 
        ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-2 shadow-sm" 
        : "bg-transparent py-4"
    )}>
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-2 shadow-lg shadow-green-500/20 transition-transform group-hover:scale-105 active:scale-95">
            {logoUrl ? (
              <img src={logoUrl} alt={siteName} className="h-full w-full object-contain" />
            ) : (
              <img src={logo} alt="SRPH" className="h-full w-full object-contain brightness-0 invert" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none group-hover:text-green-600 transition-colors">
              {siteName.split(' ')[0]}<span className="text-green-600 group-hover:text-slate-900 transition-colors">{siteName.split(' ').slice(1).join(' ')}</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-1">{siteTagline}</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/50 backdrop-blur-sm p-1 rounded-full border border-slate-200/50">
          {visibleNavItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link 
                key={item.id} 
                href={item.href}
                className={cn(
                  "px-5 py-2 text-sm font-semibold transition-all rounded-full cursor-pointer",
                  isActive 
                    ? "bg-white text-green-600 shadow-sm" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://jira.sec.samsung.net/secure/CreateIssue.jspa?issuetype=14300&pid=22000"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-900/10"
          >
            <span className="relative z-10">{ctaButtonText}</span>
            <ChevronRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-green-500 to-green-400 transition-transform group-hover:translate-x-0" />
          </a>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors active:scale-90"
        >
          {mobileMenuOpen ? <X className="h-6 w-6 text-slate-900" /> : <Menu className="h-6 w-6 text-slate-900" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full md:hidden bg-white border-b border-slate-100 p-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-2">
            {visibleNavItems.map((item) => (
              <Link 
                key={item.id} 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)} 
                className={cn(
                  "flex items-center justify-between text-base font-bold p-4 rounded-2xl transition-all",
                  location === item.href 
                    ? "bg-green-50 text-green-600" 
                    : "text-slate-600 hover:bg-slate-50 active:scale-[0.98]"
                )}
              >
                {item.name}
                {location === item.href && <ChevronRight className="h-4 w-4" />}
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <a 
              href="https://jira.sec.samsung.net/secure/CreateIssue.jspa?issuetype=14300&pid=22000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all active:scale-[0.98] shadow-lg shadow-green-600/20"
            >
              {ctaButtonText}
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
