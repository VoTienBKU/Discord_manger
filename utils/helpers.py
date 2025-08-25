import discord

def get_group_role(guild: discord.Guild, group_name: str):
    """Tìm role theo tên nhóm"""
    return discord.utils.get(guild.roles, name=group_name)
