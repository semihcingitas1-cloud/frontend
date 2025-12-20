import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flower2, Home, MoveLeft } from 'lucide-react';

const Page404 = () => {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen flex items-center justify-center p-4">

            <div className="max-w-2xl w-full text-center space-y-8">

                <div className="relative inline-block group">

                    <div className="absolute inset-0 bg-rose-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <Flower2 size={120} className="text-rose-300 mx-auto transform rotate-12 group-hover:rotate-45 transition-transform duration-700 ease-in-out" />
                    <div className="absolute -top-5 -right-5 bg-white px-4 py-1 rounded-full shadow-sm border border-rose-100 text-rose-500 font-bold rotate-12 text-3xl">404</div>

                </div>

                <div className="space-y-4">

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Aradığın sayfa <span className="text-rose-500">solmuş</span> olabilir.</h1>
                    <p className="text-gray-500 text-lg max-w-md mx-auto">Üzgünüz, gitmeye çalıştığın sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.</p>

                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">

                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-rose-200 text-rose-500 font-semibold hover:bg-rose-50 transition-colors w-full sm:w-auto justify-center"><MoveLeft size={20} />Geri Dön</button>

                    <Link to="/" className="flex items-center gap-2 px-8 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 shadow-lg shadow-rose-200 hover:shadow-xl hover:-translate-y-1 transition-all w-full sm:w-auto justify-center"><Home size={20} />Anasayfaya Git</Link>

                </div>

            </div>

        </div>
    );
};

export default Page404;