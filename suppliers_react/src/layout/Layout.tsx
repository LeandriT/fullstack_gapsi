import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import './layout.css';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
