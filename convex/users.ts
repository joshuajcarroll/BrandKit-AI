// convex/users.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserByClerkId = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, { clerkUserId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
      .first();
  },
});

export const updateUser = mutation({
  args: {
    clerkUserId: v.string(),
    name: v.optional(v.string()),
    email: v.string(),
  },
  handler: async (ctx, { clerkUserId, name, email }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, { name, email, updatedAt: now });
      return existing._id;
    }

    return await ctx.db.insert("users", {
      clerkUserId,
      name,
      email,
      plan: "free",
      brandKitCount: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});
