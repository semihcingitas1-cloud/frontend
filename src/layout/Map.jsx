import React from 'react';

const Map = () => {
  // Logonun yolu (public klasöründe olduğunu varsayıyoruz)
  const logoPath = "/MERNlogo1.png"; 

  return (
    <div className='w-full lg:w-1/2 flex flex-col items-center gap-4'>
      
      {/* Üst Adres Bilgi Çubuğu */}
      <div className='text-md md:text-lg font-medium text-center bg-gray-50 p-3 rounded-xl w-full border border-gray-200 text-gray-700 shadow-sm'> 
          📍 Emlak Konut Dükkanları B/2 No:46 Merkez/Nevşehir 
      </div>

      {/* Harita ve Üzerindeki Logo Pin */}
      <div className='w-full h-72 lg:h-[400px] overflow-hidden rounded-2xl border-2 border-gray-600 shadow-2xl relative group'>
        
        {/* Google Maps Ücretsiz Iframe */}
        <iframe 
          className='w-full h-full'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.145678!2d34.7144!3d38.6244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDM3JzI3LjgiTiAzNMKwNDInNTEuOCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Nevşehir Çiçekçi Konum"
        ></iframe>

        {/* CSS İLE YAPILMIŞ ÖZEL PİN (Haritanın Tam Ortasında Durur) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[110%] pointer-events-none flex flex-col items-center">
            
            {/* Logo Balonu */}
            <div className="w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-2 border-rose-500 overflow-hidden mb-[-4px] z-10 transition-transform group-hover:scale-110">
                <img 
                    src={logoPath} 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/67/67347.png" }} 
                />
            </div>
            
            {/* Pin'in Altındaki Üçgen Uç */}
            <div className="w-5 h-5 bg-rose-500 rotate-45 shadow-lg"></div>
            
            {/* Yerdeki Hafif Gölge */}
            <div className="w-8 h-2 bg-black/20 rounded-[100%] blur-sm mt-1"></div>
        </div>

      </div>
    </div>
  );
};

// Bu satırı sakın unutma, hata almana neden olan ana yer burasıdır.
export default Map;