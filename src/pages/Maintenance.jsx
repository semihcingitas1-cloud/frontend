import React from 'react';
import { CiSettings } from "react-icons/ci";

const Maintenance = () => {

    return (

        <div className="h-screen w-full flex flex-col items-center justify-center bg-white p-5 text-center">

            <div className="relative mb-6">

                <CiSettings size={100} className="text-rose-500 animate-spin-slow" />
                <div className="absolute top-0 right-0 animate-bounce">🌸</div>

            </div>

            <h1 className="text-4xl font-black text-gray-800 mb-4 tracking-tight">Size Daha İyi Hizmet İçin Bakımdayız</h1>

            <p className="text-gray-500 max-w-md leading-relaxed">

                Flora Haven'ı sizin için güzelleştiriyoruz. Kısa bir süre sonra en taze çiçeklerimizle tekrar burada olacağız.

            </p>

            <div className="mt-8 px-6 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-bold border border-rose-100 uppercase tracking-widest">Çok Yakında Dönüyoruz</div>

        </div>

    );
};

export default Maintenance;