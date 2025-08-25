import discord
from discord.ext import commands

class NameServer(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name="create_group")
    @commands.has_permissions(administrator=True)
    async def create_group(self, ctx, group_name: str):
        guild = ctx.guild
        role = await guild.create_role(name=group_name)
        category = await guild.create_category(group_name)

        overwrites = {
            guild.default_role: discord.PermissionOverwrite(view_channel=False),
            role: discord.PermissionOverwrite(view_channel=True)
        }

        await guild.create_text_channel(f"{group_name}-chat", overwrites=overwrites, category=category)
        await guild.create_voice_channel(f"{group_name}-voice", overwrites=overwrites, category=category)
        await ctx.send(f"✅ Nhóm **{group_name}** đã được tạo!")

    @commands.command(name="add_to_group")
    async def add_to_group(self, ctx, member: discord.Member, group_name: str):
        role = discord.utils.get(ctx.guild.roles, name=group_name)
        if role:
            await member.add_roles(role)
            await ctx.send(f"✅ {member.mention} đã được thêm vào nhóm **{group_name}**")
        else:
            await ctx.send("❌ Nhóm không tồn tại!")

    @commands.command(name="remove_from_group")
    async def remove_from_group(self, ctx, member: discord.Member, group_name: str):
        role = discord.utils.get(ctx.guild.roles, name=group_name)
        if role:
            await member.remove_roles(role)
            await ctx.send(f"✅ {member.mention} đã được xoá khỏi nhóm **{group_name}**")
        else:
            await ctx.send("❌ Nhóm không tồn tại!")

async def setup(bot):
    await bot.add_cog(NameServer(bot))