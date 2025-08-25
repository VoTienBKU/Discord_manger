from fastapi import FastAPI
from discord.ext import commands
from . import servers, roles, members
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def setup_routes(bot: commands.Bot):
    servers.setup_routes(bot)
    app.include_router(servers.router)

    roles.setup_routes(bot)
    app.include_router(roles.router)

    members.setup_routes(bot)
    app.include_router(members.router)
