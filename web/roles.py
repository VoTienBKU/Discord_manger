from fastapi import APIRouter
from discord.ext import commands
import discord

router = APIRouter()

def setup_routes(bot: commands.Bot):
    @router.get("/servers/{guild_id}/roles")
    async def list_roles(guild_id: int):
        guild = discord.utils.get(bot.guilds, id=guild_id)
        roles = [
            {"role_id": r.id, "name": r.name}
            for r in guild.roles if r != guild.default_role
        ]
        return {"roles": roles}
