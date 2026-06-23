import type { ReactNode } from "react";
import AuthNavbar from "./AuthNavbar";
import Footer from "./Footer";

type AuthShellProps = {
  leftContent: ReactNode;
  rightContent: ReactNode;
};

export default function AuthShell({
  leftContent,
  rightContent,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[#eef2ef] text-[#173127]">
      <div className="mx-auto w-full max-w-[1600px] px-3 py-3 sm:px-4 md:px-5 lg:px-6">
        {/* Shared navbar */}
        <AuthNavbar />

        {/* Main auth section */}
        <main className="mt-4 rounded-[32px] border border-[#dde5e0] bg-[linear-gradient(180deg,#f8faf9_0%,#f1f5f2_100%)] p-3 shadow-[0_16px_40px_rgba(22,40,31,0.08)] sm:p-4 md:p-5 lg:p-6">
          <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
            {/* Left panel */}
            <section className="relative overflow-hidden rounded-[32px] border border-[#e2e8e4] bg-[radial-gradient(circle_at_top_left,rgba(207,239,226,0.6),transparent_38%),linear-gradient(180deg,#fcfdfc_0%,#f6faf7_100%)] p-5 sm:p-6 md:p-8 lg:p-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
              {leftContent}
            </section>

            {/* Right panel */}
            <section className="rounded-[32px] border border-[#e3e9e5] bg-[#fffefb] p-5 shadow-[0_18px_36px_rgba(22,40,31,0.08)] sm:p-6 md:p-8 lg:p-9">
              <div className="mx-auto w-full max-w-[640px]">
                {rightContent}
              </div>
            </section>
          </div>
        </main>

        {/* Shared footer */}
        <Footer />
      </div>
    </div>
  );
}