// app/generate/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function GeneratePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <main className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs sm:text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to dashboard
            </Link>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <Sparkles className="h-3 w-3" />
            New brand kit
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Create a new brand kit
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tell us about your business and the vibe you’re going for. We’ll
            generate your logo, color palette, fonts, website copy, and social
            bios in one shot.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[3fr,2fr]">
          {/* Form card */}
          <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80">
            <CardHeader>
              <CardTitle className="text-base">Brand details</CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                Fill out as much as you can — the AI will use this to shape your
                brand identity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: add form action={generateBrand} once server action is ready */}
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    placeholder="Paw Palace"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      name="industry"
                      placeholder="Dog grooming, coffee shop, SaaS, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (optional)</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="New York, online-only, worldwide..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    What does your business do?
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="We offer mobile dog grooming for busy city pet parents..."
                    className="min-h-[90px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Brand vibe</Label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Pick a few words that describe how your brand should feel.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Modern",
                      "Playful",
                      "Minimal",
                      "Bold",
                      "Friendly",
                      "Elegant",
                      "Luxury",
                      "Warm",
                    ].map((vibe) => (
                      <label
                        key={vibe}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <input
                          type="checkbox"
                          name="vibe"
                          value={vibe.toLowerCase()}
                          className="h-3 w-3 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900"
                        />
                        <span>{vibe}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">
                    Who is your ideal customer?
                  </Label>
                  <Textarea
                    id="targetAudience"
                    name="targetAudience"
                    placeholder="Busy pet parents in the city, early-stage founders, remote teams..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" className="w-full sm:w-auto gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate brand kit
                  </Button>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    You can refine colors, copy, and logo after generation.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Sidebar card */}
          <Card className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-sm">What you’ll get</CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                All the pieces you need for a consistent brand in one place.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <ul className="space-y-2">
                <li>• Logo concept you can download</li>
                <li>• Color palette with hex codes & roles</li>
                <li>• Heading + body font suggestions</li>
                <li>• Homepage hero, about, services & CTA</li>
                <li>• Instagram, TikTok & Twitter bios</li>
              </ul>
              <div className="rounded-lg bg-slate-100 px-3 py-2 text-[11px] dark:bg-slate-900/80">
                <span className="font-medium text-slate-800 dark:text-slate-100">
                  Tip:
                </span>{" "}
                Start with one niche or offer. You can generate more brand kits
                later for other ideas.
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
