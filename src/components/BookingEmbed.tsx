import { ArrowUpRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactConfig } from "@/config/contact";

export default function BookingEmbed() {
  const { bookingUrl } = contactConfig;

  return (
    <div className="soft-card flex min-h-[420px] flex-col items-center justify-center rounded-[14px] p-8 text-center md:min-h-[480px] md:p-12">
      <Calendar className="size-10 text-indigo-300/80" strokeWidth={1.5} />
      <h2 className="mt-6 font-display text-3xl tracking-tight md:text-4xl">Book a call</h2>
      <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
        Pick a time on my Google Calendar. Scheduling opens in a new tab.
      </p>
      <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-8">
        <Button className="h-12 rounded-[10px] px-6">
          Open scheduling page
          <ArrowUpRight className="ml-2 size-4" />
        </Button>
      </a>
    </div>
  );
}
