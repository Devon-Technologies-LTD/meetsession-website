import { Hero } from "@/features/base/components/hero";
import { WhyMeetSession } from "@/features/base/components/why-meet-session";
import { HowItWorks } from "@/features/base/components/how-it-works";
import { MeasureImpact } from "@/features/base/components/measure-impact";
import { Pricing } from "@/features/base/components/pricing";
import { DownloadApps } from "@/features/base/components/download-apps";
import { CampusProgramAd } from "@/features/base/components/campus-program-ad";
import { VideoTutorials } from "@/features/base/components/video-tutorials";
// import { JoinWaitlist } from "@/features/base/components/join-waitlist";
// import { Testimonials } from "@/features/base/components/testimonials";
// import { FAQs } from "@/features/base/components/faqs";

export default function Page() {
  return (
    <div className="h-fit w-full">
      <Hero />
      <WhyMeetSession />
      <HowItWorks />
      <CampusProgramAd />
      <MeasureImpact />
      <Pricing />
      {/*<JoinWaitlist />*/}
      {/*<Testimonials />*/}
      <DownloadApps />
      <VideoTutorials />
      {/*<FAQs />*/}
    </div>
  );
}
