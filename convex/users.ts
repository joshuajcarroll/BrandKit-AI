// convex/users.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get a user by Clerk user id
export const getUserByClerkId = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, { clerkUserId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
      .first();

    return user;
  },
});

// Upsert user (create or update) – this is your "updateUser" equivalent
export const updateUser = mutation({
  args: {
    clerkUserId: v.string(),
    name: v.optional(v.string()),
    email: v.string(),
  },
  handler: async (ctx, { clerkUserId, name, email }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
      .first();

    const now = Date.now();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name,
        email,
        updatedAt: now,
      });
      return existingUser._id;
    }

    // New user: default to free plan, 0 brand kits
    const newUserId = await ctx.db.insert("users", {
      clerkUserId,
      name,
      email,
      plan: "free",
      brandKitCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    return newUserId;
  },
});
