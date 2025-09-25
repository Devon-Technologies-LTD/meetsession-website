import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureCards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>A card</CardTitle>
      </CardHeader>
      <div className="w-full h-full">Some content</div>
    </Card>
  );
}
