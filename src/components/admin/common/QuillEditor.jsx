'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(
    () => import('react-quill-new'),
    { ssr: false, loading: () => <div className="bg-slate-50 rounded-2xl h-40 animate-pulse" /> }
);

export default function QuillEditor({ value, onChange, modules, placeholder }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <div className="bg-slate-50 rounded-2xl h-40" />;

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            placeholder={placeholder}
        />
    );
}
