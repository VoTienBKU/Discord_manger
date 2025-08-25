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
        members = [
            {"id": m.id, "name": m.name, "display_name": m.display_name}
            for m in guild.members if not m.bot
        ]
        return {"members": members}
