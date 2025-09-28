import {
  // TFeature,
  TPlanFeature,
  TSubscriptionPlanFeature,
} from "@/lib/types";

export function retrieveFeatures({
  // features,
  featureOptions,
}: {
  features?: TSubscriptionPlanFeature[];
  featureOptions: TPlanFeature[];
}) {
  const activeFeatures = featureOptions.map((feat) => {
    return {
      ...feat,
      response: "N/A",
    };
  });

  return activeFeatures;
}
