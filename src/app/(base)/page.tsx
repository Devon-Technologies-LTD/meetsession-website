import { DownloadApps } from "@/features/base/components/download-apps";
import { FAQs } from "@/features/base/components/faqs";
import { Hero } from "@/features/base/components/hero";
import { HowItWorks } from "@/features/base/components/how-it-works";
import { JoinWaitlist } from "@/features/base/components/join-waitlist";
import { Testimonials } from "@/features/base/components/testimonials";
import { WhyMeetSession } from "@/features/base/components/why-meet-session";

export default function Page() {
  return (
    <div className="h-fit w-full">
      <Hero />
      <WhyMeetSession />
      <HowItWorks />
      <JoinWaitlist />
      <Testimonials />
      <DownloadApps />
      <FAQs />
    </div>
  );
}
