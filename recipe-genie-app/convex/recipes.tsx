import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all recipe based on userId
export const readRecipe = query({
  args: { userId: v.id("user") },
  handler: async (ctx, args) => {
    const recipe = await ctx.db
      .query("recipe")
      .filter((q) => q.eq(q.field("user"), args.userId))
      .collect();
    return recipe;
  },
});

// Create a recipe based and save in respective ID
export const createRecipe = mutation({
  args: {
    recipeName: v.string(),
    description: v.string(),
    userId: v.id("user"), // Expecting a userId to link the recipe to a user
    averageRating: v.optional(v.float64()), // Optional argument
    ratingCount: v.optional(v.number()), // Optional argument
  },
  handler: async (ctx, args) => {
    const { recipeName, description, userId, averageRating, ratingCount } =
      args;
    console.log(userId);

    const insertRecipe = await ctx.db.insert("recipe", {
      recipeName: recipeName,
      description: description,
      user: userId, // Link to the user by ID
      averageRating: averageRating || 0.0, // Default to 0.0 if not provided
      ratingCount: ratingCount || 0, // Default to 0 if not provided
    });
    return insertRecipe;
  },
});

export const updateRecipe = mutation({
  args: {
    recipeId: v.id("recipe"),
    recipeName: v.optional(v.string()),
    description: v.optional(v.string()),
    averageRating: v.optional(v.float64()),
    ratingCount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { recipeId, recipeName, description, averageRating, ratingCount } =
      args;

    const recipe = await ctx.db.get(recipeId);
    if (!recipe) {
      throw new Error("Recipe does not exist");
    }

    await ctx.db.patch(recipeId, {
      recipeName: recipeName,
      description: description,
      averageRating: averageRating,
      ratingCount: ratingCount,
    });
  },
});

export const deleteRecipe = mutation({
  args: { recipeId: v.id("recipe") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.recipeId);
  },
});
