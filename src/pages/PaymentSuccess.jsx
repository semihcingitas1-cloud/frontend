'use client'
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import InvoiceDocument from './InvoiceDocument';

const Success = () => {

    const location = useLocation();
    const paymentData = location.state?.paymentData;

    if (!paymentData) return <div className="p-10 text-center">Sipariş bilgisi bulunamadı.</div>;

    return (

        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">

            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">

                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">✓</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Ödeme Başarılı!</h1>
                <p className="text-gray-600 mb-6">Siparişiniz alındı. Ödeme ID: <br/> 
                    <span className="font-mono text-sm text-blue-600">{paymentData.paymentId}</span>
                </p>

                <div className="space-y-3">

                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">📄 Faturayı İndir (PDF)</button>
                    <Link to="/" className="block text-sm text-gray-500 hover:text-gray-800 underline">Anasayfaya Dön</Link>

                </div>

            </div>

        </div>
    );
};

export default Success;