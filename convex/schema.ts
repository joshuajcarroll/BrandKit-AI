// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    plan: v.union(v.literal("free"), v.literal("pro")),
    brandKitCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_clerkUserId", ["clerkUserId"]),

  brandKits: defineTable({
    // Reference to users table
    userId: v.id("users"),

    // User-provided fields
    businessName: v.string(),
    industry: v.optional(v.string()),
    description: v.optional(v.string()),
    vibe: v.array(v.string()), // e.g. ["modern", "playful"]
    targetAudience: v.optional(v.string()),

    // Generated narrative fields
    tagline: v.optional(v.string()),
    brandSummary: v.optional(v.string()),
    brandVoice: v.optional(v.string()),

    // Colors
    colors: v.array(
      v.object({
        name: v.string(),
        hex: v.string(),
        role: v.union(
          v.literal("primary"),
          v.literal("secondary"),
          v.literal("accent"),
          v.literal("background"),
          v.literal("neutral")
        ),
      })
    ),

    // Fonts
    fonts: v.array(
      v.object({
        name: v.string(),
        role: v.union(
          v.literal("heading"),
          v.literal("body"),
          v.literal("accent")
        ),
        source: v.string(), // e.g. "Google Fonts"
      })
    ),

    // Website copy
    websiteHero: v.optional(v.string()),
    websiteSubheading: v.optional(v.string()),
    websiteAbout: v.optional(v.string()),
    websiteServices: v.optional(v.array(v.string())),
    websiteCTA: v.optional(v.string()),

    // Social bios
    instagramBio: v.optional(v.string()),
    tiktokBio: v.optional(v.string()),
    twitterBio: v.optional(v.string()),

    // Logo
    logoImageUrl: v.optional(v.string()), // Vercel Blob / Cloudinary URL
    logoPromptUsed: v.optional(v.string()),

    // Meta
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_createdAt", ["userId", "createdAt"]),

  subscriptions: defineTable({
    userId: v.id("users"),

    // If you use Clerk Billing, this might be Clerk-subscription identifiers,
    // otherwise Stripe ids if you wire Stripe directly.
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),

    status: v.union(
      v.literal("active"),
      v.literal("canceled"),
      v.literal("past_due"),
      v.literal("incomplete"),
      v.literal("trialing"),
      v.literal("incomplete_expired")
    ),

    currentPlan: v.union(v.literal("free"), v.literal("pro")),

    renewalDate: v.optional(v.number()), // ms since epoch

    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_userId", ["userId"])
    .index("by_stripeCustomerId", ["stripeCustomerId"])
    .index("by_stripeSubscriptionId", ["stripeSubscriptionId"]),
});
