import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const readRecipe = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
    const user = await ctx.db
      .query("user")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }
    const recipes = await ctx.db
      .query("recipe")
      .withIndex("by_user", (q) => q.eq("user", user._id))
      .collect();
    console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
    console.log("Recipes:",recipes);
    return recipes;
  },
});

