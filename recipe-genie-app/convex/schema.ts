import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    username: v.string(),
    password: v.string(),
    email: v.string(),

  }),
  recipe: defineTable({
    recipeName: v.string(),
    description: v.string(),
    averageRating: v.optional(v.float64()),
    ratingCount: v.optional(v.number()),
    user: v.id("user"),
  }),
  recipeIngredients: defineTable({
    recipeId: v.id("recipe"),
    ingredientId: v.id("ingredient"),
    quantity: v.optional(v.number()),
    unit: v.optional(v.number()),
  }),
  ingredient: defineTable({
    ingredientName: v.string()
  })
});