import { Suspense } from "react";
import { HiBriefcase, HiHome, HiTag, HiMagnifyingGlass } from "react-icons/hi2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

function EmptyState({ type, icon: Icon }: { type: string; icon: React.ElementType }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center py-16 text-center">
        <Icon className="text-muted-foreground h-12 w-12" />
        <h3 className="mt-4 text-lg font-semibold">No {type} yet</h3>
        <p className="text-muted-foreground mt-2 max-w-sm text-sm">
          We&apos;re working on bringing you the best {type.toLowerCase()} listings. Check back
          soon!
        </p>
      </CardContent>
    </Card>
  );
}

export default function HubPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  return (
    <Suspense>
      <HubContent searchParams={searchParams} />
    </Suspense>
  );
}

async function HubContent({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  const params = await searchParams;
  const activeTab = params.type || "jobs";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Listings Hub</h1>
        <p className="text-muted-foreground mt-2">
          Browse jobs, housing, and discounts for international students
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <HiMagnifyingGlass className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input placeholder="Search listings..." className="pl-10" defaultValue={params.q || ""} />
      </div>

      {/* Tabs */}
      <Tabs defaultValue={activeTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="jobs" className="gap-2">
            <HiBriefcase className="h-4 w-4" />
            Jobs
          </TabsTrigger>
          <TabsTrigger value="housing" className="gap-2">
            <HiHome className="h-4 w-4" />
            Housing
          </TabsTrigger>
          <TabsTrigger value="discounts" className="gap-2">
            <HiTag className="h-4 w-4" />
            Discounts
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="jobs">
            <EmptyState type="Jobs" icon={HiBriefcase} />
          </TabsContent>
          <TabsContent value="housing">
            <EmptyState type="Housing" icon={HiHome} />
          </TabsContent>
          <TabsContent value="discounts">
            <EmptyState type="Discounts" icon={HiTag} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
