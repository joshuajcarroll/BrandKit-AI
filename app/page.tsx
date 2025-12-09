// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Palette, Type, Wand2, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-50">
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400">
              <Sparkles className="h-4 w-4 text-slate-950 dark:text-slate-50" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              BrandKit
              <span className="text-indigo-500 dark:text-indigo-400">AI</span>
            </span>
          </div>

          {/* Nav actions */}
          <nav className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="hidden text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50 sm:inline-block"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="hidden text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50 sm:inline-block"
            >
              Dashboard
            </Link>
            <Link href="/sign-in">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Log in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="gap-1">
                Get started
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24">
            <div className="flex-1 space-y-6">
              <Badge className="border border-indigo-500/40 bg-indigo-100/60 text-xs font-medium uppercase tracking-wide text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">
                New • AI brand kit in 60 seconds
              </Badge>

              <h1 className="text-balance text-3xl font-semibold tracking-tight leading-tight sm:text-4xl md:text-5xl">
                Launch your brand
                <span className="block bg-linear-to-r from-indigo-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent pb-1">
                  without a designer.
                </span>
              </h1>

              <p className="max-w-xl text-balance text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                BrandKitAI creates your logo, color palette, typography, website
                copy and social bios in one click. Go from idea to consistent
                visual identity in under a minute.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-2">
                    Generate my brand kit
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <span className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                  No credit card for your first brand kit.
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Instant AI-generated logo & palette
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  SEO-ready website copy
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  Social bios that actually convert
                </div>
              </div>
            </div>

            {/* Hero “preview” card */}
            <div className="flex-1">
              <Card className="border border-slate-200 bg-white/90 backdrop-blur shadow-xl shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/40">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2 text-base text-slate-900 dark:text-slate-100">
                    <span className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                        <Palette className="h-4 w-4 text-indigo-500 dark:text-indigo-300" />
                      </div>
                      Paw Palace • Brand Kit
                    </span>
                    <Badge
                      variant="outline"
                      className="border-emerald-400/40 text-[10px] text-emerald-700 dark:text-emerald-200"
                    >
                      Generated • 12s
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 dark:text-slate-300">
                    Friendly mobile dog grooming for busy city pet parents.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-xs text-slate-700 dark:text-slate-200">
                  {/* Colors */}
                  <div>
                    <p className="mb-2 font-medium text-slate-900 dark:text-slate-100">
                      Color palette
                    </p>
                    <div className="flex gap-2">
                      <div className="h-10 flex-1 rounded-lg bg-[#F97373]" />
                      <div className="h-10 flex-1 rounded-lg bg-[#FDBA74]" />
                      <div className="h-10 flex-1 rounded-lg bg-[#FEF3C7]" />
                      <div className="h-10 flex-1 rounded-lg bg-[#0F172A]" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                      <span>#F97373 • Primary</span>
                      <span>#FDBA74 • Accent</span>
                      <span>#FEF3C7 • Background</span>
                      <span>#0F172A • Neutral</span>
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="grid gap-2 md:grid-cols-2">
                    <div>
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Heading font
                      </p>
                      <p className="rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 dark:bg-slate-800/70 dark:text-slate-50">
                        “Paw Palace”
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                        Montserrat • Bold • 600
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Body font
                      </p>
                      <p className="rounded-md bg-slate-100 px-3 py-2 text-xs leading-relaxed text-slate-900 dark:bg-slate-800/70 dark:text-slate-50">
                        Convenient, stress-free grooming right at your doorstep.
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                        Inter • Regular • 400
                      </p>
                    </div>
                  </div>

                  {/* Website copy sample */}
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Homepage hero
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Royal grooming for the pets that rule your home.
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      We bring full-service grooming to your door, keeping your
                      best friend clean, calm, and camera-ready—without the
                      stressful trip across town.
                    </p>
                  </div>

                  {/* Social bios */}
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Social bio (Instagram)
                    </p>
                    <p className="rounded-md bg-slate-100 px-3 py-2 text-[11px] text-slate-900 dark:bg-slate-800/70 dark:text-slate-50">
                      Mobile dog grooming 🚐✨
                      <br />
                      Gentle care for anxious pups 🐾
                      <br />
                      Book your royal treatment today 👑
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature section */}
        <section className="border-b border-slate-200 bg-slate-100/80 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <h2 className="text-center text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
              Everything your brand needs,
              <span className="text-indigo-600 dark:text-indigo-300">
                {" "}
                done for you.
              </span>
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              From logo to copy, BrandKitAI gives you a cohesive identity you
              can plug into any website builder in minutes.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Card className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70">
                <CardHeader className="space-y-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-500/20">
                    <Wand2 className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <CardTitle className="text-sm text-slate-900 dark:text-slate-100">
                    AI branding in seconds
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600 dark:text-slate-400">
                    Just describe your business and vibe. We generate your brand
                    story, voice, tagline, and positioning automatically.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70">
                <CardHeader className="space-y-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
                    <Palette className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <CardTitle className="text-sm text-slate-900 dark:text-slate-100">
                    Logo, colors & typography
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600 dark:text-slate-400">
                    Get a ready-to-use logo, harmonious color palette, and font
                    pairings chosen for your audience and industry.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70">
                <CardHeader className="space-y-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-500/20">
                    <Type className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                  </div>
                  <CardTitle className="text-sm text-slate-900 dark:text-slate-100">
                    Website & social copy
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600 dark:text-slate-400">
                    Hero text, about section, services and social bios—written
                    in a consistent voice that matches your brand.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Simple pricing teaser */}
        <section className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <div className="grid gap-6 md:grid-cols-[2fr,3fr] md:items-center">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
                  Start free. Upgrade when you’re ready to launch.
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                  Generate your first brand for free and see your logo, colors
                  and copy come together. When you’re ready to create more
                  brands or export assets, upgrade in a click.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                  <span>• First brand kit free</span>
                  <span>• Cancel anytime</span>
                  <span>• Keep full rights to your assets</span>
                </div>
              </div>
              <Card className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70">
                <CardHeader>
                  <CardTitle className="flex items-baseline gap-2 text-lg text-slate-900 dark:text-slate-100">
                    Pro
                    <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                      for growing brands
                    </span>
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600 dark:text-slate-400">
                    Unlimited brand kits, hi-res logos and priority generation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
                      $19
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <li>✓ Unlimited brand kits</li>
                    <li>✓ High-resolution logo downloads</li>
                    <li>✓ Regenerate copy & palettes as you refine</li>
                    <li>✓ Priority AI generation</li>
                  </ul>
                  <Link href="/pricing">
                    <Button className="w-full">View full pricing</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-slate-500 dark:text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} BrandKitAI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="hover:text-slate-700 dark:hover:text-slate-200"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-slate-700 dark:hover:text-slate-200"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
