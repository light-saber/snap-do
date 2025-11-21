import React from 'react';
import { Sparkles, ArrowRight, Clock, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export function SmartWidget({ tasks }) {
    // Logic: Filter uncompleted. Prioritize Urgent + Quick Win. If none, High Priority.
    const uncompletedTasks = tasks.filter(t => !t.completed);

    const bestTask = uncompletedTasks.find(t => t.priority === 'Urgent' && t.effort === 'Quick Win') ||
        uncompletedTasks.find(t => t.priority === 'Urgent') ||
        uncompletedTasks.find(t => t.priority === 'High') ||
        uncompletedTasks[0];

    if (!bestTask) return null;

    return (
        <div className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-24 h-24" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-blue-100 text-sm font-medium uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    Do This Now
                </div>

                <h3 className="text-2xl font-bold mb-2 line-clamp-1">{bestTask.title}</h3>

                <div className="flex items-center gap-4 text-blue-50 text-sm mb-4">
                    <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                        {bestTask.source}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {bestTask.effort}
                    </span>
                </div>

                <p className="text-blue-100 text-sm line-clamp-2 mb-4 bg-black/10 p-3 rounded-lg border border-white/5">
                    "{bestTask.context}"
                </p>
            </div>
        </div>
    );
}
