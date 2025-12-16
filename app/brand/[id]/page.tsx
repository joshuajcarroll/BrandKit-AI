// app/brand/[id]/page.tsx
import { Id } from "@/convex/_generated/dataModel";

export default function BrandKitPage({ params }: { params: { id: string } }) {
  // We'll fetch real kit data in Step 4/5
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Brand kit</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Kit id: <span className="font-mono">{params.id}</span>
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Next: we’ll load this kit from Convex and add the “Generate with AI”
          button.
        </p>
      </main>
    </div>
  );
}
