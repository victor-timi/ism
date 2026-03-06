import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export default function HubPage() {
  redirect(ROUTES.hubJobs);
}
