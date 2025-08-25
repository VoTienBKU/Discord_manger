import axios from "axios";
const API_URL = "http://localhost:8000";

export async function fetchServers() {
    const res = await axios.get(`${API_URL}/servers`);
    return res.data;
}

export async function fetchMembers(guildId) {
    const res = await axios.get(`${API_URL}/servers/${guildId}/members`);
    return res.data;
}