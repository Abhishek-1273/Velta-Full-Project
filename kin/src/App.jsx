import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { WishlistProvider, AuthProvider, SearchProvider } from './contexts';
import { SettingsProvider } from './contexts/SettingsContext';
import AppRoutes from './routes';
import ScrollToTop from './components/common/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';
import PageLoader from './components/common/PageLoader';
import './styles/globals.css';
import SuccessToast from './components/common/AuthModal/SuccessToast';
import { Analytics } from '@vercel/analytics/react';
import PwaInstallPrompt from './components/common/PwaInstallPrompt';

const App = () => {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SettingsProvider>
          <AuthProvider>
            <WishlistProvider>
              <SearchProvider>
                <ErrorBoundary>
                  {/* Initial 5-sec splash spinner — only on first load */}
                  {!loaderDone && (
                    <PageLoader onDone={() => setLoaderDone(true)} />
                  )}
                  {/* Mount routes + context-dependent components only after loader finishes */}
                  {loaderDone && (
                    <>
                      <AppRoutes />
                      <PwaInstallPrompt />
                      <SuccessToast />
                    </>
                  )}
                  {/* Analytics context pe depend nahi karta — hamesha fire hota hai */}
                  <Analytics />
                </ErrorBoundary>
              </SearchProvider>
            </WishlistProvider>
          </AuthProvider>
        </SettingsProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
