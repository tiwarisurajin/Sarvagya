import { BookOpen, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

type FooterColumnProps = {
  title: string;
  links: { label: string; to: string }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/92">
        {title}
      </h3>

      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-white/72 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-4 overflow-hidden rounded-[28px] border border-[#1f4d40]/10 bg-[linear-gradient(135deg,#18322b_0%,#20483f_45%,#2f7a71_100%)] text-white shadow-[0_14px_34px_rgba(20,35,29,0.14)]">
      <div className="px-5 py-6 sm:px-6 sm:py-7 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1.95fr]">
          {/* Left block */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur">
                <img
                  src={logo}
                  alt="Sarvagya"
                  className="h-14 w-14 object-contain brightness-0 invert scale-150"
                />
              </div>

              <div>
                <div className="font-serif text-[1.35rem] font-semibold leading-none tracking-[-0.03em]">
                  Sarvagya
                </div>
                <div className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/68">
                  AI Creator OS
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-[320px] text-sm leading-6 text-white/74">
              Create once, let AI adapt for every platform, and publish from one creator workspace.
            </p>

            <div className="mt-4 flex gap-2.5">
              {[BookOpen, Sparkles, Users].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur transition hover:bg-white/16"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Right columns */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            <FooterColumn
              title="Product"
              links={[
                { label: "Features", to: "/" },
                { label: "Publishing", to: "/" },
                { label: "Analytics", to: "/" },
              ]}
            />

            <FooterColumn
              title="Solutions"
              links={[
                { label: "Creators", to: "/" },
                { label: "Teams", to: "/" },
                { label: "Use Cases", to: "/" },
              ]}
            />

            <FooterColumn
              title="Resources"
              links={[
                { label: "Docs", to: "/" },
                { label: "Guides", to: "/" },
                { label: "API", to: "/" },
              ]}
            />

            <FooterColumn
              title="Community"
              links={[
                { label: "Blog", to: "/" },
                { label: "Discussions", to: "/" },
                { label: "Events", to: "/" },
              ]}
            />

            <FooterColumn
              title="Company"
              links={[
                { label: "About", to: "/" },
                { label: "Privacy", to: "/" },
                { label: "Contact", to: "/" },
              ]}
            />
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-6 flex flex-col gap-2 border-t border-white/12 pt-4 text-xs text-white/68 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>© 2026 Sarvagya. All rights reserved.</p>
          <p>Write once. Publish everywhere.</p>
        </div>
      </div>
    </footer>
  );
}