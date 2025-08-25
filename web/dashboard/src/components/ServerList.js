import React, { useEffect, useState } from "react";
import { fetchServers, fetchMembers } from "../api/servers";
import { Server, Users, Copy, Loader2, ChevronRight, Hash, Calendar, Crown } from 'lucide-react';

export default function ServerList() {
    const [servers, setServers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedServer, setSelectedServer] = useState(null);
    const [members, setMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    // Load servers
    useEffect(() => {
        const getServers = async () => {
            try {
                const data = await fetchServers();
                setServers(data.servers);
            } catch (err) {
                console.error("Lỗi khi lấy servers:", err);
            } finally {
                setLoading(false);
            }
        };
        getServers();
    }, []);

    // Load members khi chọn server
    useEffect(() => {
        if (!selectedServer) return;
        const getMembers = async () => {
            setLoadingMembers(true);
            try {
                const data = await fetchMembers(selectedServer.guild_id);
                console.log(data);
                setMembers(data.members);
            } catch (err) {
                console.error("Lỗi khi lấy members:", err);
            } finally {
                setLoadingMembers(false);
            }
        };
        getMembers();
    }, [selectedServer]);

    const handleCopyId = async (id) => {
        try {
            await navigator.clipboard.writeText(id);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-discord-blurple" />
                <span className="ml-3 text-lg text-gray-600">Đang tải servers...</span>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Servers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servers.map((server) => (
                    <div
                        key={server.guild_id}
                        onClick={() => setSelectedServer(server)}
                        className={`card-hover cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                            selectedServer?.guild_id === server.guild_id
                                ? 'ring-2 ring-discord-blurple shadow-large'
                                : ''
                        }`}
                    >
                        <div className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                    {server.guild_name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                        {server.guild_name}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <Hash className="w-4 h-4 mr-1" />
                                        <span className="truncate">{server.guild_id}</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Server className="w-4 h-4 mr-1" />
                                    <span>Discord Server</span>
                                </div>
                                {selectedServer?.guild_id === server.guild_id && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-discord-blurple text-white">
                                        Đã chọn
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected Server Members */}
            {selectedServer && (
                <div className="card">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-lg font-bold">
                                    {selectedServer.guild_name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {selectedServer.guild_name}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Users className="w-4 h-4 mr-1" />
                                        <span>{members.length} thành viên</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedServer(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {loadingMembers ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-discord-blurple" />
                                <span className="ml-3 text-gray-600">Đang tải thành viên...</span>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {members.map((member) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-discord-greyple rounded-full flex items-center justify-center text-white font-semibold">
                                                {member.display_name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium text-gray-900">
                                                        {member.display_name}
                                                    </span>
                                                    {member.display_name !== member.name && (
                                                        <span className="text-sm text-gray-500">
                                                            ({member.name})
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Hash className="w-3 h-3 mr-1" />
                                                    <span>{member.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleCopyId(member.id)}
                                            className={`btn-secondary flex items-center space-x-1 text-xs ${
                                                copiedId === member.id ? 'bg-green-50 text-green-600 border-green-200' : ''
                                            }`}
                                        >
                                            <Copy className="w-3 h-3" />
                                            <span>
                                                {copiedId === member.id ? 'Đã sao chép!' : 'Sao chép ID'}
                                            </span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
