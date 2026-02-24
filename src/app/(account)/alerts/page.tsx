import type { Metadata } from "next";
import { HiBell } from "react-icons/hi2";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Alerts",
};

export default function AlertsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Alerts</h1>
      <p className="text-muted-foreground mt-2">Manage your listing notifications</p>

      <Card className="mt-8">
        <CardContent className="flex flex-col items-center py-16 text-center">
          <HiBell className="text-muted-foreground h-12 w-12" />
          <h3 className="mt-4 text-lg font-semibold">No alerts set up</h3>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm">
            Alert functionality is coming soon. You&apos;ll be able to get notified when new
            listings match your criteria.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
