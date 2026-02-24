import type { Metadata } from "next";
import { HiBookmark } from "react-icons/hi2";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Saved Items",
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Saved Items</h1>
      <p className="text-muted-foreground mt-2">Your bookmarked listings</p>

      <Card className="mt-8">
        <CardContent className="flex flex-col items-center py-16 text-center">
          <HiBookmark className="text-muted-foreground h-12 w-12" />
          <h3 className="mt-4 text-lg font-semibold">No saved items yet</h3>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm">
            Browse listings in the Hub and click the bookmark icon to save them here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
