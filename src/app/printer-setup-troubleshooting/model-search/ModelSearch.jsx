"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ModelSearch = () => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === "") {
            setError("Please enter your product name.");
            return;
        }
        localStorage.setItem('modelSearchInput', input.trim());
        setError("");
        router.push('/printer-setup-troubleshooting/complete-setup');
    };

    return (
        <div className="w-full min-h-screen bg-white flex flex-col">
            <section
                className="w-full min-h-[420px] flex items-center justify-center relative overflow-hidden"
                style={{ height: '420px' }}
            >
                <picture>
                    <source srcSet="/hero_background_image.webp" type="image/webp" />
                    <img
                        src="/hero_background_image.webp"
                        alt=""
                        width="1920"
                        height="433"
                        fetchPriority="high"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
                    />
                </picture>
                <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col lg:flex-row items-center lg:justify-between justify-start relative z-10 h-full">
                    <div className="flex flex-col justify-center h-full w-full max-w-[700px] lg:w-[60%] pt-8 md:pt-0" id="model-search-main-content">
                        <h1 className="text-white text-2xl sm:text-3xl md:text-[2.7rem] font-normal mb-6 md:mb-8 leading-tight drop-shadow-lg">Set up your printer</h1>
                        <p className="text-white text-base sm:text-lg md:text-xl mb-6 md:mb-8 font-normal leading-snug drop-shadow">
                            Enter your product name and model number to get the right smart software
                            and drivers for you
                        </p>
                        <form className="flex flex-col lg:flex-row items-center w-full max-w-[600px] gap-3 lg:gap-0" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder='Enter your product name here. For example: "OfficeJet 9010"'
                                className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg bg-white shadow-sm w-full min-w-0"
                            />
                            <button
                                type="submit"
                                className="lg:ml-4 ml-0 bg-white text-blue-700 font-semibold px-8 py-3 rounded-full text-base sm:text-lg shadow hover:bg-blue-50 transition w-full lg:w-auto min-w-[120px]"
                            >
                                Search
                            </button>
                        </form>
                        {error && <div className="text-red-500 text-sm mt-2 text-left">{error}</div>}
                    </div>
                    
                    <div className="hidden lg:flex w-[35%] h-full items-center justify-center z-10 pointer-events-none">
                        <img
                            src="/printer-without-bg.png"
                            alt="Printer and Devices"
                            className="w-full max-w-[360px] h-auto max-h-[180px] object-contain drop-shadow-xl"
                        />
                    </div>
                </div>
            </section>
            
            <div className="w-full max-w-[1200px] mx-auto mt-8 md:mt-[12vh] px-4 flex md:flex-row flex-col items-start justify-between relative">
                <div className="flex flex-col w-full max-w-[700px]">
                    <p className="text-gray-700 text-base sm:text-[1.05rem] md:text-[1.15rem] mb-4 md:mb-6">
                        Install smart software and drivers on each mobile device or computer that you want to print from. Add the printer on the new device.
                    </p>
                    <p className="text-gray-700 text-base sm:text-[1.05rem] md:text-[1.15rem]">
                        Need additional help with set-up? Visit{' '}
                        <a href="#" className="text-blue-600 underline hover:text-blue-800" aria-label="HP support">support</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModelSearch;