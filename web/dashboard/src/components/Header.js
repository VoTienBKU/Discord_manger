import React from 'react';
import { Server, Settings, User, Bell, Search } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-white shadow-soft border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo và tên */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <Server className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="ml-3 text-xl font-semibold text-gradient">
                                Discord Manager
                            </h1>
                        </div>
                    </div>

                    {/* Search bar - ẩn trên mobile */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-discord-blurple focus:border-discord-blurple sm:text-sm transition-colors duration-200"
                                placeholder="Tìm kiếm servers..."
                            />
                        </div>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        {/* Search button cho mobile */}
                        <button className="md:hidden p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-discord-blurple rounded-lg transition-colors duration-200">
                            <Search className="h-6 w-6" />
                        </button>

                        <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-discord-blurple rounded-lg transition-colors duration-200">
                            <Bell className="h-5 w-5 md:h-6 md:w-6" />
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                        </button>

                        <button className="hidden sm:block p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-discord-blurple rounded-lg transition-colors duration-200">
                            <Settings className="h-5 w-5 md:h-6 md:w-6" />
                        </button>

                        <div className="flex items-center">
                            <button className="flex items-center space-x-2 md:space-x-3 p-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-discord-blurple transition-colors duration-200">
                                <div className="w-8 h-8 bg-discord-blurple rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden lg:block">Admin</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
