import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BarChart3,
  Clock3,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";

import AuthShell from "../components/layout/AuthShell";
import logo from "../assets/logo.png";
import { api as authAPI } from "../lib/axios";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const workflowItems = [
    {
      title: "Resume scheduled publishing",
      subtitle:
        "Continue drafts, queued posts, and multi-platform publishing workflows from where you left off.",
      icon: Clock3,
    },
    {
      title: "Pick up AI adaptation flows",
      subtitle:
        "Return to platform formatting, repurposing, and creator distribution tasks without context switching.",
      icon: Wand2,
    },
    {
      title: "Track performance in one place",
      subtitle:
        "Open analytics, engagement signals, publishing history, and creator insights from one workspace.",
      icon: BarChart3,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await authAPI.post("/auth/login", {
        email: email.trim(),
        password,
      });

      const { access_token, refresh_token, token_type } = response.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("token_type", token_type);

      setSuccessMessage("Login successful. Redirecting...");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const leftContent = (
    <div className="relative z-10 flex h-full flex-col">
      {/* Top badge */}
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dde7e1] bg-[#f7faf8] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#5c7065] shadow-sm">
        <Sparkles size={14} />
        Sarvagya creator operating system
      </div>

      {/* Brand block */}
      <div className="mt-8 flex items-center gap-5">
        <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#dce7e0] bg-[#f6fbf8] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <img
            src={logo}
            alt="Sarvagya"
            className="h-18 w-18 object-contain scale-200"
          />
        </div>

        <div>
          <div className="font-serif text-[2.8rem] font-semibold leading-none tracking-[-0.04em] text-[#172b22] sm:text-[3.3rem]">
            Sarvagya
          </div>
          <div className="mt-1 text-[0.78rem] font-semibold uppercase tracking-[0.34em] text-[#6c7f75]">
            Creator OS
          </div>
        </div>
      </div>

      {/* Hero copy */}
      <div className="mt-8 max-w-[760px]">
        <h1 className="font-serif text-[2.7rem] font-semibold leading-[0.95] tracking-[-0.05em] text-[#1a2d24] sm:text-[3.3rem] md:text-[4rem] lg:text-[4.6rem]">
          Welcome back.
          <br />
          <span className="bg-[linear-gradient(135deg,#6e8478_0%,#3f6a56_45%,#214c3a_100%)] bg-clip-text text-transparent">
            Your creator workspace
          </span>
          <br />
          is ready.
        </h1>

        <p className="mt-6 max-w-[720px] text-[1rem] leading-8 text-[#5c6d64] sm:text-[1.06rem]">
          Pick up your drafts, publishing queues, connected platforms, and
          content workflows from exactly where you left them. Sarvagya keeps
          creation, adaptation, publishing, and analytics in one premium system
          built for creators.
        </p>
      </div>

      {/* CTA row */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/register"
          className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-[22px] bg-[linear-gradient(135deg,#111827_0%,#182638_42%,#214f37_100%)] px-7 text-base font-semibold text-white shadow-[0_18px_34px_rgba(18,35,28,0.22)] transition hover:-translate-y-[1px]"
        >
          <span>Create account</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#183126]">
            <ArrowRight size={18} />
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex min-h-[58px] items-center justify-center rounded-[22px] border border-[#d9e4de] bg-white px-7 text-base font-semibold text-[#22362d] shadow-[0_10px_26px_rgba(20,36,29,0.06)] transition hover:-translate-y-[1px]"
        >
          Continue workflow
        </button>
      </div>

      {/* Workflow cards */}
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {workflowItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-[24px] border border-[#e0e8e3] bg-white/85 p-5 shadow-[0_12px_28px_rgba(20,36,29,0.06)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf6f1] text-[#315845]">
                <Icon size={20} />
              </div>

              <h3 className="mt-4 text-[1.02rem] font-semibold text-[#1f342a]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64766d]">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom trust / workflow strip */}
      <div className="mt-10 rounded-[26px] border border-[#e0e8e3] bg-white/85 p-5 shadow-[0_12px_28px_rgba(20,36,29,0.05)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[1.1rem] font-semibold text-[#20352b]">
              Continue publishing across your creator ecosystem
            </p>
            <p className="mt-1 text-sm text-[#6a7c72]">
              Drafts, scheduling, AI adaptation, publishing, and analytics —
              all waiting inside your Sarvagya workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Drafts", "Publishing", "Analytics", "AI Adaptation"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#dbe6df] bg-[#f7faf8] px-4 py-2 text-xs font-semibold text-[#557166]"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <>
      <div className="inline-flex items-center gap-2 rounded-full border border-[#dbe6df] bg-[#f4f8f5] px-4 py-2 text-sm font-semibold text-[#587064]">
        <Sparkles size={15} />
        Returning creators
      </div>

      <h2 className="mt-5 font-serif text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1a2d24] sm:text-[2.8rem]">
        Log in to Sarvagya
      </h2>

      <p className="mt-4 max-w-[560px] text-[1rem] leading-7 text-[#697970]">
        Access your creator workspace, continue publishing flows, and manage
        connected platforms from one premium operating system.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {/* Email */}
        <label className="flex items-center gap-3 rounded-[22px] border border-[#e3e8e4] bg-white px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition focus-within:border-[#bfd8ca] focus-within:shadow-[0_0_0_4px_rgba(182,214,197,0.22)]">
          <Mail className="h-5 w-5 text-[#8da198]" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent text-[1rem] text-[#1d3228] placeholder:text-[#9ba9a2] outline-none"
          />
        </label>

        {/* Password */}
        <label className="flex items-center gap-3 rounded-[22px] border border-[#e3e8e4] bg-white px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition focus-within:border-[#bfd8ca] focus-within:shadow-[0_0_0_4px_rgba(182,214,197,0.22)]">
          <Lock className="h-5 w-5 text-[#8da198]" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent text-[1rem] text-[#1d3228] placeholder:text-[#9ba9a2] outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-[#93a49d] transition hover:text-[#445d52]"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </label>

        {error && (
          <div className="rounded-[18px] border border-[#f6d2d2] bg-[#fff3f3] px-4 py-3 text-sm text-[#8e1f1f]">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="rounded-[18px] border border-[#d0f0dc] bg-[#f4fbf4] px-4 py-3 text-sm text-[#266239]">
            {successMessage}
          </div>
        )}

        {/* Remember / forgot block */}
        <div className="rounded-[24px] border border-[#ebefec] bg-[#fbfcfb] p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-3 text-sm text-[#5f7068]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[#bfd0c7] accent-[#2c6549]"
              />
              <span className="font-medium">Remember me</span>
            </label>

            <button
              type="button"
              className="text-left text-sm font-semibold text-[#214a37] transition hover:text-[#163427] sm:text-right"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="button"
            className="mt-3 text-left text-sm font-medium text-[#72847b] transition hover:text-[#445d52]"
          >
            Can’t access your email?
          </button>
        </div>

        {/* Security note */}
        <div className="rounded-[24px] border border-[#e7ece8] bg-[#f8fbf9] p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eaf5ef] text-[#2f6148]">
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#23372d]">
                Secure access to your creator workspace
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6b7c73]">
                Your connected platforms, drafts, publishing flows, and creator
                data stay protected with secure authentication.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group mt-2 inline-flex min-h-[62px] w-full items-center justify-center gap-3 rounded-[24px] bg-[linear-gradient(135deg,#111827_0%,#182638_45%,#214f37_100%)] px-6 text-[1.05rem] font-semibold text-white shadow-[0_18px_36px_rgba(18,35,28,0.24)] transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{isSubmitting ? "Logging in..." : "Log in"}</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1c3328] transition group-hover:translate-x-0.5">
            <ArrowRight size={19} />
          </span>
        </button>

        {/* Bottom links */}
        <div className="space-y-3 pt-2 text-center">
          <p className="text-sm text-[#71837a]">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#214a37] transition hover:text-[#173428]"
            >
              Create one
            </Link>
          </p>
        </div>
      </form>
    </>
  );

  return <AuthShell leftContent={leftContent} rightContent={rightContent} />;
}