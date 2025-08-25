from fastapi import APIRouter
from discord.ext import commands

router = APIRouter()

def setup_routes(bot: commands.Bot):
    @router.get("/servers")
    async def list_servers():
        servers = [
            {"guild_id": str(g.id), "guild_name": g.name}
            for g in bot.guilds
            if "HK251" in g.name
        ]
        return { "servers": servers }
