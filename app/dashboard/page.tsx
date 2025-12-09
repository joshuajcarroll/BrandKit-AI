// app/dashboard/page.tsx
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
import { Plus, Sparkles } from "lucide-react";

// TODO: replace with real data from Convex later
const mockBrandKits = [
  {
    id: "1",
    name: "Paw Palace",
    industry: "Mobile dog grooming",
    tagline: "Royal grooming for the pets that rule your home.",
    createdAt: "Today",
    status: "Draft",
  },
  {
    id: "2",
    name: "Midnight Brew",
    industry: "Neighborhood coffee bar",
    tagline: "Stay a little longer.",
    createdAt: "2 days ago",
    status: "Ready",
  },
];

export default function DashboardPage() {
  const hasKits = mockBrandKits.length > 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Your brand kits
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              View, refine, and export your generated brands. Create a new one
              anytime.
            </p>
          </div>
          <Link href="/brand/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New brand kit
            </Button>
          </Link>
        </div>

        {/* Empty state if no kits */}
        {!hasKits && (
          <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80">
            <CardContent className="flex flex-col items-start gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold">
                  You don’t have any brand kits yet
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Create your first brand kit in under a minute. We’ll generate
                  logo, colors, fonts and copy for you.
                </p>
              </div>
              <Link href="/brand/new">
                <Button className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate your first brand
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* List of kits (mocked for now) */}
        {hasKits && (
          <div className="grid gap-4">
            {mockBrandKits.map((kit) => (
              <Card
                key={kit.id}
                className="border-slate-200 bg-white hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-500/40 dark:hover:shadow-indigo-500/10 transition"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{kit.name}</CardTitle>
                      <Badge
                        variant="outline"
                        className="border-slate-300 text-[10px] uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:text-slate-400"
                      >
                        {kit.industry}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                      {kit.tagline}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right">
                    <Badge
                      className={
                        kit.status === "Ready"
                          ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      }
                    >
                      {kit.status}
                    </Badge>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Created {kit.createdAt}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
                  <div className="flex flex-wrap gap-3">
                    <span>• Logo, colors & fonts generated</span>
                    <span>• Website & social copy ready</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/brand/${kit.id}`}>
                      <Button variant="outline" size="sm">
                        Open
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      Duplicate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
