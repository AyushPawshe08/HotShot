import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RedirectHandler from './pages/RedirectHandler';

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: '#0B1120',
        }}
      >
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/:shortcode" element={<RedirectHandler />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
