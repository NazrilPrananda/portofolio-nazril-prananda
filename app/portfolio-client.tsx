
"use client";

import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  category: string | null;
  year: string | null;
  description: string;
  contribution: string | null;
  tech_stack: string[] | null;
  status: string | null;
  project_url?: string | null;
  github_url?: string | null;
  image_url: string | null;
};

type Certificate = {
  id: number;
  title: string;
  issuer: string | null;
  issue_date: string | null;
  certificate_url: string | null;
  image_url: string | null;
  is_featured: boolean;
};

type PortfolioClientProps = {
  projects: Project[];
  featuredCertificates: Certificate[];
  allCertificates: Certificate[];
};

type Tab = "home" | "projects" | "certificates" | "gallery";

const skillGroups = [
  {
    category: "Mobile",
    technologies: ["Flutter", "Dart"],
  },
  {
    category: "Web",
    technologies: ["HTML", "CSS", "JavaScript", "Next.js"],
  },
  {
    category: "Backend",
    technologies: ["Laravel", "PHP", "Go", "REST API"],
  },
  {
    category: "Database",
    technologies: ["MySQL", "PostgreSQL", "Supabase", "SQL"],
  },
  {
    category: "Tools",
    technologies: ["Git", "GitHub", "VS Code"],
  },
];

export default function PortfolioClient({
  projects,
  featuredCertificates,
  allCertificates,
}: PortfolioClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
      setIsLight(true);
    }
  }, []);

  function toggleTheme() {
    const nextTheme = !isLight;

    setIsLight(nextTheme);

    localStorage.setItem(
      "portfolio-theme",
      nextTheme ? "light" : "dark"
    );
  }

  const panelClass = isLight
    ? "border-[#dcdcd8] bg-white"
    : "border-[#1f1f1f] bg-[#0a0a0a]";

  const mutedClass = isLight
    ? "text-[#6b6b6b]"
    : "text-[#9a9a9a]";

  const chipClass = isLight
    ? "border-[#dcdcd8] bg-[#efefec] text-[#6b6b6b]"
    : "border-[#1f1f1f] bg-[#141414] text-[#9a9a9a]";

  const accentClass = isLight
    ? "text-[#1f6feb]"
    : "text-[#4ea1ff]";

  function renderChips(items: string[]) {
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-md border px-2 py-1 font-mono text-[11px] ${chipClass}`}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  function renderCertificateCards(certificates: Certificate[]) {
    if (certificates.length === 0) {
      return (
        <div
          className={`border-t px-6 py-8 text-sm ${mutedClass}`}
        >
          Belum ada sertifikat yang dipublikasikan.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 border-t px-6 py-5 sm:grid-cols-2">
        {certificates.map((certificate) => (
          <article
            key={certificate.id}
            className={`overflow-hidden rounded-xl border ${panelClass}`}
          >
            {certificate.image_url ? (
              <a
                href={certificate.image_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Lihat sertifikat ${certificate.title}`}
                className="block bg-[#141414]"
              >
                <img
                  src={certificate.image_url}
                  alt={`Sertifikat ${certificate.title}`}
                  className="aspect-[4/3] w-full object-contain"
                  loading="lazy"
                />
              </a>
            ) : (
              <div
                className={`grid aspect-[4/3] place-items-center text-xs ${mutedClass}`}
              >
                Gambar sertifikat belum tersedia
              </div>
            )}

            <div className="p-4">
              <h3 className="text-sm font-semibold">
                {certificate.title}
              </h3>

              <p className={`mt-2 text-xs ${mutedClass}`}>
                {certificate.issuer ??
                  "Penyelenggara tidak dicantumkan"}
                {" · "}
                {certificate.issue_date
                  ? new Date(
                      `${certificate.issue_date}T00:00:00`
                    ).getFullYear()
                  : "Tahun tidak dicantumkan"}
              </p>

              {certificate.certificate_url && (
                <a
                  href={certificate.certificate_url}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-3 inline-block text-xs ${accentClass}`}
                >
                  Lihat kredensial ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <main
      className={`min-h-screen px-0 py-0 transition-colors duration-200 sm:px-4 sm:py-6 ${
        isLight
          ? "bg-[#f4f4f2] text-[#141414]"
          : "bg-[#050505] text-[#f2f2f2]"
      }`}
      style={{
        backgroundImage: isLight
          ? "radial-gradient(#dcdcd8 1px, transparent 1px)"
          : "radial-gradient(#1f1f1f 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      <div
        className={`mx-auto min-h-screen max-w-[680px] border-x ${
          isLight
            ? "border-[#dcdcd8] bg-white"
            : "border-[#1f1f1f] bg-[#0a0a0a]"
        }`}
      >
        {/* Cover */}
        <div
          className="h-[200px] bg-cover bg-center"
          role="img"
          aria-label="Banner profil Nazril Prananda"
          style={{
            backgroundImage: "url('/hero/banner.jpg')",
          }}
        />

        {/* Profile */}
        <header className="relative px-6">
          <div className="relative mt-[-52px] grid h-[104px] w-[104px] place-items-center overflow-hidden rounded-[20px] border-4 border-[#0a0a0a] bg-[#141414]">
            <img
              src="/hero/profile.jpg"
              alt="Foto profil Nazril Prananda"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-3 flex flex-row flex-nowrap items-center gap-2">
            <h1 className="text-[22px] font-bold tracking-tight">
              Nazril Prananda
            </h1>

            <img
              src="/hero/verified-badge.png"
              alt="Verified badge"
              title="Verified"
              className="block h-5 w-5 shrink-0 object-contain"
            />
          </div>

          <p className={`text-sm ${mutedClass}`}>
            @NazrilPrananda
          </p>

          <p className={`my-3 text-sm leading-6 ${mutedClass}`}>
            Mahasiswa Teknik Informatika di Institut Teknologi
            Indonesia. Sedang mengembangkan aplikasi dan memperkuat
            kemampuan software development, khususnya backend
            engineering.
          </p>

          <div
            className={`mb-4 flex flex-wrap gap-x-4 gap-y-2 text-xs ${mutedClass}`}
          >
            <span>Informatics Engineering Student</span>
            <span>•</span>
            <span>Institut Teknologi Indonesia</span>
          </div>

          <div
            className={`flex flex-wrap gap-2 border-t py-4 ${
              isLight
                ? "border-[#dcdcd8]"
                : "border-[#1f1f1f]"
            }`}
          >
            <a
              href="https://github.com/NazrilPrananda"
              target="_blank"
              rel="noreferrer"
              className={`rounded-lg border px-3 py-2 text-xs transition hover:opacity-70 ${panelClass}`}
            >
              GitHub ↗
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&to=nazrilprananda@gmail.com"
              target="_blank"
              rel="noreferrer"
              className={`rounded-lg border px-3 py-2 text-xs transition hover:opacity-70 ${panelClass}`}
            >
              Email ↗
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              className={`ml-auto rounded-lg border px-3 py-2 text-sm ${panelClass}`}
              aria-label="Ganti tema"
              title="Ganti tema"
            >
              {isLight ? "☾" : "☀"}
            </button>
          </div>
        </header>

        {/* Navigation */}
        <nav
          className={`sticky top-0 z-10 flex border-y ${
            isLight
              ? "border-[#dcdcd8] bg-white"
              : "border-[#1f1f1f] bg-[#0a0a0a]"
          }`}
          aria-label="Navigasi portofolio"
        >
          {(
            ["home", "projects", "certificates", "gallery"] as Tab[]
          ).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              aria-current={
                activeTab === tab ? "page" : undefined
              }
              className={`flex-1 border-b-2 px-1 py-4 text-xs capitalize transition sm:text-sm ${
                activeTab === tab
                  ? `border-current font-semibold ${accentClass}`
                  : `border-transparent ${mutedClass} hover:opacity-70`
              }`}
            >
              {tab === "certificates" ? "Certificates" : tab}
            </button>
          ))}
        </nav>

        {/* Decorative divider */}
        <Divider isLight={isLight} />

        {/* Home */}
        {activeTab === "home" && (
          <div>
            {/* Education */}
            <section>
              <h2 className="px-6 pb-1 pt-4 text-[30px] font-semibold italic">
                Education
              </h2>

              <article
                className={`border-t px-6 py-4 ${
                  isLight
                    ? "border-[#dcdcd8]"
                    : "border-[#1f1f1f]"
                }`}
              >
                <h3 className="text-base font-semibold">
                  Institut Teknologi Indonesia
                </h3>

                <p className={`mt-1 font-mono text-xs ${mutedClass}`}>
                  September 2024 – Present
                </p>

                <p className={`mt-1 text-sm ${mutedClass}`}>
                  Bachelor's Degree in Informatics Engineering
                </p>

                {renderChips(["GPA 3.73 / 4.00", "KIP Kuliah"])}
              </article>

              <article
                className={`border-t px-6 py-4 ${
                  isLight
                    ? "border-[#dcdcd8]"
                    : "border-[#1f1f1f]"
                }`}
              >
                <h3 className="text-base font-semibold">
                  Informatics Engineering Lab Assistant
                </h3>

                <p className={`mt-1 font-mono text-xs ${mutedClass}`}>
                  March 2025 – Present
                </p>

                <p className={`mt-1 text-sm ${mutedClass}`}>
                  Institut Teknologi Indonesia
                </p>
              </article>
            </section>

            <Divider isLight={isLight} />

            {/* Projects preview */}
            <section>
              <div className="flex items-end justify-between px-6 pb-1 pt-4">
                <h2 className="text-[30px] font-semibold italic">
                  Projects
                </h2>

                <span className={`pb-2 font-mono text-xs ${mutedClass}`}>
                  {projects.length.toString().padStart(2, "0")} total
                </span>
              </div>

              {projects.map((project) => (
                <article
                  key={project.id}
                  className={`border-t px-6 py-4 ${
                    isLight
                      ? "border-[#dcdcd8]"
                      : "border-[#1f1f1f]"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold">
                      {project.title}
                    </h3>

                    <span className={`font-mono text-xs ${mutedClass}`}>
                      {project.year ?? "Year not specified"}
                    </span>
                  </div>

                  <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>
                    {project.description}
                  </p>

                  {project.contribution && (
                    <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>
                      <span className="font-medium">
                        Contribution:{" "}
                      </span>
                      {project.contribution}
                    </p>
                  )}

                  {renderChips(project.tech_stack ?? [])}
                </article>
              ))}
            </section>

            <Divider isLight={isLight} />

            {/* Stack */}
            <section>
              <h2 className="px-6 pb-1 pt-4 text-[30px] font-semibold italic">
                Stack
              </h2>

              {skillGroups.map((group) => (
                <div
                  key={group.category}
                  className={`grid grid-cols-[90px_1fr] border-t sm:grid-cols-[110px_1fr] ${
                    isLight
                      ? "border-[#dcdcd8]"
                      : "border-[#1f1f1f]"
                  }`}
                >
                  <div
                    className={`border-r px-4 py-4 text-xs sm:px-6 ${
                      isLight
                        ? "border-[#dcdcd8]"
                        : "border-[#1f1f1f]"
                    } ${mutedClass}`}
                  >
                    {group.category}
                  </div>

                  <div className="px-4 py-3 sm:px-6">
                    {renderChips(group.technologies)}
                  </div>
                </div>
              ))}
            </section>

            <Divider isLight={isLight} />

            {/* Featured certificates */}
            <section>
              <div className="flex items-end justify-between px-6 pb-2 pt-4">
                <h2 className="text-[30px] font-semibold italic">
                  Achievements
                </h2>

                <span className={`pb-2 font-mono text-xs ${mutedClass}`}>
                  {featuredCertificates.length
                    .toString()
                    .padStart(2, "0")}{" "}
                  featured
                </span>
              </div>

              {featuredCertificates.length === 0 ? (
                <div
                  className={`border-t px-6 py-8 text-sm ${mutedClass}`}
                >
                  Belum ada sertifikat pilihan.
                </div>
              ) : (
                renderCertificateCards(featuredCertificates)
              )}

              <div className="border-t px-6 py-5">
                <button
                  type="button"
                  onClick={() => setActiveTab("certificates")}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:opacity-70 ${panelClass}`}
                >
                  Lihat Semua Sertifikat
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Projects tab */}
        {activeTab === "projects" && (
          <section className="grid grid-cols-1 sm:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className={`border-b p-4 ${
                  isLight
                    ? "border-[#dcdcd8]"
                    : "border-[#1f1f1f]"
                }`}
              >
                <div
                  className={`mb-3 aspect-[16/10] overflow-hidden rounded-xl border ${panelClass}`}
                >
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={`Screenshot ${project.title}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`grid h-full place-items-center text-xs ${mutedClass}`}
                    >
                      Project preview
                    </div>
                  )}
                </div>

                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-block text-sm ${accentClass}`}
                  >
                    View project ↗
                  </a>
                )}

                <div className="flex flex-wrap items-center gap-2">
                  <p className={`font-mono text-xs ${mutedClass}`}>
                    {project.category ?? "Project"} ·{" "}
                    {project.year ?? "—"}
                  </p>

                  {project.status && (
                    <span
                      className={`rounded-md border px-2 py-1 font-mono text-[10px] ${chipClass}`}
                    >
                      {project.status}
                    </span>
                  )}
                </div>

                <h3 className="mt-2 font-semibold">
                  {project.title}
                </h3>

                <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>
                  {project.description}
                </p>

                {renderChips(project.tech_stack ?? [])}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-4 inline-block text-sm ${accentClass}`}
                  >
                    Source code ↗
                  </a>
                )}
              </article>
            ))}
          </section>
        )}

        {/* Full certificate collection */}
        {activeTab === "certificates" && (
          <section>
            <div className="flex items-end justify-between px-6 pb-2 pt-6">
              <div>
                <p className={`font-mono text-xs ${mutedClass}`}>
                  PORTFOLIO / CREDENTIALS
                </p>

                <h2 className="mt-2 text-[30px] font-semibold italic">
                  Certificates
                </h2>
              </div>

              <span className={`pb-2 font-mono text-xs ${mutedClass}`}>
                {allCertificates.length
                  .toString()
                  .padStart(2, "0")}{" "}
                total
              </span>
            </div>

            <p
              className={`border-t px-6 py-4 text-sm leading-6 ${mutedClass}`}
            >
              Kumpulan sertifikat pelatihan, kompetisi, dan pengalaman
              belajar yang mendukung perjalanan saya di bidang teknologi.
            </p>

            {renderCertificateCards(allCertificates)}
          </section>
        )}

        {/* Gallery */}
        {activeTab === "gallery" && (
          <div className={`px-6 py-20 text-center ${mutedClass}`}>
            <p className="text-3xl italic">Gallery</p>

            <p className="mt-3 text-sm">
              Dokumentasi kegiatan dan perjalanan belajar akan
              ditampilkan di sini.
            </p>
          </div>
        )}

        {/* Contact */}
        <section
          className="border-t px-6 py-10"
          style={{
            borderColor: isLight ? "#dcdcd8" : "#1f1f1f",
            backgroundImage: `linear-gradient(120deg, ${
              isLight
                ? "rgba(31,111,235,.08)"
                : "rgba(78,161,255,.18)"
            }, transparent)`,
          }}
        >
          <h2 className="text-xl font-bold">
            Building things, one stage at a time.
          </h2>

          <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>
            Terbuka untuk kesempatan magang, kolaborasi, dan proyek
            yang bisa menjadi ruang untuk terus belajar.
          </p>

          <a
            href="https://github.com/NazrilPrananda"
            target="_blank"
            rel="noreferrer"
            className={`mt-4 inline-block rounded-lg px-4 py-2 text-sm font-semibold ${
              isLight
                ? "bg-[#141414] text-white"
                : "bg-[#f2f2f2] text-[#050505]"
            }`}
          >
            Get in touch ↗
          </a>
        </section>

        {/* Footer */}
        <footer
          className={`flex flex-wrap justify-between gap-3 border-t px-6 py-6 font-mono text-xs ${mutedClass}`}
          style={{
            borderColor: isLight ? "#dcdcd8" : "#1f1f1f",
          }}
        >
          <span>© {new Date().getFullYear()} Nazril Prananda</span>
          <span>Built with Next.js</span>
        </footer>
      </div>
    </main>
  );
}

function Divider({ isLight }: { isLight: boolean }) {
  return (
    <div
      className="h-[22px] border-y"
      style={{
        borderColor: isLight ? "#dcdcd8" : "#1f1f1f",
        backgroundImage: `repeating-linear-gradient(135deg, ${
          isLight ? "#dcdcd8" : "#1f1f1f"
        } 0 2px, transparent 2px 7px)`,
      }}
    />
  );
}

