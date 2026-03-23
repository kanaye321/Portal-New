import { useSite } from "@/context/SiteContext";
import { MessageCircle } from "lucide-react";

export function GlobalFooter() {
  const { categories, footerCopyright } = useSite();
  const JIRA_URL = "https://jira.sec.samsung.net/secure/CreateIssue.jspa?issuetype=14300&pid=22000";

  const formatUrl = (url: string): string => {
    if (!url || url === "#") return "#";
    const trimmedUrl = url.trim();
    if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) return trimmedUrl;
    if (trimmedUrl.startsWith("/")) return trimmedUrl;
    return `https://${trimmedUrl}`;
  };

  return (
    <>
      {/* Need Help Section */}
      <div className="bg-green-600 py-12 lg:py-16 px-6">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Need Help Finding Something?</h2>
          <p className="text-base sm:text-lg text-green-100">Use our AI Assistant or contact IT Support for immediate assistance.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-green-600 px-8 py-3 rounded font-semibold hover:bg-green-50 transition-colors">
              <MessageCircle className="h-5 w-5" /> Ask AI Assistant
            </button>
            <button onClick={() => window.open(JIRA_URL, "_blank")} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-green-700 transition-colors">
              Contact IT Support
            </button>
          </div>
        </div>
      </div>

      {/* Quick Links Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <h3 className="text-lg sm:text-xl font-bold text-center mb-8">All Enterprise Systems & Quick Links</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-x-4 gap-y-8 mb-12">
            {categories.map((cat) => (
              <div key={cat.id} className="min-w-0">
                <h4 className="font-bold text-white text-xs sm:text-sm mb-3 truncate border-b border-slate-800 pb-1">{cat.name}</h4>
                <ul className="space-y-1.5">
                  {cat.links.map((link) => (
                    <li key={link.id}>
                      <a 
                        href={formatUrl(link.url)} 
                        target={link.url !== "#" && !link.url.startsWith("/") ? "_blank" : undefined}
                        rel={link.url !== "#" && !link.url.startsWith("/") ? "noopener noreferrer" : undefined}
                        className="text-slate-400 hover:text-green-400 text-[10px] sm:text-xs transition-colors block truncate"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-[10px] sm:text-sm">
            <p>{footerCopyright}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
