import React, { useEffect, useState } from "react";
import { fetchServers, fetchMembers } from "../api/servers";

export default function ServerList() {
    const [servers, setServers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedServer, setSelectedServer] = useState(null);
    const [members, setMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);

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

    if (loading) return <div style={{ padding: "20px" }}>Đang tải servers...</div>;

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>Servers</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
                {servers.map((s) => (
                    <div
                        key={s.guild_id}
                        onClick={() => setSelectedServer(s)}
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            backgroundColor: "#fff",
                            boxShadow: selectedServer?.guild_id === s.guild_id ? "0 0 0 2px #4f46e5" : "0 2px 6px rgba(0,0,0,0.1)",
                            transition: "0.2s",
                        }}
                    >
                        <div
                            style={{
                                height: "50px",
                                width: "50px",
                                borderRadius: "50%",
                                backgroundColor: "#4f46e5",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "18px",
                            }}
                        >
                            {s.guild_name.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ marginLeft: "12px" }}>
                            <div style={{ fontWeight: "500" }}>{s.guild_name}</div>
                            <div style={{ fontSize: "12px", color: "#666" }}>ID: {s.guild_id}</div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedServer && (
                <div style={{ marginTop: "30px" }}>
                    <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                        Thành viên trong {selectedServer.guild_name}
                    </h3>
                    {loadingMembers ? (
                        <p>Đang tải thành viên...</p>
                    ) : (
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {members.map((m) => (
                                <li
                                    key={m.id}
                                    style={{
                                        padding: "8px 0",
                                        borderBottom: "1px solid #eee",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>
                                        {m.display_name}{" "}
                                        <span style={{ fontSize: "12px", color: "#777" }}>({m.name})</span>
                                    </span>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(m.id)}
                                        style={{
                                            padding: "4px 8px",
                                            fontSize: "12px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Sao chép ID
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
