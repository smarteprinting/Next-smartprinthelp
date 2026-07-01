"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function SetupProgressModal({ open, onClose, onError }) {
    const modalRef = useRef(null);
    const [activeStep, setActiveStep] = useState(0);
    const [modelSearch, setModelSearch] = useState('Printer');

    const [stepStates, setStepStates] = useState([
        {
            label: 'Checking Device Compatibility',
            right: 'Verified',
            progress: 0,
            status: '',
        },
        {
            label: 'Downloading Drivers (64-bit)',
            right: 'Completed (145 MB)',
            progress: 0,
            status: '',
        },
        {
            label: 'Installing Package...',
            right: 'Initializing Installation...',
            progress: 0,
            status: '',
        }
    ]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('modelSearchInput') || 'Printer';
            setModelSearch(stored);
        }
    }, [open]);

    // Animate the progress steps
    useEffect(() => {
        if (!open) return;
        
        setActiveStep(0);
        
        // Reset steps
        setStepStates([
            {
                label: 'Checking Device Compatibility',
                right: 'Verified',
                progress: 0,
                status: '',
            },
            {
                label: `Downloading Drivers for ${modelSearch} (64-bit)`,
                right: 'Completed (145 MB)',
                progress: 0,
                status: '',
            },
            {
                label: 'Installing Package...',
                right: 'Initializing Installation...',
                progress: 0,
                status: '',
            }
        ]);

        let timers = [];

        function animateStep(idx) {
            setActiveStep(idx);
            setStepStates((prev) =>
                prev.map((s, i) =>
                    i < idx
                        ? { ...s, progress: 100, status: 'done' }
                        : i === idx
                        ? { ...s, progress: 0, status: 'active' }
                        : { ...s, progress: 0, status: '' }
                )
            );

            let prog = 0;
            let stepIntervalTime = 30; 
            let stepIncrement = 5;      

            if (idx === 0) {
                // Step 1: ~1.5s
                stepIntervalTime = 30;
                stepIncrement = 2; 
            } else if (idx === 1) {
                // Step 2: ~5.0s (authenticity download duration)
                stepIntervalTime = 50;
                stepIncrement = 1; 
            } else if (idx === 2) {
                // Step 3: ~3.0s to get to 60%
                stepIntervalTime = 50;
                stepIncrement = 1; 
            }

            const interval = setInterval(() => {
                prog += stepIncrement;
                setStepStates((prev) =>
                    prev.map((s, i) =>
                        i === idx ? { ...s, progress: Math.min(prog, 100), status: 'active' } : s
                    )
                );

                if (idx === 2 && prog >= 60) {
                    clearInterval(interval);
                    setStepStates((prev) =>
                        prev.map((s, i) =>
                            i === idx ? { ...s, progress: 60, status: 'active' } : s
                        )
                    );
                    timers.push(setTimeout(() => {
                        if (onError) onError();
                    }, 6000)); 
                } else if (prog >= 100) {
                    clearInterval(interval);
                    setStepStates((prev) =>
                        prev.map((s, i) =>
                            i === idx ? { ...s, progress: 100, status: 'done' } : s
                        )
                    );
                    if (idx < 2) {
                        timers.push(setTimeout(() => animateStep(idx + 1), 700));
                    }
                }
            }, stepIntervalTime);
            timers.push(interval);
        }

        timers.push(setTimeout(() => animateStep(0), 400));
        return () => timers.forEach(clearInterval);
    }, [open, modelSearch, onError]);

    useEffect(() => {
        if (open && modalRef.current) {
            modalRef.current.classList.remove('opacity-0', 'scale-95');
            modalRef.current.classList.add('opacity-100', 'scale-100');
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2">
            <div
                ref={modalRef}
                className="transition-all duration-300 transform opacity-0 scale-95 bg-white rounded-3xl shadow-2xl w-full max-w-xl p-0 border border-gray-100 overflow-hidden"
            >
                {/* Title Bar with colored macOS buttons */}
                <div className="flex items-center px-8 py-5 border-b border-gray-100 bg-white">
                    <span className="text-xl text-gray-500 mr-2">⚙️</span>
                    <span className="font-semibold text-gray-700 text-lg tracking-wide">Device Setup Assistant</span>
                    <div className="flex gap-1.5 ml-auto">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                        <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                    </div>
                </div>

                <div className="px-10 py-8 bg-white">
                    {/* Authorized User Printer Icon Header */}
                    <div className="flex items-center mb-8">
                        <div className="bg-[#e6f0ff] rounded-2xl p-4 mr-4 flex items-center justify-center text-blue-600">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
                            </svg>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-gray-500 tracking-wide">Authorized User</div>
                        </div>
                    </div>

                    {/* Timeline steps */}
                    <div className="relative pl-12 space-y-8">
                        {/* Timeline line */}
                        <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gray-100"></div>

                        {stepStates.map((step, idx) => {
                            const isCompleted = idx < activeStep;
                            const isActive = idx === activeStep;

                            return (
                                <div key={idx} className="relative flex items-start gap-4">
                                    {/* Icon */}
                                    <div className="absolute -left-[44px] flex items-center justify-center z-10 bg-white">
                                        {isCompleted ? (
                                            <div className="w-8 h-8 rounded-full bg-[#e2fbe8] text-[#22c55e] flex items-center justify-center text-base font-bold shadow-sm border border-[#c6f6d5]">
                                                ✓
                                            </div>
                                        ) : isActive ? (
                                            <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin flex items-center justify-center">
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 text-gray-400 flex items-center justify-center text-sm font-semibold">
                                                {idx + 1}
                                            </div>
                                        )}
                                    </div>

                                    {/* Step Information */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className={`text-base font-semibold ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>
                                                {step.label}
                                            </span>
                                            {isCompleted && (
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e2fbe8] text-[#15803d]">
                                                    {idx === 0 ? 'Verified' : 'Completed (145 MB)'}
                                                </span>
                                            )}
                                        </div>

                                        {/* Progress bar */}
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                                                style={{ width: `${step.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
