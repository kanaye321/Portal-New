import { useState, useEffect, useRef } from "react";
import { Send, X, MessageCircle, Maximize2, Minimize2, Bot, Zap, Power } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function GlobalChatbot() {
  const { activeChatOption: globalActiveOption } = useSite();
  const [activeChatOption, setActiveChatOption] = useState("1");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMaximized, setChatMaximized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I am your SRPH MIS Assistant. I can help you navigate enterprise systems, find IT resources, or answer general questions about our portal. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globalActiveOption) {
      setActiveChatOption(globalActiveOption);
    }
  }, [globalActiveOption]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

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

  return (
    <div className={cn(
      "fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
      chatMaximized 
        ? "inset-4 sm:inset-10" 
        : "bottom-6 right-6"
    )}>
      {chatOpen ? (
        <div className={cn(
          "bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200/50 flex flex-col overflow-hidden transition-all duration-500 ring-1 ring-black/5",
          chatMaximized 
            ? "fixed inset-0 z-[60] w-full h-full rounded-none" 
            : "fixed bottom-0 right-0 z-[60] w-full h-full sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[600px] sm:max-h-[85vh] sm:rounded-[2rem]"
        )}>
          <div className="bg-[#034EA2] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight leading-none mb-1">MIS ASSISTANT</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Active System</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center bg-black/20 rounded-xl p-1 border border-white/10">
                <button 
                  onClick={() => setActiveChatOption("1")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-300",
                    activeChatOption === "1" 
                      ? "bg-white text-[#034EA2] shadow-lg scale-105" 
                      : "text-white/40 hover:text-white/60"
                  )}
                >
                  <Zap className={cn("h-3 w-3", activeChatOption === "1" ? "fill-current" : "")} />
                  FAST
                </button>
                <button 
                  onClick={() => setActiveChatOption("2")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-300",
                    activeChatOption === "2" 
                      ? "bg-white text-[#034EA2] shadow-lg scale-105" 
                      : "text-white/40 hover:text-white/80"
                  )}
                >
                  <Power className="h-3 w-3" />
                  OFF
                </button>
              </div>
              <div className="flex items-center gap-1 border-l border-white/10 ml-1 pl-2">
                <button 
                  onClick={() => setChatMaximized(!chatMaximized)} 
                  className="hidden sm:block hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                  {chatMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button onClick={() => { setChatOpen(false); setChatMaximized(false); }} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {showTips && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 relative group">
                <button 
                  onClick={() => setShowTips(false)}
                  className="absolute top-2 right-2 p-1 text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
                <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">Tips for better results</h4>
                <ul className="text-xs text-blue-600 space-y-1 list-disc pl-4">
                  <li>Ask in <b>complete sentences</b> rather than just keywords.</li>
                  <li>Be specific about the <b>system name</b> or tool you are looking for.</li>
                  <li>Describe <b>what you want to do</b> (e.g., "How do I apply for leave?").</li>
                </ul>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex flex-col gap-2", msg.role === "user" ? "items-end" : "items-start")}>
                <div className={cn(
                  "max-w-[88%] px-5 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                  msg.role === "user" 
                    ? "bg-[#034EA2] text-white rounded-tr-none shadow-[#034EA2]/20 shadow-md" 
                    : "bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none"
                )}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-slate prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-ul:my-2 prose-li:my-1 prose-a:text-blue-600 prose-a:font-bold hover:prose-a:underline prose-table:border-collapse prose-table:border prose-table:border-slate-200 prose-th:bg-slate-100 prose-th:border prose-th:border-slate-200 prose-th:p-2 prose-td:border prose-td:border-slate-200 prose-td:p-2 prose-tr:even:bg-slate-50 whitespace-pre-wrap">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest px-1">
                  {msg.role === "user" ? "Sent" : "Assistant"}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center gap-3">
                <div className="bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#034EA2]/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#034EA2]/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#034EA2] rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 backdrop-blur-sm">
            <div className="relative flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-[#034EA2]/20 focus-within:border-[#034EA2] transition-all">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && sendMessage()} 
                placeholder="How can I assist you today?" 
                className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none placeholder:text-slate-400 font-medium"
                disabled={isLoading}
              />
              <button 
                onClick={sendMessage} 
                className="bg-[#034EA2] text-white p-2.5 rounded-xl hover:bg-[#023a78] transition-all disabled:opacity-50 shadow-md shadow-[#034EA2]/20 active:scale-95"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-3 font-medium uppercase tracking-widest">
              SRPH MIS Portal Integrated Intelligence
            </p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setChatOpen(true)} 
          className="bg-[#034EA2] hover:bg-[#023a78] text-white w-16 h-16 rounded-full shadow-[0_10px_30px_rgba(3,78,162,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        >
          <div className="absolute inset-0 rounded-full bg-[#034EA2] animate-ping opacity-20 group-hover:hidden" />
          <MessageCircle className="h-7 w-7 relative z-10" />
        </button>
      )}
    </div>
  );
}
