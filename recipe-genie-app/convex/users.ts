import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const store = mutation({
    args:{},
    handler:async(ctx)=>{
        const identity = await ctx.auth.getUserIdentity();
        console.log(identity);
        if(!identity){
            throw new Error("Called storeUser without authenticating")
        }
        //Check if we stored the data already
        const user = await ctx.db.query("user").withIndex("by_token",(q)=>q.eq("tokenIdentifier",identity.tokenIdentifier),).unique();
        console.log(JSON.stringify(user))
        if(user !== null){
            if(user.username !== identity.nickname){
                await ctx.db.patch(user._id,{username:identity.nickname})
            }
            return user._id;
            
        }
        return await ctx.db.insert("user",{
            username:identity.nickname??"Anonymous",
            tokenIdentifier:identity.tokenIdentifier,
            email:identity.email??"emailaddress",
        });
    },
});

export const checkId = query({
    
    handler: async (ctx) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Unauthenticated call to mutation");
      }
      const user = await ctx.db
        .query("user")
        .withIndex("by_token", (q) =>
          q.eq("tokenIdentifier", identity.tokenIdentifier),
        )
        .unique();
      if (!user) {
        throw new Error("Unauthenticated call to mutation");
      }
      return user;
    },
  });
      
