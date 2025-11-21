import React, { useState, useCallback } from 'react';
import { Upload, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { cn } from '../lib/utils';

export function DropZone({ onTaskGenerated }) {
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processImage = async (file) => {
        setIsProcessing(true);
        setProgress(0);
        setStatus('Initializing OCR...');

        try {
            const worker = await createWorker();

            setStatus('Recognizing text...');
            const { data: { text } } = await worker.recognize(file);

            setStatus('Parsing tasks...');
            await worker.terminate();

            const lines = text.split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 3); // Filter out noise

            if (lines.length === 0) {
                throw new Error("No text found in image");
            }

            // Generate a task for each line
            lines.forEach((line, index) => {
                const lowerLine = line.toLowerCase();

                // 1. Smarter Source Detection
                let source = 'Note';
                if (lowerLine.includes('slack')) source = 'Slack';
                else if (lowerLine.includes('whatsapp')) source = 'WhatsApp';
                else if (lowerLine.includes('email') || lowerLine.includes('gmail')) source = 'Email';

                // 2. Priority Detection
                const isUrgent = lowerLine.includes('urgent') || lowerLine.includes('asap') || lowerLine.includes('now');
                const priority = isUrgent ? 'Urgent' : 'Normal';

                // 3. Effort Detection
                const effort = line.length < 50 ? 'Quick Win' : 'Deep Work';

                // 4. Context (Simplified)
                let context = "";
                if (lowerLine.includes('call') || lowerLine.includes('contact')) {
                    context = "Phone Call";
                } else if (lowerLine.includes('order') || lowerLine.includes('buy')) {
                    context = "Shopping";
                }

                const newTask = {
                    id: Date.now().toString() + index,
                    title: line,
                    source: source,
                    context: context,
                    priority: priority,
                    effort: effort,
                    completed: false,
                    createdAt: new Date(),
                };

                // Stagger the addition slightly for visual effect
                setTimeout(() => {
                    onTaskGenerated(newTask);
                }, index * 300);
            });

        } catch (error) {
            console.error("OCR Error:", error);
            // Fallback to mock if OCR fails completely
            const newTask = {
                id: Date.now().toString(),
                title: "Could not read text from image",
                source: "System",
                context: "Please try a clearer image",
                priority: "High",
                effort: "Quick Win",
                completed: false,
                createdAt: new Date(),
            };
            onTaskGenerated(newTask);
        } finally {
            setIsProcessing(false);
            setProgress(0);
            setStatus('');
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            processImage(files[0]);
        }
    }, [onTaskGenerated]);

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
                "relative w-full h-48 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden mb-8",
                isDragging
                    ? "border-primary bg-blue-50 scale-[1.02]"
                    : "border-gray-300 bg-surface hover:border-primary/50 hover:bg-gray-50",
                isProcessing && "border-none bg-surface cursor-wait"
            )}
        >
            {isProcessing ? (
                <div className="flex flex-col items-center animate-in fade-in duration-300 w-full max-w-xs px-4">
                    <div className="relative mb-4">
                        <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                        <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full animate-pulse" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-2">{status}</p>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '60%' }} />
                    </div>
                </div>
            ) : (
                <>
                    <div className={cn(
                        "p-4 rounded-full bg-gray-100 mb-3 transition-colors",
                        isDragging && "bg-blue-100 text-primary"
                    )}>
                        <Upload className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-base font-medium text-gray-700 mb-1">
                        Drop screenshot to scan text...
                    </p>
                    <p className="text-xs text-gray-400">
                        Supports PNG, JPG, WebP
                    </p>
                </>
            )}
        </div>
    );
}
