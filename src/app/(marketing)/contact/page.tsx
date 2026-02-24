import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiEnvelope } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the International Students Movement team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">Contact Us</h1>
      <p className="text-muted-foreground mt-4 text-lg">
        Have a question, suggestion, or want to partner with us? We&apos;d love to hear from you.
      </p>

      <div className="mt-8 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiEnvelope className="h-5 w-5" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              For general inquiries, reach out to us at{" "}
              <strong>hello@ism.org.au</strong>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
