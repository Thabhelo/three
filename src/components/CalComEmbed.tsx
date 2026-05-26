import Cal from "@calcom/embed-react";
import { contactConfig } from "@/config/contact";

export default function CalComEmbed() {
  return (
    <div className="min-h-[640px] w-full overflow-hidden rounded-[14px] border border-white/10 bg-[#0a0a0a]">
      <Cal
        calLink={contactConfig.calLink}
        style={{ width: "100%", height: "100%", minHeight: "640px", overflow: "auto" }}
        config={{
          layout: "month_view",
          theme: "dark",
        }}
      />
    </div>
  );
}
