import React from 'react';
import { List, Calendar, AlertCircle, Menu } from 'lucide-react';
import { cn } from '../lib/utils';

export function Layout({ children, activeFilter, onFilterChange }) {
    const filters = [
        { id: 'all', label: 'All', icon: List, color: 'text-gray-500' },
        { id: 'urgent', label: 'Urgent', icon: AlertCircle, color: 'text-red-500' },
        { id: 'scheduled', label: 'Scheduled', icon: Calendar, color: 'text-blue-500' },
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-gray-200 hidden md:flex flex-col p-4">
                <div className="mb-8 px-4">
                    <h1 className="text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-lg">S</span>
                        SnapDo
                    </h1>
                </div>

                <nav className="space-y-1">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => onFilterChange(filter.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                activeFilter === filter.id
                                    ? "bg-gray-100 text-text"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-text"
                            )}
                        >
                            <filter.icon className={cn("w-5 h-5", filter.color)} />
                            {filter.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Mobile Header */}
                <div className="md:hidden h-16 border-b border-gray-200 bg-surface flex items-center px-4 justify-between">
                    <h1 className="text-xl font-bold text-primary">SnapDo</h1>
                    <button className="p-2 text-gray-500">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-3xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
