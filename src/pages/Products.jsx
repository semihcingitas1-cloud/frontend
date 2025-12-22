import React, { useEffect, useState } from 'react';
import Filter from '../layout/Filter';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../redux/productSlice';
import ReactPaginate from 'react-paginate';
import { Loader2, AlertCircle } from 'lucide-react'; // İkonlar eklendi

const Products = () => {

    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);

    const { keyword } = useSelector(state => state.general);
    const [price, setPrice] = useState({ min: 0, max: 30000 });
    const [rating, setRating] = useState(0);
    const [category, setCategory] = useState("");
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 8;
    const currentItems = products?.products?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products?.products?.length / 8);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 8) % products?.products?.length;
        setItemOffset(newOffset);
        // Sayfa değişince yukarı kaydır
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        dispatch(getProducts({ keyword, price, rating, category }));
    }, [dispatch, keyword, price, rating, category]);

    return (
        <div className="min-h-screen bg-gray-50 py-6 md:py-10">
            
            <div className="container mx-auto px-4 max-w-[1440px]">
                
                {/* Ana Layout: Mobilde alt alta, Masaüstünde yan yana */}
                <div className="flex flex-col md:flex-row gap-8 relative">

                    {/* SOL PANEL: FİLTRE */}
                    {/* md:sticky ile masaüstünde kaydırırken sabit kalır */}
                    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 md:sticky md:top-4 h-fit z-20">
                        <Filter setPrice={setPrice} setRating={setRating} setCategory={setCategory} />
                    </aside>

                    {/* SAĞ PANEL: ÜRÜNLER */}
                    <main className="flex-1">
                        
                        {loading ? (
                            /* Yükleniyor Durumu */
                            <div className="flex flex-col items-center justify-center h-96 w-full">
                                <Loader2 className="w-12 h-12 text-rose-500 animate-spin mb-4" />
                                <span className="text-gray-500 font-medium">Ürünler yükleniyor...</span>
                            </div>
                        ) : (
                            <>
                                {/* Ürün Grid Yapısı */}
                                {products?.products && currentItems?.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {currentItems.map((product, i) => (
                                            <div key={i} className="flex justify-center">
                                                <ProductCard product={product} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    /* Ürün Bulunamadı Durumu */
                                    <div className="flex flex-col items-center justify-center w-full py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                        <AlertCircle className="w-16 h-16 text-gray-300 mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-700">Ürün Bulunamadı</h3>
                                        <p className="text-gray-500">Arama kriterlerinize uygun ürün yok.</p>
                                    </div>
                                )}

                                {/* Sayfalama (Pagination) */}
                                {pageCount > 1 && (
                                    <div className="mt-12 flex justify-center">
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel="Sonraki >"
                                            previousLabel="< Önceki"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={3}
                                            pageCount={pageCount}
                                            renderOnZeroPageCount={null}
                                            
                                            // Tailwind CSS Sınıfları
                                            containerClassName="flex items-center gap-2"
                                            pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-rose-500 transition-colors font-medium text-sm"
                                            activeLinkClassName="!bg-rose-500 !text-white !border-rose-500 shadow-md"
                                            previousLinkClassName="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium text-sm flex items-center"
                                            nextLinkClassName="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium text-sm flex items-center"
                                            breakLinkClassName="w-10 h-10 flex items-center justify-center text-gray-400"
                                            disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-white"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;


