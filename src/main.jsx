import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CookieProvider from './contexts/CookieProvider';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles/index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <CookieProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster position='top-center' reverseOrder={false} />
    </CookieProvider>
  </StrictMode>,
);

// Sinaliza ao vite-plugin-prerender que o conteudo esta pronto para captura
document.dispatchEvent(new Event('prerender-ready'));
