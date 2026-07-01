"use client";
import { Suspense } from 'react';

export default function AdminLayout({ children }) {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            {children}
        </Suspense>
    );
}
