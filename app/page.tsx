
import { supabase } from "@/lib/supabase";
import PortfolioClient from "./portfolio-client";

export const instant = false;

export default async function Home() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select(
      "id, title, category, year, description, contribution, tech_stack, status, is_published, project_url, github_url, image_url"
    )
    .eq("is_published", true)
    .order("id", { ascending: true });

  if (error) {
    console.error("Failed to load projects:", error.message);
  }

  // Dua sertifikat unggulan untuk Home
  const {
    data: featuredCertificates,
    error: featuredError,
  } = await supabase
    .from("certificates")
    .select(
      "id, title, issuer, issue_date, certificate_url, image_url, is_featured"
    )
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("issue_date", { ascending: false })
    .limit(2);

  if (featuredError) {
    console.error(
      "Failed to load featured certificates:",
      featuredError.message
    );
  }

  // Semua sertifikat untuk tab Certificates
  const {
    data: allCertificates,
    error: allCertificatesError,
  } = await supabase
    .from("certificates")
    .select(
      "id, title, issuer, issue_date, certificate_url, image_url, is_featured"
    )
    .eq("is_published", true)
    .order("issue_date", { ascending: false });

  if (allCertificatesError) {
    console.error(
      "Failed to load all certificates:",
      allCertificatesError.message
    );
  }

  return (
    <PortfolioClient
      projects={projects ?? []}
      featuredCertificates={featuredCertificates ?? []}
      allCertificates={allCertificates ?? []}
    />
  );
}
