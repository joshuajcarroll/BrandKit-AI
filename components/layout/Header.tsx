// components/layout/header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowRight, Sparkles, Menu, X } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-500 to-emerald-400">
              <Sparkles className="h-4 w-4 text-slate-950 dark:text-slate-50" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              BrandKit
              <span className="text-indigo-500 dark:text-indigo-400">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Desktop nav */}
            <nav className="hidden items-center gap-3 sm:flex">
              <Link
                href="/pricing"
                className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
              >
                Pricing
              </Link>

              <SignedIn>
                <Link
                  href="/dashboard"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
                >
                  Dashboard
                </Link>

                <UserButton
                  afterSignOutUrl="/"
                  appearance={{ elements: { avatarBox: "h-8 w-8" } }}
                />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Log in
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button size="sm" className="gap-1">
                    Get started
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </SignUpButton>
              </SignedOut>
            </nav>

            {/* Theme toggle (desktop) */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Mobile: theme toggle + sign in/user + menu button */}
            <div className="flex items-center gap-2 sm:hidden">
              <ThemeToggle />

              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{ elements: { avatarBox: "h-8 w-8" } }}
                />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm text-slate-800 shadow-sm transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>

              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-slate-800 shadow-sm hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                {isOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-200 ease-out sm:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40" onClick={closeMenu} />

        {/* Panel */}
        <div className="absolute inset-y-0 right-0 flex w-64 flex-col border-l border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
            <span className="text-sm font-semibold">Menu</span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-4 text-sm">
            <Link
              href="/pricing"
              onClick={closeMenu}
              className="block rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Pricing
            </Link>

            <SignedIn>
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="block rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Dashboard
              </Link>
              <Link
                href="/brand/new"
                onClick={closeMenu}
                className="block rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                New brand kit
              </Link>
            </SignedIn>
          </nav>

          <div className="space-y-2 border-t border-slate-200 px-4 py-4 dark:border-slate-800">
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={closeMenu}
                >
                  Log in
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button
                  className="w-full justify-center gap-1"
                  onClick={closeMenu}
                >
                  Get started
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Account
                </span>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{ elements: { avatarBox: "h-8 w-8" } }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </>
  );
}
