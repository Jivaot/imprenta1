import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import { fetchProducts, selectCatalogStatus } from '../store/slices/productsSlice';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const status = useSelector(selectCatalogStatus);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {status === 'loading' ? (
        <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-gradient-to-r from-[#38bdf8] via-[#f59e0b] to-[#22c55e]" />
      ) : null}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,_rgba(15,140,147,0.18),_transparent_34%)]" />
      <div className="pointer-events-none fixed right-[-5rem] top-24 -z-10 h-72 w-72 rounded-full bg-[#ffd9a8]/50 blur-3xl animate-herobg" />
      <div className="pointer-events-none fixed left-[-5rem] bottom-12 -z-10 h-80 w-80 rounded-full bg-[#ccefed]/60 blur-3xl animate-herobg" />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
