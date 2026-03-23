import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-xl transition-all">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-96 max-w-lg">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for services, tickets, or documentation..."
            className="w-full bg-secondary/50 pl-9 border-none focus-visible:ring-1 focus-visible:ring-primary shadow-none transition-all hover:bg-secondary/80"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-secondary text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background animate-pulse" />
        </Button>
        <div className="h-6 w-px bg-border/50" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium leading-none">Alex Morgan</p>
            <p className="text-xs text-muted-foreground mt-1">Sr. Systems Engineer</p>
          </div>
          <Avatar className="h-9 w-9 border-2 border-background ring-2 ring-border/50 transition-transform hover:scale-105 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
