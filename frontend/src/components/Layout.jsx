import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
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
        <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-gradient-to-r from-[#6dc8ef] via-[#3f97d4] to-[#173a63]" />
      ) : null}
      
      {/* Fondo animado mejorado */}
      {/* Blob superior izquierda - Azul claro */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.16),_transparent_34%)]" />
      
      {/* Blob derecha superior - Cyán */}
      <div className="pointer-events-none fixed right-[-5rem] top-24 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-[#00ccff] to-[#0066ff] opacity-20 blur-3xl animate-herobg" />
      
      {/* Blob izquierda inferior - Azul cielo */}
      <div className="pointer-events-none fixed left-[-5rem] bottom-12 -z-10 h-80 w-80 rounded-full bg-gradient-to-tr from-[#0066ff] to-[#cfe8ff] opacity-15 blur-3xl animate-herobg" />
      
      {/* Blob adicional derecha inferior - Azul oscuro */}
      <div className="pointer-events-none fixed right-[-8rem] bottom-[-4rem] -z-10 h-96 w-96 rounded-full bg-[#001a99] opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* Blob adicional centro - Cyán suave */}
      <div className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 -z-10 h-64 w-64 rounded-full bg-[#00ccff] opacity-8 blur-3xl" style={{ animation: 'float 15s ease-in-out infinite' }} />
      
      <Header />
      <main>{children}</main>
      <Footer />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
      `}</style>
    </div>
  );
}
