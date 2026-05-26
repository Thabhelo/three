import { ArrowUpRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactConfig } from "@/config/contact";

export default function BookingEmbed() {
  const { bookingUrl } = contactConfig;

  return (
    <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <Calendar className="size-5 text-white/70" />
          <div className="text-left">
            <p className="font-label">Scheduling</p>
            <p className="text-sm text-muted-foreground">Google Calendar · pick a time that works</p>
          </div>
        </div>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="rounded-[10px]">
            Open in new tab <ArrowUpRight className="ml-2 size-4" />
          </Button>
        </a>
      </div>
      <iframe
        src={bookingUrl}
        title="Book a call with Thabhelo Duve"
        className="block min-h-[640px] w-full bg-[#0a0a0a]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
