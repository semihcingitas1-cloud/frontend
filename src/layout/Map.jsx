import React from 'react';

const Map = ({ address = "Emlak Konut Dükkanları B/2 No:46 Merkez/Nevşehir" }) => {

  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const logoPath = "/apple-touch-icon.png";

  return (

    <div className='w-full lg:w-1/2 flex flex-col items-center gap-4'>

      <div className='text-md md:text-lg font-medium text-center bg-gray-50 p-3 rounded-xl w-full border border-gray-200 text-gray-700 shadow-sm'>📍 {address}</div>

      <div className='w-full h-72 lg:h-[400px] overflow-hidden rounded-2xl border-2 border-gray-100 shadow-2xl relative group'>

        <iframe className='w-full h-full' src={mapUrl} style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Dinamik Konum Haritası" ></iframe>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[110%] pointer-events-none flex flex-col items-center">

          <div className="w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-2 border-rose-500 overflow-hidden mb-[-4px] z-10 transition-transform group-hover:scale-110">

            <img src={logoPath} alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/67/67347.png" }} />

          </div>

          <div className="w-5 h-5 bg-rose-500 rotate-45 shadow-lg"></div>
          <div className="w-8 h-2 bg-black/20 rounded-[100%] blur-sm mt-1"></div>

        </div>

      </div>

    </div>

  );
};

export default Map;