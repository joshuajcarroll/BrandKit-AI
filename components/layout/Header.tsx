// components/layout/header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowRight, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-500 to-emerald-400">
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
  );
}
