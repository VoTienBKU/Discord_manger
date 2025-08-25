import discord
from discord.ext import commands
import os
import asyncio
import uvicorn
from config import TOKEN, PREFIX
from web.api import app, setup_routes

intents = discord.Intents.default()
intents.guilds = True
intents.members = True
intents.message_content = True  # nếu cần đọc nội dung message

bot = commands.Bot(command_prefix=PREFIX, intents=intents)

# ---------------- BOT EVENTS ----------------
@bot.event
async def on_ready():
    print(f"🤖 Bot: {bot.user}")

# ---------------- RUN BOT + API ----------------
async def main():
    # Load cogs
    for filename in os.listdir("./cogs"):
        if filename.endswith(".py"):
            await bot.load_extension(f"cogs.{filename[:-3]}")

    # Setup API routes với bot
    setup_routes(bot)

    # Chạy song song bot + API
    config = uvicorn.Config(app, host="0.0.0.0", port=8000, loop="asyncio", lifespan="on")
    server = uvicorn.Server(config)

    async with bot:
        bot_task = asyncio.create_task(bot.start(TOKEN))
        api_task = asyncio.create_task(server.serve())
        await asyncio.gather(bot_task, api_task)

if __name__ == "__main__":
    asyncio.run(main())