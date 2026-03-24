import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import CookieConsent from '@/components/layout/CookieConsent';
import Home from '@/pages/Home';
import Servicos from '@/pages/Servicos';
import Sobre from '@/pages/Sobre';
import Faq from '@/pages/Faq';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import PortfolioPage from '@/pages/PortfolioPage';
import PlanosPage from '@/pages/PlanosPage';

function App() {
  return (
    <div className='overflow-x-clip'>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/portfolio' element={<PortfolioPage />} />
        <Route path='/planos' element={<PlanosPage />} />
        <Route path='/servicos' element={<Servicos />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/privacidade' element={<Privacy />} />
        <Route path='/termos' element={<Terms />} />
      </Routes>
      <CookieConsent />
    </div>
  );
}

export default App;
