import {
  ArrowRight,
  BookOpen,
  Layers3,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const navItems = [
  { label: "Product",   icon: Layers3,   to: "/" },
  { label: "Solutions", icon: Sparkles,  to: "/" },
  { label: "Resources", icon: BookOpen,  to: "/" },
  { label: "Pricing",   icon: Tag,       to: "/" },
  { label: "Community", icon: Users,     to: "/" },
];

/**
 * Stone-slab texture via inline SVG filter + layered box-shadows.
 * Palette:
 *   slab-face   #F5F0E8  warm ivory face
 *   slab-edge   #E8E0D0  slightly darker — "cut edge" depth
 *   slab-vein   #DDD5C4  mid-tone veining / borders
 *   slab-deep   #C8BCA8  deep grain / pressed shadow
 *   ink         #1C1916  near-black ink for text
 *   ink-mid     #4A4540  secondary text
 *   ink-faint   #8A8078  tertiary / icons
 *   onyx        #18120E  CTA deep — almost black-brown
 */
export default function AuthNavbar() {
  const location = useLocation();
  const isLogin    = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <>
      {/* SVG filter that simulates stone grain — referenced by CSS below */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="stone-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72 0.55"
              numOctaves="4"
              seed="8"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="grey"
            />
            <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <header
        className="relative rounded-[26px] px-3 py-3 sm:px-4 md:px-5"
        style={{
          /* Layered stone-slab look: warm ivory base, hairline highlight top, deep shadow bottom */
          background:
            "linear-gradient(170deg, #FAF6EE 0%, #F2EDE0 38%, #EDE6D5 68%, #E8E0CC 100%)",
          boxShadow: `
            inset 0 1px 0 rgba(255,252,245,0.90),
            inset 0 -1px 0 rgba(100,88,70,0.18),
            inset 1px 0 0 rgba(255,252,245,0.60),
            inset -1px 0 0 rgba(100,88,70,0.10),
            0 2px 0 rgba(160,140,110,0.22),
            0 6px 18px rgba(60,45,25,0.13),
            0 18px 48px rgba(40,30,15,0.09)
          `,
          border: "1px solid #D8CEB8",
        }}
      >
        {/* Subtle noise overlay — pure CSS, no image required */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[26px] opacity-[0.045]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
            mixBlendMode: "multiply",
          }}
        />

        {/* Hairline vein across the middle — like a natural stone inclusion */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[8%] right-[8%] opacity-[0.06]"
          style={{
            top: "50%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, #7A6A50 20%, #9A8A6A 50%, #7A6A50 80%, transparent 100%)",
          }}
        />

        <div className="relative flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

          {/* ── Brand ─────────────────────────────────────────────── */}
          <Link
            to="/"
            className="group flex w-full items-center gap-3 rounded-[20px] px-4 py-2.5 transition-all hover:brightness-[0.97] xl:w-auto"
            style={{
              background:
                "linear-gradient(145deg, #FDFAF4 0%, #F5EFE2 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,253,248,0.95), inset 0 -1px 0 rgba(120,105,80,0.14), 0 1px 4px rgba(80,60,30,0.10)",
              border: "1px solid #DDD3BE",
            }}
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(145deg, #EDE7D8, #E0D9C8)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,252,244,0.8), 0 2px 6px rgba(80,60,30,0.14)",
                border: "1px solid #CEC4B0",
              }}
            >
              <img
                src={logo}
                alt="Sarvagya"
                className="h-11 w-11 scale-125 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            <div>
              <div
                className="font-serif text-[1.7rem] font-semibold leading-none tracking-[-0.03em]"
                style={{ color: "#1C1916" }}
              >
                Sarvagya
              </div>
              <div
                className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.28em]"
                style={{ color: "#7A6E62" }}
              >
                Creator OS
              </div>
            </div>
          </Link>

          {/* ── Nav pills ─────────────────────────────────────────── */}
          <nav
            className="grid w-full grid-cols-2 gap-1.5 rounded-[22px] p-1.5 sm:grid-cols-3 lg:grid-cols-5 xl:max-w-[760px]"
            style={{
              background:
                "linear-gradient(160deg, #EDE7D8 0%, #E5DDD0 100%)",
              boxShadow:
                "inset 0 1px 3px rgba(80,60,30,0.12), inset 0 -1px 0 rgba(255,252,244,0.50)",
              border: "1px solid #CEC5B0",
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="group flex items-center justify-center gap-2 rounded-[18px] px-3 py-2.5 text-sm font-semibold transition-all hover:-translate-y-px"
                  style={{
                    background:
                      "linear-gradient(150deg, #FAF6EE 0%, #F2EBE0 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,253,248,0.90), 0 1px 3px rgba(80,60,30,0.10)",
                    border: "1px solid #D8CEBA",
                    color: "#2E2820",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "inset 0 1px 0 rgba(255,253,248,0.90), 0 4px 12px rgba(80,60,30,0.16)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "inset 0 1px 0 rgba(255,253,248,0.90), 0 1px 3px rgba(80,60,30,0.10)";
                  }}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(145deg, #E8E2D4, #DDD7C8)",
                      boxShadow: "inset 0 1px 0 rgba(255,252,244,0.7)",
                      color: "#6A5F52",
                    }}
                  >
                    <Icon size={14} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── Right actions ─────────────────────────────────────── */}
          <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">
            {/* Login — pressed-stone look */}
            <Link
              to="/login"
              className="inline-flex min-h-[50px] items-center justify-center rounded-[20px] px-7 text-sm font-semibold transition-all hover:-translate-y-px"
              style={
                isLogin
                  ? {
                      background:
                        "linear-gradient(160deg, #2A2218 0%, #1C1916 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,240,210,0.10), 0 4px 14px rgba(20,14,8,0.35)",
                      border: "1px solid #0E0C0A",
                      color: "#F5F0E8",
                    }
                  : {
                      background:
                        "linear-gradient(150deg, #FAF6EE 0%, #EDE6D8 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,253,248,0.90), inset 0 -1px 0 rgba(100,80,50,0.14), 0 2px 8px rgba(80,60,30,0.10)",
                      border: "1px solid #D0C6B2",
                      color: "#2E2820",
                    }
              }
            >
              Login
            </Link>

            {/* Get Started — deep onyx slab */}
            <Link
              to="/register"
              className="inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-[20px] px-6 text-sm font-bold transition-all hover:-translate-y-px"
              style={{
                background:
                  "linear-gradient(155deg, #2A2218 0%, #1A1510 45%, #110E09 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,240,200,0.08), inset 0 -1px 0 rgba(0,0,0,0.40), 0 4px 0 rgba(0,0,0,0.30), 0 8px 24px rgba(10,8,4,0.36)",
                border: "1px solid #0A0804",
                color: "#F5F0E8",
              }}
            >
              <span>Get Started</span>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(145deg, #F5F0E8, #EAE3D5)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px rgba(0,0,0,0.20)",
                  color: "#1C1916",
                }}
              >
                <ArrowRight size={15} />
              </span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
