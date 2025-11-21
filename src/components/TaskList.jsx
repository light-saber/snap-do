import React from 'react';
import { Check, MessageSquare, Mail, MessageCircle, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

const SourceIcon = ({ source }) => {
    switch (source) {
        case 'Slack': return <MessageSquare className="w-4 h-4 text-purple-500" />;
        case 'Email': return <Mail className="w-4 h-4 text-blue-500" />;
        case 'WhatsApp': return <MessageCircle className="w-4 h-4 text-green-500" />;
        case 'Note': return <FileText className="w-4 h-4 text-gray-500" />;
        default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
};

const PriorityBadge = ({ priority }) => {
    const colors = {
        Urgent: 'bg-red-100 text-red-700',
        High: 'bg-orange-100 text-orange-700',
        Normal: 'bg-gray-100 text-gray-700',
    };

    return (
        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", colors[priority])}>
            {priority}
        </span>
    );
};

export function TaskList({ tasks, onToggleTask }) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                <p>No tasks yet. Drop a file to start!</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={cn(
                        "group flex items-start gap-3 p-4 rounded-xl bg-surface border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md",
                        task.completed && "opacity-50 bg-gray-50"
                    )}
                >
                    <button
                        onClick={() => onToggleTask(task.id)}
                        className={cn(
                            "mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                            task.completed
                                ? "bg-primary border-primary text-white"
                                : "border-gray-300 hover:border-primary"
                        )}
                    >
                        {task.completed && <Check className="w-3 h-3" />}
                    </button>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={cn(
                                "font-medium text-text truncate",
                                task.completed && "line-through text-gray-500"
                            )}>
                                {task.title}
                            </h4>
                            <PriorityBadge priority={task.priority} />
                        </div>

                        {task.context && (
                            <p className={cn(
                                "text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block mb-2 font-medium",
                                task.completed && "line-through text-gray-400 bg-transparent px-0"
                            )}>
                                {task.context}
                            </p>
                        )}

                        <div className="flex items-center gap-3 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                                <SourceIcon source={task.source} />
                                <span>{task.source}</span>
                            </div>
                            <span>•</span>
                            <span>{task.effort}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
