from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from discord.ext import commands
from . import servers, roles, members
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

frontend_path = os.path.join(os.path.dirname(__file__), "./dashboard/build")
app.mount("/static", StaticFiles(directory=os.path.join(frontend_path, "static")), name="static")

def setup_routes(bot: commands.Bot):
    servers.setup_routes(bot)
    app.include_router(servers.router, prefix="/api")

    roles.setup_routes(bot)
    app.include_router(roles.router, prefix="/api")

    members.setup_routes(bot)
    app.include_router(members.router, prefix="/api")

    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        index_file = os.path.join(frontend_path, "index.html")
        return FileResponse(index_file)