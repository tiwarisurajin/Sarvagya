import { useState, useEffect } from "react";
import AuthNavbar from "../components/layout/AuthNavbar";
import Footer from "../components/layout/Footer";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronRight,
  Compass,
  FileText,
  Layers3,
  LineChart,
  MessageSquare,
  PenSquare,
  Rocket,
  Send,
  Settings2,
  Share2,
  Sparkles,
  Users2,
  CheckCircle2,
  TrendingUp,
  Zap,
  Globe,
} from "lucide-react";

// ─── Palette ──────────────────────────────────────────────────────────────────
// Ivory surfaces: #FAF6EE (face) · #F2EDE0 (mid) · #E8E2D4 (edge) · #DDD5C4 (border)
// Ink text:       #1C1916 (primary) · #4A4540 (secondary) · #8A8078 (muted)
// Emerald accent: #065f46 (dark) · #059669 (mid) · #10b981 (bright) · #d1fae5 (tint)
// App shell bg:   #F5F0E8

// ─── Chip 
function Chip({
  children,
  variant = "default",
  size = "sm",
}: {
  children: React.ReactNode;
  variant?: "default" | "active" | "dark" | "ghost";
  size?: "sm" | "xs";
}) {
  const base = "inline-flex items-center rounded-full font-medium border transition-colors";
  const sz = size === "xs" ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-xs";
  const v = {
    default: "border-[#DDD5C4] bg-[#FAF6EE] text-[#4A4540]",
    active:  "border-emerald-600 bg-emerald-600 text-white",
    dark:    "border-[#1C1916] bg-[#1C1916] text-[#FAF6EE]",
    ghost:   "border-[#DDD5C4] bg-white text-[#1C1916]",
  };
  return <span className={`${base} ${sz} ${v[variant]}`}>{children}</span>;
}

// ─── MetricCard ───────────────────────────────────────────────────────────────
function MetricCard({ label, value, delta, icon }: {
  label: string; value: string; delta: string; icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#DDD5C4] bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      {icon && (
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          {icon}
        </div>
      )}
      <div className="text-xs font-semibold uppercase tracking-wider text-[#8A8078]">{label}</div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="text-3xl font-bold tracking-tight text-[#1C1916]">{value}</div>
        <span className="mb-0.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
          {delta}
        </span>
      </div>
    </div>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
function SectionHeader({ index, title, eyebrow, description }: {
  index: string; title: string; eyebrow: string; description: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-[#DDD5C4] bg-[#FAF6EE] px-8 py-7 shadow-sm"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,253,248,0.9), 0 2px 8px rgba(60,45,25,0.07)" }}>
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDD5C4] bg-white text-sm font-bold text-[#1C1916] shadow-sm">
          {index}
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#1C1916]">{title}</h2>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
          <Sparkles className="h-3 w-3" />
          {eyebrow}
        </span>
      </div>
      <p className="max-w-4xl text-[15px] leading-relaxed text-[#4A4540]">{description}</p>
    </div>
  );
}

// ─── AppSidebar ───────────────────────────────────────────────────────────────
const navItems = [
  { icon: Layers3,   label: "Dashboard",         active: true },
  { icon: PenSquare, label: "Creator Studio" },
  { icon: Rocket,    label: "Publishing Engine" },
  { icon: Compass,   label: "Feed" },
  { icon: Users2,    label: "Community" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Briefcase, label: "Teams" },
  { icon: Calendar,  label: "Content Calendar" },
];

function AppSidebar() {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col rounded-3xl border border-[#DDD5C4] bg-[#FAF6EE] p-4 shadow-sm"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,253,248,0.9), 0 2px 12px rgba(60,45,25,0.08)" }}>
      <div className="flex items-center gap-3 rounded-2xl border border-[#DDD5C4] bg-white p-3 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1C1916] font-bold text-[#FAF6EE] text-lg">S</div>
        <div>
          <div className="font-bold text-sm text-[#1C1916]">Sarvagya</div>
          <div className="text-[11px] text-[#8A8078]">Creator OS</div>
        </div>
      </div>
      <nav className="mt-4 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-emerald-600 text-white"
                  : "text-[#4A4540] hover:bg-[#EDE7D8] hover:text-[#1C1916]"
              }`}>
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto pt-5">
        <div className="rounded-2xl border border-[#DDD5C4] bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8A8078]">Queue status</div>
          <div className="mt-3 space-y-2">
            {["LinkedIn post ready", "Instagram queued", "Newsletter at 6 PM"].map((item) => (
              <div key={item} className="rounded-xl border border-[#E8E2D4] bg-[#FAF6EE] px-3 py-2 text-[12px] text-[#4A4540]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── WorkflowStep ─────────────────────────────────────────────────────────────
function WorkflowStep({ step, title, desc, items, icon, active = false }: {
  step: string; title: string; desc: string; items: string[]; icon: React.ReactNode; active?: boolean;
}) {
  return (
    <div className={`rounded-3xl border p-5 transition-all duration-300 ${
      active
        ? "border-emerald-300 bg-emerald-50 shadow-md"
        : "border-[#DDD5C4] bg-white"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A8078]">Step {step}</div>
          <h3 className="mt-1 text-lg font-bold text-[#1C1916]">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-[#4A4540]">{desc}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
          active ? "bg-emerald-600 text-white" : "bg-[#EDE7D8] text-[#4A4540]"
        }`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-xl border border-[#DDD5C4] bg-[#FAF6EE] px-3 py-1.5 text-xs font-medium text-[#4A4540]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── QueueItem ────────────────────────────────────────────────────────────────
function QueueItem({ title, sub, status }: {
  title: string; sub: string; status: "Ready" | "Queued" | "Scheduled" | "Published" | "Draft";
}) {
  const statusColors: Record<string, string> = {
    Ready:     "bg-emerald-600 text-white border-emerald-500",
    Queued:    "bg-[#FAF6EE] text-[#4A4540] border-[#DDD5C4]",
    Scheduled: "bg-white text-[#1C1916] border-[#DDD5C4]",
    Published: "bg-[#1C1916] text-[#FAF6EE] border-[#1C1916]",
    Draft:     "bg-[#F2EDE0] text-[#8A8078] border-[#DDD5C4]",
  };
  return (
    <div className="rounded-2xl border border-[#E8E2D4] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-semibold text-[#1C1916] text-sm">{title}</div>
          <div className="mt-1 text-xs text-[#8A8078]">{sub}</div>
        </div>
        <span className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold ${statusColors[status]}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

// ─── Home 
export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((p) => (p + 1) % 3), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPulseIndex((p) => (p + 1) % 4), 1400);
    return () => clearInterval(t);
  }, []);

  const platforms = ["LinkedIn", "X / Twitter", "Instagram", "YouTube", "Medium", "Substack", "Threads", "Community"];
  const formatTabs = ["Article", "Thread", "Newsletter", "Carousel", "Video script", "Caption", "Image post"];
  const analyticsChannels = [
    { label: "LinkedIn",    reach: "32K", pct: 88 },
    { label: "Instagram",   reach: "28K", pct: 74 },
    { label: "X / Twitter", reach: "21K", pct: 62 },
    { label: "Newsletter",  reach: "14K", pct: 48 },
    { label: "Community",   reach: "9K",  pct: 34 },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1C1916]">

      {/* ── Navbar placeholder ───────────────────────────────── */}
      <AuthNavbar />
      

      <main className="mx-auto max-w-[1480px] space-y-8 px-4 py-6 lg:px-6">

        {/* ════════════════════ HERO ════════════════════ */}
        <section className="rounded-[2.5rem] border border-[#DDD5C4] bg-[#FAF6EE] p-1 shadow-md"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,253,248,0.9), 0 4px 24px rgba(60,45,25,0.10)" }}>
          <div className="grid gap-1 xl:grid-cols-[1fr_1fr]">

            {/* LEFT */}
            <div className="rounded-[2.25rem] bg-white p-8 xl:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" />
                AI-powered creator operating system
              </div>

              <h1 className="mt-7 font-bold leading-[0.96] tracking-[-0.04em] text-[#1C1916]">
                <span className="block text-5xl xl:text-6xl">Create every kind</span>
                <span className="block text-5xl xl:text-6xl">of content in</span>
                <span className="mt-1 block text-5xl xl:text-6xl text-emerald-600">one workspace.</span>
              </h1>

              <p className="mt-4 text-3xl font-light leading-tight tracking-tight text-[#8A8078]">
                Format it. Route it. Publish it.{" "}
                <span className="text-[#4A4540]">Track it everywhere.</span>
              </p>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#4A4540]">
                Sarvagya is a creator operating system. Draft articles, threads, carousels, newsletters, scripts, and image-post concepts in one studio — then AI agents adapt each one into platform-ready versions, publish to every destination, and track performance from one system.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-2xl bg-[#1C1916] px-6 py-3.5 text-sm font-bold text-[#FAF6EE] shadow-lg hover:bg-[#2E2820] transition-colors">
                  Start building in Sarvagya <ArrowRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-[#DDD5C4] bg-[#FAF6EE] px-6 py-3.5 text-sm font-semibold text-[#1C1916] hover:bg-[#EDE7D8] transition-colors">
                  Explore the workflow <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: <PenSquare className="h-4 w-4" />, title: "Create in one studio", text: "Draft articles, threads, scripts, captions, carousels, newsletters, and image-post ideas in one creator workspace." },
                  { icon: <Rocket className="h-4 w-4" />, title: "AI publishing engine", text: "AI agents generate platform-native variants for LinkedIn, X, Instagram, YouTube, Medium, newsletters, and more." },
                  { icon: <LineChart className="h-4 w-4" />, title: "Track one system", text: "Monitor output, performance, queue health, reach, and engagement from one analytics layer." },
                  { icon: <Users2 className="h-4 w-4" />, title: "Solo or teams", text: "Creators, teams, and businesses collaborate with roles, approvals, sourcing, review flows, and shared publishing ops." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[#E8E2D4] bg-[#FAF6EE] p-4 hover:border-[#DDD5C4] hover:bg-[#F2EDE0] transition-colors">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">{item.icon}</div>
                    <div className="text-sm font-bold text-[#1C1916]">{item.title}</div>
                    <p className="mt-1.5 text-xs leading-5 text-[#8A8078]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — animated workflow */}
            <div className="rounded-[2.25rem] bg-[#FAF6EE] p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="font-bold text-[#1C1916]">Sarvagya operating workflow</div>
                  <div className="text-xs text-[#8A8078] mt-0.5">Create once → AI adapt → publish → track → community</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-[#4A4540]">7 AI jobs running</span>
                </div>
              </div>

              <div className="space-y-3">
                <WorkflowStep step="01" title="Create inside Creator Studio"
                  desc="Draft the source content once — article, thread, carousel, newsletter, script, image-post concept, or campaign note."
                  items={["Articles & essays", "X threads", "Carousel copy", "Video scripts", "Newsletters", "Image-post concepts"]}
                  icon={<PenSquare className="h-5 w-5" />} active={activeStep === 0} />
                <WorkflowStep step="02" title="Send to Publishing Engine"
                  desc="AI agents create platform-specific versions, prepare queue items, schedule distribution, and keep everything tied to the same source piece."
                  items={platforms} icon={<Rocket className="h-5 w-5" />} active={activeStep === 1} />
                <WorkflowStep step="03" title="Publish, track, and grow"
                  desc="Queue reviews, platform approvals, analytics, and internal community visibility all stay connected to the same content system."
                  items={["Publishing queue live", "Analytics synced", "Community generated", "Team review available"]}
                  icon={<BarChart3 className="h-5 w-5" />} active={activeStep === 2} />
              </div>

              {/* Live system pulse */}
              <div className="mt-4 rounded-2xl border border-[#DDD5C4] bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-bold text-[#1C1916]">System pulse</div>
                  <Bell className="h-4 w-4 text-[#8A8078]" />
                </div>
                <div className="space-y-2">
                  {[
                    { label: "LinkedIn post adaptation ready", status: "Ready" },
                    { label: "Instagram carousel queued", status: "Queued" },
                    { label: "Newsletter digest scheduled", status: "Scheduled" },
                    { label: "Community post version published", status: "Published" },
                  ].map((item, idx) => (
                    <div key={item.label}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 transition-all duration-500 ${
                        pulseIndex === idx ? "border-emerald-300 bg-emerald-50" : "border-[#E8E2D4] bg-[#FAF6EE]"
                      }`}>
                      <span className="text-xs text-[#4A4540]">{item.label}</span>
                      <Chip variant={item.status === "Ready" ? "active" : "default"} size="xs">{item.status}</Chip>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ 01 DASHBOARD ════════════════════ */}
        <section>
          <SectionHeader index="01" title="Dashboard" eyebrow="Operating system overview"
            description="The command layer of Sarvagya. Draft inside Creator Studio, send source content into the Publishing Engine, let AI generate platform-ready variants, track the live queue, monitor analytics, and run solo creator operations or a business content system from one control surface." />

          <div className="overflow-hidden rounded-3xl border border-[#DDD5C4] bg-[#FAF6EE] shadow-md">
            <div className="flex items-center justify-between border-b border-[#DDD5C4] bg-white px-5 py-3.5">
              <div>
                <div className="text-sm font-bold text-[#1C1916]">Dashboard</div>
                <div className="text-xs text-[#8A8078]">Your content system running from one workspace</div>
              </div>
              <div className="flex gap-2">
                <Chip variant="active">7 outputs adapting now</Chip>
                <Chip variant="default">Publishing queue live</Chip>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="flex min-w-[1180px] gap-5 p-5">
                <AppSidebar />

                {/* Center */}
                <div className="flex min-w-0 flex-1 flex-col gap-5">
                  <div className="rounded-3xl border border-[#DDD5C4] bg-white p-6">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="text-sm font-semibold text-[#8A8078]">Good morning, creator 👋🏽</div>
                        <h3 className="mt-2 text-2xl font-bold leading-snug text-[#1C1916]">Your entire content system is running from one workspace.</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4A4540]">
                          Draft inside Creator Studio, send source content into the Publishing Engine, let AI generate platform-ready versions, track the queue, monitor feed engagement, and manage your content business from one system.
                        </p>
                      </div>
                      <div className="shrink-0 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                        7 outputs are being<br />adapted by AI right now
                      </div>
                    </div>
                    <div className="mt-5 grid gap-4 lg:grid-cols-4">
                      <MetricCard label="Content created"     value="148"   delta="+18%" icon={<FileText className="h-4 w-4" />} />
                      <MetricCard label="Published outputs"   value="612"   delta="+31%" icon={<Rocket className="h-4 w-4" />} />
                      <MetricCard label="Connected platforms" value="12"    delta="+4"   icon={<Globe className="h-4 w-4" />} />
                      <MetricCard label="Engagement reached"  value="94.2K" delta="+22%" icon={<TrendingUp className="h-4 w-4" />} />
                    </div>
                  </div>

                  <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-bold text-[#1C1916]">Active workflow</div>
                          <div className="text-xs text-[#8A8078] mt-0.5">From source content to multi-platform publishing</div>
                        </div>
                        <Chip variant="active">Live workflow</Chip>
                      </div>
                      <div className="grid gap-3 md:grid-cols-3">
                        {[
                          { title: "Creator Studio",          body: "The future of creator workflows",         sub: "Long-form source piece" },
                          { title: "Publishing Engine",       body: "6 platform variants generated",          sub: "LinkedIn, X, Instagram, Newsletter…" },
                          { title: "Distribution + tracking", body: "3 published, 2 scheduled, 1 in review",  sub: "Analytics + feed + team comments" },
                        ].map((item) => (
                          <div key={item.title} className="rounded-2xl border border-[#E8E2D4] bg-[#FAF6EE] p-4">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8A8078]">{item.title}</div>
                            <div className="mt-2 font-semibold text-[#1C1916] text-sm">{item.body}</div>
                            <div className="mt-1 text-xs text-[#8A8078]">{item.sub}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-bold text-[#1C1916]">Today's queue</div>
                          <div className="text-xs text-[#8A8078] mt-0.5">What Sarvagya is preparing right now</div>
                        </div>
                        <Send className="h-4 w-4 text-[#8A8078]" />
                      </div>
                      <div className="space-y-2.5">
                        <QueueItem title="LinkedIn post adaptation"  sub='From "The future of creator workflows"' status="Ready" />
                        <QueueItem title="Instagram carousel caption" sub="Waiting for visual asset approval"       status="Queued" />
                        <QueueItem title="Newsletter weekly digest"   sub="Scheduled for 6:00 PM"                  status="Scheduled" />
                        <QueueItem title="Community post version"     sub="Auto-generated internal share copy"      status="Published" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right rail */}
                <div className="flex w-[260px] shrink-0 flex-col gap-5">
                  <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                    <div className="font-bold text-[#1C1916]">Connected platforms</div>
                    <p className="mt-1.5 text-xs leading-5 text-[#8A8078]">Sarvagya can prepare content for every selected destination.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {platforms.map((item) => <Chip key={item} variant="default" size="xs">{item}</Chip>)}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                    <div className="font-bold text-[#1C1916]">Content health</div>
                    <div className="mt-4 space-y-2">
                      {[["Drafts in Studio", "19"], ["Outputs waiting review", "6"], ["Scheduled this week", "14"], ["Community discussions", "32"]].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between rounded-xl border border-[#E8E2D4] bg-[#FAF6EE] px-3 py-2.5">
                          <span className="text-xs text-[#4A4540]">{label}</span>
                          <span className="text-sm font-bold text-[#1C1916]">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#1C1916] bg-[#1C1916] p-5 text-[#FAF6EE]">
                    <div className="text-lg font-bold leading-snug">Built for solo creators and teams</div>
                    <p className="mt-2 text-sm leading-6 text-[#DDD5C4]">
                      Use Sarvagya as a solo creator system, or run it as a business content operating layer with team workflows, approvals, sourcing, review, and shared publishing.
                    </p>
                    <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#FAF6EE] px-4 py-2.5 text-sm font-bold text-[#1C1916] hover:bg-white transition-colors">
                      Open team workspace <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ 02 CREATOR STUDIO ════════════════════ */}
        <section>
          <SectionHeader index="02" title="Creator Studio" eyebrow="Unified creation workspace"
            description="One workspace where every type of content begins. Draft long-form articles, threads, newsletters, carousel copy, video scripts, captions, and image-post concepts. Notes, references, CTAs, and visual direction all stay attached to the same source piece before it moves into the Publishing Engine." />

          <div className="overflow-hidden rounded-3xl border border-[#DDD5C4] bg-[#FAF6EE] shadow-md">
            <div className="flex items-center justify-between border-b border-[#DDD5C4] bg-white px-5 py-3.5">
              <div>
                <div className="text-sm font-bold text-[#1C1916]">Creator Studio</div>
                <div className="text-xs text-[#8A8078]">Draft, structure, repurpose, and prepare source content</div>
              </div>
              <div className="flex gap-2">
                <Chip variant="default">Workspace</Chip>
                <Chip variant="active">AI active</Chip>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="flex min-w-[1180px] gap-5 p-5">
                {/* Folders */}
                <div className="w-[210px] shrink-0 rounded-3xl border border-[#DDD5C4] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[#1C1916] text-sm">Workspace folders</div>
                    <button className="rounded-lg border border-[#DDD5C4] bg-[#FAF6EE] px-2.5 py-1 text-[11px] font-semibold text-[#4A4540] hover:bg-[#EDE7D8]">+ New</button>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[["Long-form articles","08"],["X threads","13"],["Newsletter drafts","05"],["Instagram content","09"],["Video script ideas","06"],["Launch notes","04"],["Image-post concepts","11"]].map(([label, count], idx) => (
                      <div key={label} className={`flex items-center justify-between rounded-xl border px-3 py-2.5 cursor-pointer transition-colors ${
                        idx === 0 ? "border-emerald-300 bg-emerald-50" : "border-[#E8E2D4] bg-[#FAF6EE] hover:border-[#DDD5C4]"
                      }`}>
                        <span className="text-xs font-medium text-[#1C1916]">{label}</span>
                        <span className="text-xs font-bold text-[#8A8078]">{count}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl border border-[#E8E2D4] bg-[#FAF6EE] p-4">
                    <div className="text-xs font-bold text-[#1C1916] mb-3">Recent drafts</div>
                    <div className="space-y-2 text-xs text-[#4A4540]">
                      {["The future of creator workflows", "5 lessons from writing online", "Launch notes for Sarvagya V1"].map((item) => (
                        <div key={item} className="rounded-xl border border-[#DDD5C4] bg-white px-3 py-2 hover:border-[#C8C0B0] cursor-pointer transition-colors">{item}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main editor */}
                <div className="min-w-0 flex-1 rounded-3xl border border-[#DDD5C4] bg-white">
                  <div className="flex items-center justify-between border-b border-[#E8E2D4] px-5 py-4">
                    <div>
                      <div className="font-bold text-[#1C1916]">Multi-format source workspace</div>
                      <div className="text-xs text-[#8A8078] mt-0.5">One source draft for articles, threads, newsletters, carousels, captions, image posts, and video scripts</div>
                    </div>
                    <div className="flex gap-2">
                      <Chip variant="active">Autosaved</Chip>
                      <Chip variant="default">Live AI helper</Chip>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      {formatTabs.map((tab, idx) => (
                        <button key={tab} className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-colors ${
                          idx === 0 ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-[#E8E2D4] bg-[#FAF6EE] text-[#4A4540] hover:border-[#DDD5C4] hover:text-[#1C1916]"
                        }`}>{tab}</button>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-3 lg:grid-cols-3">
                      {[
                        { title: "Article draft",         text: "Long-form source piece with structure, argument flow, examples, and CTA blocks." },
                        { title: "Thread conversion",     text: "Hook-first thread version with tighter transitions, punchier lines, and post sequencing." },
                        { title: "Video / image layer",   text: "Video beats, image-post hooks, carousel slides, and visual direction tied to the same source piece." },
                      ].map((item) => (
                        <div key={item.title} className="rounded-2xl border border-[#E8E2D4] bg-[#FAF6EE] p-4">
                          <div className="font-semibold text-[#1C1916] text-sm">{item.title}</div>
                          <div className="mt-2 text-xs leading-5 text-[#4A4540]">{item.text}</div>
                        </div>
                      ))}
                    </div>

                    {/* Active editor surface */}
                    <div className="mt-4 rounded-2xl border border-[#DDD5C4] bg-[#FAF6EE] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-semibold text-[#8A8078] uppercase tracking-wider">Active editor</div>
                          <h3 className="mt-1.5 text-2xl font-bold leading-tight text-[#1C1916]">The future of creator workflows</h3>
                        </div>
                        <div className="flex flex-wrap justify-end gap-1.5 max-w-[300px]">
                          {["LinkedIn post","X thread","Newsletter","Carousel","Short-video script"].map((item) => (
                            <Chip key={item} variant="default" size="xs">{item}</Chip>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-[#E8E2D4] bg-white p-5">
                        <div className="flex items-center gap-2 border-b border-[#E8E2D4] pb-3 mb-4">
                          <span className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white">Draft</span>
                          <span className="rounded-full border border-[#E8E2D4] bg-[#FAF6EE] px-3 py-1 text-[11px] text-[#8A8078]">Autosaved</span>
                          <span className="rounded-full border border-[#E8E2D4] bg-[#FAF6EE] px-3 py-1 text-[11px] text-[#8A8078]">1,284 words</span>
                          <span className="rounded-full border border-[#E8E2D4] bg-[#FAF6EE] px-3 py-1 text-[11px] text-[#8A8078]">6 outputs available</span>
                        </div>
                        <div className="grid gap-5 lg:grid-cols-[1fr_220px]">
                          <div className="space-y-4">
                            <div className="rounded-xl border border-[#E8E2D4] bg-[#FAF6EE] p-4 text-sm leading-7 text-[#4A4540]">
                              <span className="font-bold text-[#1C1916]">Introduction —</span>{" "}
                              The way creators work is changing faster than most platforms can keep up with. The old model of writing one piece for one platform and starting over every time is being replaced by systems that treat content as a source, not a destination.
                            </div>
                            <div className="rounded-xl border border-[#E8E2D4] bg-[#FAF6EE] p-4 text-sm leading-7 text-[#4A4540]">
                              <span className="font-bold text-[#1C1916]">Section 1 —</span>{" "}
                              Sarvagya starts with the idea that every piece of content you create should be a source file, not a final output. From that one source, an AI layer can prepare six different platform-native versions without you rewriting a single word.
                            </div>
                            <div className="rounded-xl border border-dashed border-[#DDD5C4] bg-[#FAF6EE] p-4 text-sm text-[#8A8078] text-center">
                              Continue writing or use AI helper to expand →
                            </div>
                          </div>
                          <div className="rounded-2xl border border-[#E8E2D4] bg-[#FAF6EE] p-4">
                            <div className="text-xs font-bold text-[#1C1916] uppercase tracking-wider">Notes & references</div>
                            <div className="mt-3 space-y-2">
                              {["Research notes attached","2 visual references linked","CTA block saved","Thumbnail idea stored"].map((item) => (
                                <div key={item} className="rounded-xl border border-[#DDD5C4] bg-white px-3 py-2.5 text-xs text-[#4A4540]">{item}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2.5">
                          <button className="rounded-xl bg-[#1C1916] px-5 py-2.5 text-sm font-bold text-[#FAF6EE] shadow-md hover:bg-[#2E2820] transition-colors">Send to Publishing Engine</button>
                          <button className="rounded-xl border border-[#DDD5C4] bg-[#FAF6EE] px-4 py-2.5 text-sm font-medium text-[#4A4540] hover:bg-[#EDE7D8] transition-colors">Save draft</button>
                          <button className="rounded-xl border border-[#DDD5C4] bg-[#FAF6EE] px-4 py-2.5 text-sm font-medium text-[#4A4540] hover:bg-[#EDE7D8] transition-colors">Open notes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI rail */}
                <div className="w-[240px] shrink-0 rounded-3xl border border-[#1C1916] bg-[#1C1916] p-5 text-[#FAF6EE]">
                  <div className="font-bold text-[#FAF6EE]">AI helper workspace</div>
                  <div className="text-xs text-[#DDD5C4] mt-1">Assist, repurpose, and prepare</div>
                  <div className="mt-4 space-y-2">
                    {["Turn into LinkedIn post","Turn into X thread","Turn into newsletter summary","Create carousel structure","Extract short-video hooks"].map((item) => (
                      <button key={item} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-left text-xs font-medium text-[#FAF6EE] transition hover:bg-white/10">
                        <span>{item}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-[#8A8078]" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#8A8078]">Content formats detected</div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["Long-form article","Educational thread","Newsletter angle","Carousel post","Short-video hook"].map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-[#DDD5C4]">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#8A8078] mb-3">Studio health</div>
                    <div className="space-y-2 text-xs text-[#DDD5C4]">
                      {[["Draft sync","Live"],["Assets linked","12"],["AI helpers active","5"],["Publish routes","6"]].map(([k,v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-[#8A8078]">{k}</span>
                          <span className="font-semibold text-[#FAF6EE]">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ 03 PUBLISHING ENGINE ════════════════════ */}
        <section>
          <SectionHeader index="03" title="Publishing Engine" eyebrow="AI adaptation + distribution layer"
            description="The Publishing Engine is where Sarvagya stops being just a workspace and becomes an operating system. Source content enters this layer, AI agents generate platform-specific variants, selected destinations are attached, queue states are managed, approvals happen, schedules are applied, and everything is pushed live from one control surface." />

          <div className="overflow-hidden rounded-3xl border border-[#DDD5C4] bg-[#FAF6EE] shadow-md">
            <div className="flex items-center justify-between border-b border-[#DDD5C4] bg-white px-5 py-3.5">
              <div>
                <div className="text-sm font-bold text-[#1C1916]">Publishing Engine</div>
                <div className="text-xs text-[#8A8078]">Review, adapt, queue, approve, schedule, and publish</div>
              </div>
              <div className="flex gap-2">
                <Chip variant="active">7 AI jobs active</Chip>
                <Chip variant="default">Publish queue live</Chip>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[1080px] grid gap-5 p-5 xl:grid-cols-[1.05fr_0.95fr_280px]">
                {/* Source + variants */}
                <div className="space-y-4">
                  <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-bold text-[#1C1916]">Source content</div>
                        <div className="text-xs text-[#8A8078] mt-0.5">One source piece feeding every platform output</div>
                      </div>
                      <Chip variant="active">6 variants generated</Chip>
                    </div>
                    <div className="rounded-2xl border border-[#E8E2D4] bg-[#FAF6EE] p-5">
                      <div className="text-xs font-semibold text-[#8A8078] uppercase tracking-wider">Source piece</div>
                      <div className="mt-2 text-xl font-bold text-[#1C1916]">The future of creator workflows</div>
                      <p className="mt-2 text-sm leading-6 text-[#4A4540]">Long-form article created in Creator Studio. AI agents are using this source content to produce LinkedIn, X, Instagram, newsletter, and community variants without breaking the connection to the original piece.</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                    <div className="font-bold text-[#1C1916] mb-4">Generated outputs</div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {[
                        ["LinkedIn post",             "Platform-specific variant using long-form structure",    "Ready"],
                        ["X thread",                  "8-post thread with hooks + condensed points",            "Ready"],
                        ["Instagram carousel caption","Caption + slide-by-slide teaching flow",                 "Queued"],
                        ["Newsletter digest",         "Shortened weekly newsletter version",                    "Scheduled"],
                        ["Community post",            "Internal community share copy",                          "Published"],
                        ["YouTube script angle",      "Condensed video teaching structure",                     "Draft"],
                      ].map(([title, desc, status]) => (
                        <div key={title} className="rounded-2xl border border-[#E8E2D4] bg-[#FAF6EE] p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="font-semibold text-sm text-[#1C1916]">{title}</div>
                              <div className="mt-1 text-xs leading-5 text-[#8A8078]">{desc}</div>
                            </div>
                            <Chip variant={status === "Ready" ? "active" : "default"} size="xs">{status}</Chip>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Queue / review */}
                <div className="space-y-4">
                  <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-bold text-[#1C1916]">Queue & review</div>
                        <div className="text-xs text-[#8A8078] mt-0.5">Approve, schedule, retry, or send live</div>
                      </div>
                      <Settings2 className="h-4 w-4 text-[#8A8078]" />
                    </div>
                    <div className="space-y-3">
                      {[
                        ["LinkedIn post",          "Ready to publish",                    "Ready"],
                        ["Instagram carousel",     "Waiting for visual asset approval",   "Queued"],
                        ["Newsletter weekly digest","Scheduled for 6:00 PM",              "Scheduled"],
                        ["Community post version", "Already published internally",        "Published"],
                      ].map(([title, sub, status]) => (
                        <div key={title} className="rounded-2xl border border-[#E8E2D4] bg-[#FAF6EE] p-4">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <div className="font-semibold text-sm text-[#1C1916]">{title}</div>
                              <div className="mt-0.5 text-xs text-[#8A8078]">{sub}</div>
                            </div>
                            <Chip variant={status === "Ready" ? "active" : "default"} size="xs">{status}</Chip>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {["Review","Schedule","Retry AI"].map((btn) => (
                              <button key={btn} className="rounded-xl border border-[#DDD5C4] bg-white px-3 py-1.5 text-xs font-semibold text-[#4A4540] hover:bg-[#EDE7D8] transition-colors">{btn}</button>
                            ))}
                            <button className="rounded-xl bg-[#1C1916] px-3 py-1.5 text-xs font-bold text-[#FAF6EE] hover:bg-[#2E2820] transition-colors">Publish</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                    <div className="font-bold text-[#1C1916] mb-4">AI adaptation flow</div>
                    <div className="space-y-2">
                      {["Source content parsed","Platform voice rules applied","Format constraints detected","CTA blocks generated","Hashtag / metadata prep complete","Queue item synced to analytics layer"].map((item, idx) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl border border-[#E8E2D4] bg-[#FAF6EE] px-4 py-2.5">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white">{idx + 1}</div>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          <div className="text-xs text-[#4A4540]">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right rail */}
                <div className="space-y-4">
                  <div className="rounded-3xl border border-[#1C1916] bg-[#1C1916] p-5 text-[#FAF6EE]">
                    <div className="font-bold text-lg">Connected platforms</div>
                    <p className="mt-2 text-sm leading-6 text-[#DDD5C4]">Add or remove destinations and let the engine generate the right output for each one.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {platforms.map((item) => (
                        <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-[#DDD5C4]">{item}</span>
                      ))}
                    </div>
                    <div className="mt-4 space-y-2 text-xs">
                      {["3 outputs ready for approval","2 scheduled for later today","1 published to community"].map((item) => (
                        <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[#DDD5C4]">{item}</div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                    <div className="font-bold text-[#1C1916] mb-4">Platform constraints</div>
                    <div className="space-y-2">
                      {["LinkedIn long-form post length","X thread sequencing","Instagram caption + carousel flow","Newsletter subject + summary block","Community share format"].map((item) => (
                        <div key={item} className="rounded-xl border border-[#E8E2D4] bg-[#FAF6EE] px-3 py-2.5 text-xs text-[#4A4540]">{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ 04 ANALYTICS ════════════════════ */}
        <section>
          <SectionHeader index="04" title="Analytics" eyebrow="Performance + workflow intelligence"
            description="Analytics in Sarvagya are not vanity metrics. The analytics layer connects the source content, generated platform outputs, publishing queue, feed engagement, and community visibility. It shows what was created, what got published, which channels performed, where content is winning or stalling, and how the operating system is behaving as a whole." />

          <div className="overflow-hidden rounded-3xl border border-[#DDD5C4] bg-[#FAF6EE] shadow-md">
            <div className="flex items-center justify-between border-b border-[#DDD5C4] bg-white px-5 py-3.5">
              <div>
                <div className="text-sm font-bold text-[#1C1916]">Analytics</div>
                <div className="text-xs text-[#8A8078]">Content performance, publishing outcomes, and workflow signals</div>
              </div>
              <div className="flex gap-2">
                <Chip variant="active">Last 30 days</Chip>
                <Chip variant="default">All channels</Chip>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[1080px] grid gap-5 p-5 xl:grid-cols-[1fr_300px]">
                <div className="space-y-5">
                  <div className="grid gap-4 lg:grid-cols-4">
                    <MetricCard label="Source pieces created" value="48"   delta="+12%" icon={<FileText className="h-4 w-4" />} />
                    <MetricCard label="Outputs published"      value="186"  delta="+24%" icon={<Rocket className="h-4 w-4" />} />
                    <MetricCard label="Total reach"            value="241K" delta="+19%" icon={<Globe className="h-4 w-4" />} />
                    <MetricCard label="Engagement rate"        value="8.4%" delta="+1.1%" icon={<TrendingUp className="h-4 w-4" />} />
                  </div>

                  <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                      <div className="font-bold text-[#1C1916] mb-5">Channel breakdown</div>
                      <div className="space-y-4">
                        {analyticsChannels.map((ch) => (
                          <div key={ch.label}>
                            <div className="mb-2 flex justify-between text-xs">
                              <span className="font-semibold text-[#1C1916]">{ch.label}</span>
                              <span className="text-[#8A8078]">{ch.reach}</span>
                            </div>
                            <div className="h-2.5 rounded-full bg-[#E8E2D4]">
                              <div className="h-2.5 rounded-full bg-emerald-500 transition-all duration-700" style={{ width: `${ch.pct}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                      <div className="font-bold text-[#1C1916] mb-4">Workflow signals</div>
                      <div className="space-y-2.5">
                        {["Creator Studio → Publishing Engine conversion rate improved","Carousel outputs outperforming long-form summaries","Newsletter opens holding above average","Community reposts increasing internal reach"].map((item) => (
                          <div key={item} className="flex items-start gap-2.5 rounded-xl border border-[#E8E2D4] bg-[#FAF6EE] px-4 py-3">
                            <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                            <span className="text-xs leading-5 text-[#4A4540]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                    <div className="font-bold text-[#1C1916] mb-4">Top performing source pieces</div>
                    <div className="grid gap-4 md:grid-cols-3">
                      {["The future of creator workflows","5 lessons from writing online","Why creators need systems, not hacks"].map((item, idx) => (
                        <div key={item} className="rounded-2xl border border-[#E8E2D4] bg-[#FAF6EE] p-4">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">#{idx + 1} top piece</div>
                          <div className="font-semibold text-[#1C1916] text-sm">{item}</div>
                          <div className="mt-2 text-xs leading-5 text-[#8A8078]">One source piece generated multiple published outputs across channels and drove meaningful reach.</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-[#1C1916] bg-[#1C1916] p-5 text-[#FAF6EE]">
                    <div className="text-lg font-bold">Operating system insight</div>
                    <p className="mt-2 text-sm leading-6 text-[#DDD5C4]">Analytics are connected to the workflow itself, not isolated from it. See which source pieces became winners, which channels are stalling, and where the AI publishing engine is creating leverage.</p>
                  </div>

                  <div className="rounded-3xl border border-[#DDD5C4] bg-white p-5">
                    <div className="font-bold text-[#1C1916] mb-4">Recent highlights</div>
                    <div className="space-y-2.5">
                      {["LinkedIn carousel drove 2.4x saves","Newsletter digest hit 42% open rate","Community repost created 3 follow-up discussions","X thread outperformed standard post by 18%"].map((item) => (
                        <div key={item} className="flex items-start gap-2.5 rounded-xl border border-[#E8E2D4] bg-[#FAF6EE] px-4 py-3">
                          <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          <span className="text-xs leading-5 text-[#4A4540]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ 05 COMMUNITY & TEAMS ════════════════════ */}
        <section>
          <SectionHeader index="05" title="Community & Teams" eyebrow="Creator network + business workflows"
            description="Sarvagya Community is the internal social layer. Content published through Sarvagya surfaces here, creators discover each other, and discussions happen around published work. For teams and businesses, the same workflow extends into shared workspaces, sourcing, briefs, approval layers, content calendars, roles, and review flows." />

          <div className="grid gap-5 xl:grid-cols-2">
            {/* Community */}
            <div className="overflow-hidden rounded-3xl border border-[#DDD5C4] bg-[#FAF6EE] shadow-md">
              <div className="flex items-center justify-between border-b border-[#DDD5C4] bg-white px-5 py-3.5">
                <div>
                  <div className="text-sm font-bold text-[#1C1916]">Community</div>
                  <div className="text-xs text-[#8A8078]">Creator network, discovery, and discussion</div>
                </div>
                <Chip variant="active">Community live</Chip>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {["AI creators","Writers building in public","LinkedIn growth","Newsletter operators","Short-form video creators"].map((item) => (
                    <button key={item} className="rounded-xl border border-[#DDD5C4] bg-white px-3.5 py-2 text-xs font-medium text-[#4A4540] hover:border-[#C8C0B0] hover:text-[#1C1916] transition-colors">{item}</button>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Ananya Rao", handle: "@ananyacreates", title: "How I turned one article into a week of content", meta: "Discussion under a community version of a published post", stats: ["482","41","19"] },
                    { name: "Kunal Shah", handle: "@buildwithkunal", title: "My newsletter workflow now lives entirely inside one system", meta: "Creator diary post from the community layer", stats: ["368","28","14"] },
                  ].map((post) => (
                    <div key={post.title} className="rounded-2xl border border-[#E8E2D4] bg-white p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#1C1916] text-sm font-bold text-[#FAF6EE]">
                          {post.name.split(" ").map((x) => x[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-[#1C1916]">{post.name}</div>
                          <div className="text-xs text-[#8A8078]">{post.handle}</div>
                        </div>
                        <button className="ml-auto shrink-0 rounded-xl border border-[#DDD5C4] bg-[#FAF6EE] px-3 py-1.5 text-xs font-semibold text-[#1C1916] hover:bg-[#EDE7D8] transition-colors">Follow</button>
                      </div>
                      <h4 className="mt-3 font-semibold text-[#1C1916] text-sm">{post.title}</h4>
                      <p className="mt-1 text-xs leading-5 text-[#4A4540]">{post.meta}</p>
                      <div className="mt-3 flex items-center gap-5 text-xs text-[#8A8078]">
                        <span className="flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5" />{post.stats[0]}</span>
                        <span className="flex items-center gap-1.5"><Share2 className="h-3.5 w-3.5" />{post.stats[1]}</span>
                        <span className="flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5" />{post.stats[2]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Teams */}
            <div className="overflow-hidden rounded-3xl border border-[#DDD5C4] bg-[#FAF6EE] shadow-md">
              <div className="flex items-center justify-between border-b border-[#DDD5C4] bg-white px-5 py-3.5">
                <div>
                  <div className="text-sm font-bold text-[#1C1916]">Teams & business workspace</div>
                  <div className="text-xs text-[#8A8078]">Roles, approvals, sourcing, and shared publishing</div>
                </div>
                <Chip variant="active">Team mode</Chip>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    { title: "Assign & review", text: "Writers, editors, and operators can work inside one shared workflow." },
                    { title: "Direct sourcing",  text: "Collect briefs, campaign goals, product notes, and brand inputs in one system." },
                    { title: "Publish + track",  text: "Push from one queue and track performance, approvals, and workload centrally." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-[#E8E2D4] bg-white p-4">
                      <div className="font-semibold text-sm text-[#1C1916]">{item.title}</div>
                      <p className="mt-1.5 text-xs leading-5 text-[#4A4540]">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-[#E8E2D4] bg-white p-5">
                  <div className="font-bold text-[#1C1916] mb-4">Team workspace</div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { title: "Content brief intake", lines: ["Product launch brief attached","Audience notes added","Campaign CTA approved"] },
                      { title: "Review chain",         lines: ["Writer → Editor → Brand lead","Visual approval pending","Publishing ops notified"] },
                      { title: "Shared calendar",      lines: ["Launch week campaign scheduled","Newsletter + LinkedIn sync","Community recap auto-added"] },
                    ].map((col) => (
                      <div key={col.title} className="rounded-xl border border-[#E8E2D4] bg-[#FAF6EE] p-4">
                        <div className="text-xs font-bold text-[#1C1916] mb-3">{col.title}</div>
                        <div className="space-y-2">
                          {col.lines.map((line) => (
                            <div key={line} className="rounded-xl border border-[#DDD5C4] bg-white px-3 py-2 text-xs text-[#4A4540]">{line}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E8E2D4] bg-white p-4">
                  <div className="text-xs font-bold text-[#1C1916] mb-3">Team controls</div>
                  <div className="flex flex-wrap gap-2">
                    {["Role-based publishing permissions","Approval-required queue states","Shared asset + reference library","Business analytics workspace","Campaign-level reporting"].map((item) => (
                      <span key={item} className="rounded-full border border-[#DDD5C4] bg-[#FAF6EE] px-3 py-1.5 text-xs text-[#4A4540]">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ FINAL CTA ════════════════════ */}
        <section className="rounded-[2.5rem] border border-[#1C1916] bg-[#1C1916] p-8 shadow-2xl md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#DDD5C4]">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Build your creator operating system
              </div>
              <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#FAF6EE] sm:text-5xl">
                Create once.{" "}
                <span className="text-emerald-400">Let Sarvagya run the content system around it.</span>
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#DDD5C4]">
                Draft every kind of content in one studio, send it into an AI-powered Publishing Engine, distribute it everywhere, track performance from one analytics layer, and grow through both external platforms and Sarvagya's own community system.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-2xl bg-[#FAF6EE] px-6 py-3.5 text-sm font-bold text-[#1C1916] shadow-xl hover:bg-white transition-colors">
                  Get started <ArrowRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#FAF6EE] hover:bg-white/15 transition-colors">
                  Explore product architecture <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: <BookOpen className="h-5 w-5" />, title: "Creator Studio",    text: "Articles, threads, captions, carousels, scripts, newsletters, video ideas, and image-post concepts in one workspace." },
                { icon: <Rocket className="h-5 w-5" />,   title: "Publishing Engine", text: "AI agents adapt, route, schedule, and publish platform-ready variants from one source piece." },
                { icon: <BarChart3 className="h-5 w-5" />,title: "Analytics + Feed",  text: "Track what got published, how it performed, and how the ecosystem is reacting." },
                { icon: <Users2 className="h-5 w-5" />,   title: "Community + Teams", text: "Grow inside Sarvagya's creator network or run a full team content operation with approvals and roles." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#FAF6EE]">{item.icon}</div>
                  <div className="mt-3 font-bold text-[#FAF6EE]">{item.title}</div>
                  <p className="mt-1.5 text-sm leading-6 text-[#DDD5C4]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
