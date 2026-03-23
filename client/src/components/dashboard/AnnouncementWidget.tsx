import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Calendar, ArrowUpRight } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Scheduled Maintenance: Data Center B",
    date: "Dec 28, 2024",
    type: "Maintenance",
    priority: "high"
  },
  {
    id: 2,
    title: "New Security Protocol Implementation",
    date: "Jan 02, 2025",
    type: "Policy",
    priority: "medium"
  },
  {
    id: 3,
    title: "Holiday Support Hours Update",
    date: "Dec 24, 2024",
    type: "General",
    priority: "low"
  }
];

export function AnnouncementWidget() {
  return (
    <Card className="col-span-1 h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">IT Announcements</CardTitle>
        <Megaphone className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {announcements.map((item) => (
            <div key={item.id} className="group flex items-start space-x-3 rounded-lg border border-transparent p-2 transition-colors hover:bg-secondary/50 hover:border-border/50 cursor-pointer">
              <div className="bg-primary/10 text-primary rounded p-1.5 mt-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-normal uppercase">
                    {item.type}
                  </Badge>
                </div>
              </div>
              <ArrowUpRight className="h-3 w-3 opacity-0 text-muted-foreground group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
