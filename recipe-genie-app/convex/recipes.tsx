import { mutation,query } from "./_generated/server";
import { v } from "convex/values";

// Get all recipe based on userId
export const readRecipe = query({
    args:{userId: v.id("user")},
    handler: async(ctx,args)=>{
        const recipe = await ctx.db
            .query("recipe")
            .filter((q)=>q.eq(q.field("user"),args.userId))
            .collect();
        return recipe;

    },
});

// Create a recipe based and save in respective ID
export const createRecipe = mutation({
    args:{
        recipeName: v.string(),
        description: v.string(),
        userId: v.id("user"), // Expecting a userId to link the recipe to a user
        averageRating: v.optional(v.float64()), // Optional argument
        ratingCount: v.optional(v.number()), // Optional argument
    },
    handler:async(ctx,args)=>{
        const {recipeName,description,userId, averageRating, ratingCount} = args;
        console.log(userId)

        const insertRecipe = await ctx.db.insert("recipe", {
            recipeName:args.recipeName,
            description:args.description,
            user: args.userId, // Link to the user by ID
            averageRating: args.averageRating || 0.0, // Default to 0.0 if not provided
            ratingCount: args.ratingCount || 0, // Default to 0 if not provided
        });
        return insertRecipe;
    }
})