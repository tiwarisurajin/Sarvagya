import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authApi";
import {
  ArrowRight,
  AtSign,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  Layers3,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import AuthShell from "../components/layout/AuthShell";
import logo from "../assets/logo.png";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name : "",
    username : "",
    email : "",
    password : "",
    confirmPassword : ""
  })
  
  const [error, setError] = useState(" ") ;
  const [success, setSuccess] = 
  useState("") ;
  const [isSubmitting , setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    setIsSubmitting(true);

    await registerUser({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    setSuccess("Registration successful. You can now log in.");

    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  } catch (err: any) {
    const message =
      err?.response?.data?.detail ||
      err?.response?.data?.message ||
      "Registration failed";

    setError(message);
  } finally {
    setIsSubmitting(false);
  }
};



  const valuePoints = [
    "Create articles, posts, videos, and image-based content from one creator workspace.",
    "Let AI adapt each piece for connected platforms automatically based on format, limits, and publishing context.",
    "Publish across channels without manually rewriting the same content for every platform.",
  ];

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
            className="h-11 w-11 object-contain scale-200"
          />
        </div>

        <div>
          <div className="font-serif text-[2.8rem] font-semibold leading-none tracking-[-0.04em] text-[#172b22] sm:text-[3.3rem]">
            Sarvagya
          </div>
          <div className="mt-2 text-sm font-semibold  tracking-[0.38em] text-[#6c7f75]">
            Creator OS
          </div>
        </div>
      </div>

      {/* Hero copy */}
      <div className="mt-8 max-w-[760px]">
        <h1 className="font-serif text-[2.7rem] font-semibold leading-[0.95] tracking-[-0.05em] text-[#1a2d24] sm:text-[3.3rem] md:text-[4rem] lg:text-[4.6rem]">
          Create once.
          <br />
          <span className="bg-[linear-gradient(135deg,#6e8478_0%,#3f6a56_45%,#214c3a_100%)] bg-clip-text text-transparent">
            Publish everywhere
          </span>
          <br />
          with one workspace.
        </h1>

        <p className="mt-6 max-w-[720px] text-[1rem] leading-8 text-[#5c6d64] sm:text-[1.06rem]">
          Sarvagya helps creators build content from one intelligent workspace,
          adapt it for connected platforms with AI, and publish across their
          creator ecosystem without repetitive manual formatting.
        </p>
      </div>

      {/* CTA row */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-[22px] bg-[linear-gradient(135deg,#111827_0%,#182638_42%,#214f37_100%)] px-7 text-base font-semibold text-white shadow-[0_18px_34px_rgba(18,35,28,0.22)] transition hover:-translate-y-[1px]">
          <span>Start creating</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#183126]">
            <ArrowRight size={18} />
          </span>
        </button>

        <button className="inline-flex min-h-[58px] items-center justify-center rounded-[22px] border border-[#d9e4de] bg-white px-7 text-base font-semibold text-[#22362d] shadow-[0_10px_26px_rgba(20,36,29,0.06)] transition hover:-translate-y-[1px]">
          Explore workflow
        </button>
      </div>

      {/* Value cards */}
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Create in one place",
            subtitle:
              "Draft blogs, posts, scripts, captions, and creator content from one premium workspace.",
            icon: Layers3,
          },
          {
            title: "AI adapts for every platform",
            subtitle:
              "Sarvagya formats and reshapes content based on connected platform rules and context.",
            icon: Sparkles,
          },
          {
            title: "Publish without repetition",
            subtitle:
              "Stop rewriting the same idea manually for every channel in your creator stack.",
            icon: BookOpen,
          },
        ].map((item) => {
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
              Build, adapt, and publish from one creator OS
            </p>
            <p className="mt-1 text-sm text-[#6a7c72]">
              Writing, adaptation, scheduling, publishing, and analytics — all
              inside a single workflow system.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Drafts", "Publishing", "AI Adaptation", "Analytics"].map(
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
        New creators
      </div>

      <h2 className="mt-5 font-serif text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1a2d24] sm:text-[2.8rem]">
        Create your Sarvagya account
      </h2>

      <p className="mt-4 max-w-[560px] text-[1rem] leading-7 text-[#697970]">
        Start your creator workspace, connect platforms, and let Sarvagya handle
        adaptation and publishing from one intelligent system.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex items-center gap-3 rounded-[22px] border border-[#e3e8e4] bg-white px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition focus-within:border-[#bfd8ca] focus-within:shadow-[0_0_0_4px_rgba(182,214,197,0.22)]">
            <Mail className="h-5 w-5 text-[#8da198]" />
            <input           
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="name"
              className="w-full bg-transparent text-[1rem] text-[#1d3228] placeholder:text-[#7b8f84] outline-none"
            />
                        
          </label>

          <label className="flex items-center gap-3 rounded-[22px] border border-[#e3e8e4] bg-white px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition focus-within:border-[#bfd8ca] focus-within:shadow-[0_0_0_4px_rgba(182,214,197,0.22)]">
            <AtSign className="h-5 w-5 text-[#8da198]" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full bg-transparent text-[1rem] text-[#1d3228] placeholder:text-[#7b8f84] outline-none"
            />
          </label>
        </div>

        {/* Email */}
        <label className="flex items-center gap-3 rounded-[22px] border border-[#e3e8e4] bg-white px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition focus-within:border-[#bfd8ca] focus-within:shadow-[0_0_0_4px_rgba(182,214,197,0.22)]">
              <Mail className="h-5 w-5 text-[#8da198]" />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full bg-transparent text-[1rem] text-[#1d3228] placeholder:text-[#7b8f84] outline-none"
              />
        </label>

        {/* Password */}
        <label className="flex items-center gap-3 rounded-[22px] border border-[#e3e8e4] bg-white px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition focus-within:border-[#bfd8ca] focus-within:shadow-[0_0_0_4px_rgba(182,214,197,0.22)]">
          <Lock className="h-5 w-5 text-[#8da198]" />
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full bg-transparent text-[1rem] text-[#1d3228] placeholder:text-[#7b8f84] outline-none"
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

        {/* Confirm password */}
        <label className="flex items-center gap-3 rounded-[22px] border border-[#e3e8e4] bg-white px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition focus-within:border-[#bfd8ca] focus-within:shadow-[0_0_0_4px_rgba(182,214,197,0.22)]">
          <Lock className="h-5 w-5 text-[#8da198]" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full bg-transparent text-[1rem] text-[#1d3228] placeholder:text-[#7b8f84] outline-none"
              />
          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword((prev) => !prev)
            }
            className="text-[#93a49d] transition hover:text-[#445d52]"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </label>

        {/* Benefits strip */}
        <div className="rounded-[24px] border border-[#ebefec] bg-[#fbfcfb] p-4 sm:p-5">
          <div className="space-y-3">
            {valuePoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#eaf5ef] text-[#2f6148]">
                  <Check size={14} />
                </div>
                <p className="text-sm leading-6 text-[#63756c]">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 rounded-[24px] border border-[#ebefec] bg-[#fbfcfb] p-4 sm:p-5">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-[#bfd0c7] accent-[#2c6549]"
          />
          <span className="text-sm leading-6 text-[#63756c]">
            I agree to Sarvagya’s{" "}
            <button
              type="button"
              className="font-semibold text-[#214a37] transition hover:text-[#163427]"
            >
              Terms
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="font-semibold text-[#214a37] transition hover:text-[#163427]"
            >
              Privacy Policy
            </button>
            .
          </span>
        </label>

        {/* Security note */}
        <div className="rounded-[24px] border border-[#e7ece8] bg-[#f8fbf9] p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eaf5ef] text-[#2f6148]">
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#23372d]">
                Secure onboarding for your creator workspace
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6b7c73]">
                Your account, connected platforms, drafts, and publishing
                workflows stay protected with secure authentication.
              </p>
            </div>
          </div>
        </div>
                {error && (
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="text-sm font-medium text-green-600">
            {success}
          </p>
        )}

        {/* CTA */}
        <button
          type="submit"
          className="group mt-2 inline-flex min-h-[62px] w-full items-center justify-center gap-3 rounded-[24px] bg-[linear-gradient(135deg,#111827_0%,#182638_45%,#214f37_100%)] px-6 text-[1.05rem] font-semibold text-white shadow-[0_18px_36px_rgba(18,35,28,0.24)] transition hover:-translate-y-[1px]"
        >
          <span>{isSubmitting ? "Creating..." : "Create account"}</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1c3328] transition group-hover:translate-x-0.5">
            <ArrowRight size={19} />
          </span>
        </button>

        {/* Bottom links */}
        <div className="space-y-3 pt-2 text-center">
          <p className="text-sm text-[#71837a]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#214a37] transition hover:text-[#173428]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </>
  );

  return <AuthShell leftContent={leftContent} rightContent={rightContent} />;
}