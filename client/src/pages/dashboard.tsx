import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ArrowRight, MessageCircle, Send, X, Search, BookOpen, Headphones, Shield, ExternalLink, Loader2, Maximize2, Minimize2, Bot, Zap, Power } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useSite } from "@/context/SiteContext";
import { cn } from "@/lib/utils";
import businessIllustration from "@/assets/business-illustration.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Dashboard() {
  const { heroTitle1, heroTitle2, heroDescription, heroPrimaryBtn, heroSecondaryBtn, stats, categories, footerCopyright, featuredCategories, chatApiKey, chatApiKey2, activeChatOption: globalActiveOption } = useSite();
  const [activeChatOption, setActiveChatOption] = useState("1");

  useEffect(() => {
    if (globalActiveOption) {
      setActiveChatOption(globalActiveOption);
    }
  }, [globalActiveOption]);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMaximized, setChatMaximized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I am your SRPH MIS Assistant. I can help you navigate enterprise systems, find IT resources, or answer general questions about our portal. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const JIRA_URL = "https://jira.sec.samsung.net/secure/CreateIssue.jspa?issuetype=14300&pid=22000";

  const scrollToSystems = () => {
    const element = document.getElementById("quick-access-tools");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          option: activeChatOption,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I apologize, but I'm having trouble connecting right now. Please try again later or contact IT Support for immediate assistance." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatUrl = (url: string): string => {
    if (!url || url === "#") return "#";
    const trimmedUrl = url.trim();
    if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
      return trimmedUrl;
    }
    if (trimmedUrl.startsWith("/")) {
      return trimmedUrl;
    }
    return `https://${trimmedUrl}`;
  };

  return (
    <DashboardLayout>
      {/* Featured Quick Links Section - 3 Column Boxes */}
      <div id="quick-access-tools" className="bg-slate-50 py-10 px-6 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">Quick Access Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-50 pb-2">{category.title}</h3>
                <ul className="space-y-3">
                  {category.links.map((link) => (
                    <li key={link.id} className="relative group/item">
                      <a 
                        href={formatUrl(link.url)} 
                        target={link.url !== "#" && !link.url.startsWith("/") ? "_blank" : undefined}
                        rel={link.url !== "#" && !link.url.startsWith("/") ? "noopener noreferrer" : undefined}
                        className="text-sm text-slate-700 hover:text-green-600 font-medium transition-colors flex items-center gap-2 group"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-green-500 transition-colors shrink-0" />
                        {link.name}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-slate-300" />
                      </a>
                      {/* Small Popup on Hover */}
                      <div className="absolute left-0 bottom-full mb-2 hidden group-hover/item:block z-10 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg pointer-events-none">
                        <p className="font-bold mb-1">Information:</p>
                        <p className="opacity-80 line-clamp-2">{link.tooltip || "Click to open this link"}</p>
                        <div className="absolute left-4 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-800"></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
