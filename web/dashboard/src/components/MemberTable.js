import React, { useState } from "react";

export default function MemberTable({ members, loadingMembers }) {
    const [sortAsc, setSortAsc] = useState(true);

    const extractDisplayId = (name) => {
        if (!name) return null;
        const parts = name.split("-");
        return isNaN(parts[0]) ? null : parseInt(parts[0], 10);
    };

    const validMembers = members.map(m => ({
        ...m,
        displayId: extractDisplayId(m.display_name)
    })).filter(m => m.displayId !== null);

    const maxId = validMembers.length > 0 ? Math.max(...validMembers.map(m => m.displayId)) : 0;

    const idMap = {};
    validMembers.forEach(m => {
        if (!idMap[m.displayId]) idMap[m.displayId] = [];
        idMap[m.displayId].push(m);
    });

    let rows = [];
    for (let i = 1; i <= maxId; i++) {
        if (!idMap[i]) {
            rows.push({ displayId: i, missing: true });
        } else if (idMap[i].length === 1) {
            rows.push(idMap[i][0]);
        } else {
            idMap[i].forEach(m => rows.push({ ...m, duplicate: true }));
        }
    }

    if (!sortAsc) rows.reverse();

    const noIdMembers = members.filter(m => extractDisplayId(m.display_name) === null);
    const sortedNoIdMembers = noIdMembers.map(m => ({ ...m, noId: true }));
    rows = [...rows, ...sortedNoIdMembers];

    const roleCounts = {};
    members.forEach((m) => {
        m.roles?.forEach((r) => {
            roleCounts[r] = (roleCounts[r] || 0) + 1;
        });
    });

    return (
        <div className="p-4 md:p-6">
            {loadingMembers ? (
                <div className="py-8">Đang tải thành viên...</div>
            ) : (
                <div className="overflow-x-auto">

                    <div className="p-4 md:p-6">
                        <div className="mb-4">
                            <div className="mt-2 space-y-2">
                                {Object.entries(roleCounts).map(([role, count]) => {
                                    const hkCount = roleCounts["HK251"] || 0;
                                    const maxCount = hkCount || Math.max(...Object.values(roleCounts));
                                    const widthPercent = Math.round((count / maxCount) * 100);

                                    return (
                                        <div key={role} className="flex items-center space-x-2">
                                            <span className="text-xs w-24">{role}</span>
                                            <div className="flex-1 bg-gray-200 rounded h-4 overflow-hidden">
                                                <div
                                                    className={`h-4 rounded`}
                                                    style={{
                                                        width: `${widthPercent}%`,
                                                        backgroundColor: role === "HK251" ? "#4f46e5" : "#3b82f6",
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-xs w-8 text-right">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">

                            </table>
                        </div>
                    </div>
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                                    onClick={() => setSortAsc(!sortAsc)}
                                >
                                    ID Name {sortAsc ? "↑" : "↓"}
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                    Display Name
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                    Roles
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rows.length > 0 ? (
                                rows.map((row, idx) => {
                                    const isMissing = row.missing;
                                    const isDuplicate = row.duplicate;
                                    return (
                                        <tr
                                            key={idx}
                                            className={`
                                                hover:bg-gray-50
                                                ${isMissing || isDuplicate ? "bg-red-100" : ""}
                                                ${row.noId ? "bg-yellow-100" : ""}
                                            `}
                                        >
                                            <td className="px-4 py-2 text-sm text-gray-600">
                                                {row.displayId ?? "-"}
                                            </td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900">
                                                {row.display_name ?? "-"}
                                            </td>

                                            <td className="px-4 py-2 text-sm text-gray-700">
                                                {row.roles?.length > 0 ? row.roles.join(", ") : "-"}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-4 py-4 text-center text-gray-500"
                                    >
                                        Không có thành viên
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
