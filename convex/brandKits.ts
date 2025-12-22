// convex/brandKits.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { streamText } from "ai";

/**
 * Create a new brand kit for the currently authenticated Clerk user.
 * NOTE: We do NOT accept clerkUserId from the client (prevents spoofing).
 */
export const createBrandKit = mutation({
  args: {
    businessName: v.string(),
    industry: v.optional(v.string()),
    description: v.optional(v.string()),
    vibe: v.array(v.string()),
    targetAudience: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const clerkUserId = identity.subject;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
      .first();

    if (!user) throw new Error("User not found in Convex. Sync user first.");

    const isPro = user.plan === "pro";
    if (!isPro && user.brandKitCount >= 1) {
      throw new Error("Free plan limit reached. Upgrade to Pro.");
    }

    const now = Date.now();

    const brandKitId = await ctx.db.insert("brandKits", {
      userId: user._id,
      businessName: args.businessName,
      industry: args.industry,
      description: args.description,
      vibe: args.vibe,
      targetAudience: args.targetAudience,
      tagline: undefined,
      brandSummary: undefined,
      brandVoice: undefined,
      colors: [],
      fonts: [],
      websiteHero: undefined,
      websiteSubheading: undefined,
      websiteAbout: undefined,
      websiteServices: undefined,
      websiteCTA: undefined,
      instagramBio: undefined,
      tiktokBio: undefined,
      twitterBio: undefined,
      logoImageUrl: undefined,
      logoPromptUsed: undefined,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.patch(user._id, {
      brandKitCount: user.brandKitCount + 1,
      updatedAt: now,
    });

    return brandKitId;
  },
});

/**
 * Get the current user's brand kits, newest first.
 */
export const getBrandKitsForUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const clerkUserId = identity.subject;
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
      .first();

    if (!user) return [];

    return await ctx.db
      .query("brandKits")
      .withIndex("by_userId_createdAt", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

/**
 * Update generated fields for a brand kit.
 */
export const updateGeneratedBrandKit = mutation({
  args: {
    brandKitId: v.id("brandKits"),
    tagline: v.optional(v.string()),
    brandSummary: v.optional(v.string()),
    brandVoice: v.optional(v.string()),
    colors: v.optional(
      v.array(
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
      )
    ),
    fonts: v.optional(
      v.array(
        v.object({
          name: v.string(),
          role: v.union(
            v.literal("heading"),
            v.literal("body"),
            v.literal("accent")
          ),
          source: v.string(),
        })
      )
    ),
    websiteHero: v.optional(v.string()),
    websiteSubheading: v.optional(v.string()),
    websiteAbout: v.optional(v.string()),
    websiteServices: v.optional(v.array(v.string())),
    websiteCTA: v.optional(v.string()),
    instagramBio: v.optional(v.string()),
    tiktokBio: v.optional(v.string()),
    twitterBio: v.optional(v.string()),
    logoImageUrl: v.optional(v.string()),
    logoPromptUsed: v.optional(v.string()),
  },
  handler: async (ctx, { brandKitId, ...patch }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const clerkUserId = identity.subject;
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
      .first();
    if (!user) throw new Error("User not found");

    const existing = await ctx.db.get(brandKitId);
    if (!existing) throw new Error("Brand kit not found");
    if (existing.userId !== user._id) throw new Error("Unauthorized");

    await ctx.db.patch(brandKitId, { ...patch, updatedAt: Date.now() });
  },
});

/**
 * Generate AI content for a specific field in a brand kit.
 */
export const generateBrandKitField = mutation({
  args: {
    brandKitId: v.id("brandKits"),
    field: v.union(
      v.literal("tagline"),
      v.literal("brandSummary"),
      v.literal("brandVoice")
    ),
  },
  handler: async (ctx, { brandKitId, field }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const clerkUserId = identity.subject;
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
      .first();
    if (!user) throw new Error("User not found");

    const brandKit = await ctx.db.get(brandKitId);
    if (!brandKit) throw new Error("Brand kit not found");
    if (brandKit.userId !== user._id) throw new Error("Unauthorized");

    let prompt = "";
    if (field === "tagline") {
      prompt = `Write a short, catchy tagline for a business called "${brandKit.businessName}" in the ${brandKit.industry || "general"} industry.`;
    } else if (field === "brandSummary") {
      prompt = `Write a concise brand summary for a business called "${brandKit.businessName}" in the ${brandKit.industry || "general"} industry. Include the vibe: ${brandKit.vibe.join(", ")}.`;
    } else if (field === "brandVoice") {
      prompt = `Describe the brand voice for a business called "${brandKit.businessName}" with vibe: ${brandKit.vibe.join(", ")}.`;
    }

    // StreamTextResult gives you a `textStream` async iterable 👇
    const result = await streamText({
      model: "gpt-5.1",
      messages: [{ role: "user", content: prompt }],
    });

    let generated = "";
    for await (const chunk of result.textStream) {
      generated += chunk; // accumulate each piece of text
    }

    await ctx.db.patch(brandKitId, {
      [field]: generated,
      updatedAt: Date.now(),
    });

    return generated;
  },
});
