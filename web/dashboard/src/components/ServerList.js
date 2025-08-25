import React, { useEffect, useState } from "react";
import { fetchServers, fetchMembers } from "../api/servers";
import { Server, Users, Copy, Loader2, ChevronRight, Hash, Calendar, Crown } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

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
            <div className="py-12 animate-fade-in">
                <LoadingSpinner size="lg" text="Đang tải servers..." />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Servers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {servers.map((server, index) => (
                    <div
                        key={server.guild_id}
                        onClick={() => setSelectedServer(server)}
                        className={`card-hover cursor-pointer hover-lift animate-fade-in ${
                            selectedServer?.guild_id === server.guild_id
                                ? 'ring-2 ring-discord-blurple shadow-large'
                                : ''
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="p-4 md:p-6">
                            <div className="flex items-center space-x-3 md:space-x-4">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-lg flex-shrink-0">
                                    {server.guild_name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                                        {server.guild_name}
                                    </h3>
                                    <div className="flex items-center text-xs md:text-sm text-gray-500 mt-1">
                                        <Hash className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                        <span className="truncate text-xs">{server.guild_id}</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                            </div>

                            <div className="mt-3 md:mt-4 flex items-center justify-between">
                                <div className="flex items-center text-xs md:text-sm text-gray-600">
                                    <Server className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                    <span className="hidden sm:inline">Discord Server</span>
                                    <span className="sm:hidden">Server</span>
                                </div>
                                {selectedServer?.guild_id === server.guild_id && (
                                    <span className="inline-flex items-center px-2 py-1 md:px-2.5 md:py-0.5 rounded-full text-xs font-medium bg-discord-blurple text-white">
                                        <span className="hidden sm:inline">Đã chọn</span>
                                        <span className="sm:hidden">✓</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected Server Members */}
            {selectedServer && (
                <div className="card animate-slide-up">
                    <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-base md:text-lg font-bold animate-scale-in">
                                    {selectedServer.guild_name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
                                        {selectedServer.guild_name}
                                    </h3>
                                    <div className="flex items-center text-xs md:text-sm text-gray-500">
                                        <Users className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                        <span>{members.length} thành viên</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedServer(null)}
                                className="text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-200 p-1 md:p-2"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <div className="p-4 md:p-6">
                        {loadingMembers ? (
                            <div className="py-8">
                                <LoadingSpinner size="md" text="Đang tải thành viên..." />
                            </div>
                        ) : (
                            <div className="space-y-2 md:space-y-3">
                                {members.map((member, index) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center justify-between p-3 md:p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 animate-fade-in"
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-discord-greyple rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                                                {member.display_name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                                                    <span className="font-medium text-gray-900 truncate text-sm md:text-base">
                                                        {member.display_name}
                                                    </span>
                                                    {member.display_name !== member.name && (
                                                        <span className="text-xs md:text-sm text-gray-500 truncate">
                                                            ({member.name})
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                                    <Hash className="w-3 h-3 mr-1 flex-shrink-0" />
                                                    <span className="truncate">{member.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleCopyId(member.id)}
                                            className={`btn-secondary flex items-center space-x-1 text-xs flex-shrink-0 ml-2 ${
                                                copiedId === member.id ? 'bg-green-50 text-green-600 border-green-200' : ''
                                            }`}
                                        >
                                            <Copy className="w-3 h-3" />
                                            <span className="hidden sm:inline">
                                                {copiedId === member.id ? 'Đã sao chép!' : 'Sao chép ID'}
                                            </span>
                                            <span className="sm:hidden">
                                                {copiedId === member.id ? '✓' : 'Copy'}
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
