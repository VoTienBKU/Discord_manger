from fastapi import APIRouter
from discord.ext import commands
import discord

router = APIRouter()

def setup_routes(bot: commands.Bot):
    @router.get("/servers/{guild_id}/members")
    async def list_members(guild_id: int):
        guild = bot.get_guild(guild_id)
        if not guild:
            return {"error": "Guild not found"}
        
        members = []
        for m in guild.members:
            if m.bot:
                continue
            members.append({
                "id": m.id,
                "name": m.name,
                "display_name": m.display_name,
                "roles": [r.name for r in m.roles if r.name not in ("@everyone", "TA")]
            })
        
        return {"members": members}