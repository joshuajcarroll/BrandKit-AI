// app/pricing/page.tsx
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
import { Check, ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <main className="mx-auto max-w-5xl px-4 py-12 space-y-10">
        {/* Heading */}
        <section className="text-center space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple pricing for growing brands
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 sm:text-base max-w-2xl mx-auto">
            Start for free, generate your first brand kit, and upgrade to Pro
            when you’re ready to launch more ideas or clients.
          </p>
        </section>

        {/* Plans */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Free plan */}
          <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-lg">Free</CardTitle>
                <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Best for testing
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-600 dark:text-slate-400">
                Try BrandKitAI with one brand kit and see how it fits your
                workflow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold">$0</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  /forever
                </span>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="mt-[3px] h-4 w-4 text-emerald-500" />
                  <span>1 brand kit</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[3px] h-4 w-4 text-emerald-500" />
                  <span>Logo concept, colors, fonts & copy</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[3px] h-4 w-4 text-emerald-500" />
                  <span>Download basic assets</span>
                </li>
              </ul>
              <Link href="/sign-up">
                <Button variant="outline" className="w-full justify-center">
                  Get started free
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro plan */}
          <Card className="border-indigo-200 bg-indigo-50 dark:border-indigo-500/60 dark:bg-slate-900/80 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 via-sky-400 to-emerald-400" />
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-lg">Pro</CardTitle>
                <Badge className="bg-indigo-500 text-xs text-white">
                  Most popular
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-700 dark:text-slate-300">
                For founders, creators and small studios who need more than one
                brand.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold">$19</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  /month
                </span>
              </div>
              <ul className="space-y-2 text-sm text-slate-800 dark:text-slate-200">
                <li className="flex items-start gap-2">
                  <Check className="mt-[3px] h-4 w-4 text-emerald-500" />
                  <span>Unlimited brand kits</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[3px] h-4 w-4 text-emerald-500" />
                  <span>High-resolution logo exports</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[3px] h-4 w-4 text-emerald-500" />
                  <span>Regenerate copy & palettes as you refine</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-[3px] h-4 w-4 text-emerald-500" />
                  <span>Priority generation and support</span>
                </li>
              </ul>
              {/* For now, just go to dashboard; later this will trigger Clerk Billing checkout */}
              <Link href="/dashboard">
                <Button className="w-full justify-center gap-2">
                  Upgrade to Pro
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          You can change or cancel your plan at any time. Your free brand kit is
          always yours.
        </p>
      </main>
    </div>
  );
}
