import { Hero } from "@/features/base/components/hero";
import { WhyMeetSession } from "@/features/base/components/why-meet-session";
import { HowItWorks } from "@/features/base/components/how-it-works";
import { MeasureImpact } from "@/features/base/components/measure-impact";
import { Pricing } from "@/features/base/components/pricing";
import { DownloadApps } from "@/features/base/components/download-apps";
import { CampusProgramAd } from "@/features/base/components/campus-program-ad";
import { VideoTutorials } from "@/features/base/components/video-tutorials";
import { BASE_URL } from "@/lib/constants";
import { apiClient } from "@/lib/server-api";
import { TSubscriptionPlan } from "@/lib/types";
// import { JoinWaitlist } from "@/features/base/components/join-waitlist";
// import { Testimonials } from "@/features/base/components/testimonials";
// import { FAQs } from "@/features/base/components/faqs";

export default async function Page() {
  type TResponse = {
    message: string;
    data: TSubscriptionPlan[];
  };

  function generateTiersPath() {
    const tiersPath = "/all-tiers?with_feature=true";
    return tiersPath;
  }
  function generateTiersUrl() {
    const tiersUrl = `${BASE_URL.replace(/\/$/, "")}${generateTiersPath()}`;
    return tiersUrl;
  }

  console.log("[tiers] Requesting public tiers", {
    url: generateTiersUrl(),
    method: "GET",
  });

  const tierResponse = await apiClient.unauthenticated<TResponse>(
    generateTiersPath(),
    {
      method: "GET",
    },
  );

  if (tierResponse.ok) {
    console.log("[tiers] Public tiers response", {
      url: generateTiersUrl(),
      status: tierResponse.status,
      count: tierResponse.data.data?.length ?? 0,
      message: tierResponse.data.message,
    });
  } else {
    console.error("[tiers] Public tiers request failed", {
      url: generateTiersUrl(),
      status: tierResponse.status,
      error: tierResponse.error,
    });
  }

  const plans = tierResponse.ok ? tierResponse.data.data : null;

  return (
    <div className="h-fit w-full">
      <Hero />
      <WhyMeetSession />
      <HowItWorks />
      <CampusProgramAd />
      <MeasureImpact />
      <Pricing plans={plans} />
      {/*<JoinWaitlist />*/}
      {/*<Testimonials />*/}
      <DownloadApps />
      <VideoTutorials />
      {/*<FAQs />*/}
    </div>
  );
}
