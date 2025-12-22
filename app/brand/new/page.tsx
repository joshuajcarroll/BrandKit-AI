"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const VIBE_OPTIONS = [
  "modern",
  "minimal",
  "luxury",
  "playful",
  "bold",
  "friendly",
  "elegant",
  "techy",
  "retro",
  "serious",
] as const;

export default function NewBrandPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const createBrandKit = useMutation(api.brandKits.createBrandKit);

  const errorRef = useRef<HTMLDivElement>(null);

  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [vibes, setVibes] = useState<string[]>(["modern"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return businessName.trim().length >= 2 && vibes.length > 0 && !isSubmitting;
  }, [businessName, vibes.length, isSubmitting]);

  const toggleVibe = (v: string) => {
    setVibes((prev) => {
      if (prev.includes(v)) {
        if (prev.length === 1) return prev; // prevent removing last vibe
        return prev.filter((x) => x !== v);
      }
      return [...prev, v];
    });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isLoaded || !user) {
      setError("You must be signed in to create a brand kit.");
      return;
    }

    if (!canSubmit) return;

    try {
      setIsSubmitting(true);

      const brandKitId = await createBrandKit({
        businessName: businessName.trim(),
        industry: industry.trim() || undefined,
        description: description.trim() || undefined,
        vibe: vibes,
        targetAudience: targetAudience.trim() || undefined,
      });

      toast.success("Brand kit created!");

      // Navigate to Step 2: AI Generation page
      router.push(`/brand/${brandKitId}`);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Could not create brand kit. Please try again.";

      setError(msg);

      // Scroll to error & focus it (accessibility)
      setTimeout(() => {
        if (errorRef.current) {
          errorRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          errorRef.current.focus();
        }
      }, 0);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80">
          <CardHeader>
            <CardTitle className="text-xl">Create a new brand kit</CardTitle>
            <CardDescription>
              Describe the business and select a vibe — we’ll generate the brand
              assets next.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Business name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Business name</label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Paw Palace"
                  disabled={isSubmitting}
                />
              </div>

              {/* Industry */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Industry (optional)
                </label>
                <Input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Mobile dog grooming"
                  disabled={isSubmitting}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Description (optional)
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What do you offer? What makes you different?"
                  className="min-h-[110px]"
                  disabled={isSubmitting}
                />
              </div>

              {/* Target audience */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Target audience (optional)
                </label>
                <Input
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Busy city pet parents"
                  disabled={isSubmitting}
                />
              </div>

              {/* Vibes */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Vibe</label>
                <div className="flex flex-wrap gap-2">
                  {VIBE_OPTIONS.map((v) => {
                    const active = vibes.includes(v);
                    const isLastActive = active && vibes.length === 1;

                    return (
                      <button
                        key={v}
                        type="button"
                        disabled={isSubmitting || isLastActive}
                        onClick={() => toggleVibe(v)}
                        className={`rounded-full border px-3 py-1 text-xs transition ${
                          active
                            ? `border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-200 ${
                                isLastActive
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`
                            : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                        }`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-500">
                  Pick at least one. You can regenerate later.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  ref={errorRef}
                  tabIndex={-1}
                  className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="flex items-center justify-between gap-3">
                <Badge variant="outline" className="text-[10px]">
                  Step 1 of 2: Create kit
                </Badge>

                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "Creating..." : "Create brand kit"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
