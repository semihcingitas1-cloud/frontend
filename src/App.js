import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import  'slick-carousel/slick/slick.css';
import  'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import MyOrders from './pages/MyOrders';
import Products from './pages/Products';
import Detail from './pages/Detail';

import Cart from './pages/Cart';
import Favorite from './pages/Favorite';

import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';

import UpdateProductPage from './pages/admin/UpdateProductPage';

import Page404 from './pages/Page404';

import Header from './layout/Header';
import HeaderSticky from './layout/HeaderSticky';
import Footer from './layout/Footer';
import ProtectedRout from './components/ProtectedRout';

import { profile } from './redux/userSlice';
import { getSiteSettings } from './redux/settingsSlider';

import AnalyticsAdmin from './pages/admin/AnalyticsAdmin';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import MessagesAdmin from './pages/admin/MessagesAdmin';
import SliderAdmin from './pages/admin/SliderAdmin';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

import ChatWindow from './pages/ChatWindow';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import BlogsAdmin from './pages/admin/BlogsAdmin';
import CategoryAdmin from './pages/admin/CategoryAdmin';
import Maintenance from './pages/Maintenance';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PaymentNotif from './pages/PaymentNotif';

import SalesAgreement from './pages/agreement/SalesAgreement';
import ReturnPolicy from './pages/agreement/ReturnPolicy';
import PrivacyPolicy from './pages/agreement/PrivacyPolicy';
import MailAdmin from './pages/admin/MailAdmin';
import FlowerBuilder from './pages/FlowerBuilder';


function App() {

  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();
  const { user, isAuth } = useSelector(state => state.user);
  const { isStoreOpen } = useSelector(state => state.settings);

  useEffect(() => {

    dispatch(getSiteSettings());
    dispatch(profile())
  },[dispatch])

  const isMaintenance = false;

  if (isMaintenance && user?.user?.role !== 'admin') {
    return <Maintenance />;
  }

  return (

    <Router>

      {!isStoreOpen && ( <div className="bg-red-600 text-white text-center py-2 text-[11px] font-black uppercase tracking-widest sticky top-0 z-[9999] shadow-md animate-pulse">⚠️ Mağazamız geçici olarak yeni siparişlere kapalıdır</div> )}

      <Header />
      <HeaderSticky />

      <Routes>

        <Route exact path='/' element={<Home />} />

        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/favorite' element={<Favorite />} />

        <Route exact path='/auth' element={<Auth />} />
        <Route exact path='/forgotpassword' element={<ForgotPassword />} />
        <Route exact path='/reset/:token' element={<ResetPassword />} />

        <Route exact path='/payment' element={<Payment />} />
        <Route exact path='/paymentsuccess' element={<PaymentSuccess />} />

        <Route element={<ProtectedRout isAdmin={false} />}>

          <Route exact path='/profile' element={<Profile />} />
          <Route exact path="/orders/me" element={<MyOrders />} />

        </Route>

        <Route element={<ProtectedRout isAdmin={true} user={user} />}>

          <Route exact path='/admin/analyticsadmin' element={<AnalyticsAdmin />} />
          <Route exact path='/admin/dashboardadmin' element={<DashboardAdmin />} />
          <Route exact path='/admin/ordersadmin' element={<OrdersAdmin />} />
          <Route exact path='/admin/messagesadmin' element={<MessagesAdmin />} />
          <Route exact path='/admin/blogsadmin' element={<BlogsAdmin />} />
          <Route exact path='/admin/slideradmin' element={<SliderAdmin />} />
          <Route exact path='/admin/productsadmin' element={<ProductsAdmin />} />
          <Route exact path='/admin/settingsadmin' element={<SettingsAdmin />} />
          <Route exact path="/admin/categoriesadmin" element={<CategoryAdmin />} />
          <Route exact path="/admin/mailadmin" element={<MailAdmin />} />

          <Route exact path='/admin/update/:id' element={<UpdateProductPage />} />

        </Route>
        
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/product/:id' element={<Detail />} />
        <Route exact path='/flowerbuilder' element={<FlowerBuilder />} />
        <Route exact path='/blog' element={<Blog />} />
        <Route exact path='/blog/:slug' element={<BlogDetail />} />

        <Route exact path='/sss' element={<FAQPage />} />
        <Route exact path='/contact' element={<ContactPage />} />
        <Route exact path='/about' element={<AboutPage />} />
        <Route exact path='/paymentnotif' element={<PaymentNotif />} />
        <Route exact path='/maintenance' element={<Maintenance />} />

        <Route exact path='/mesafelisatis' element={<SalesAgreement />} />
        <Route exact path='/iadepolitikasi' element={<ReturnPolicy />} />
        <Route exact path='/gizliliksozlesmesi' element={<PrivacyPolicy />} />

        <Route path='*' element={<Page404 />} />

      </Routes>

      {user?.user?.role !== 'admin' && <ChatWindow user={user} />}

      <Footer />

    </Router>
  
  );
};

export default App;