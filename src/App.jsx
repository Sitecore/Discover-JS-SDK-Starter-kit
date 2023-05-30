import { WidgetsProvider } from '@sitecore-discover/react';
import { createTheme } from '@sitecore-discover/ui';
import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import TopMenu from './components/TopMenu';
import { BASE_PATH } from './helpers/constants';
import { CartProvider } from './hooks/cart';
// eslint-disable-next-line import/extensions
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'react-notifications-component/dist/theme.css';
import './App.css';
import { WishlistProvider } from './hooks/wishlist';

const HomeView = lazy(() => import('./views/Home'));
const ProductDetailView = lazy(() => import('./views/Product/Detail'));
const CartView = lazy(() => import('./views/Cart/Cart'));
const OrderView = lazy(() => import('./views/Order'));
const NotFoundView = lazy(() => import('./views/pages/404'));
const InternalServerErrorView = lazy(() => import('./views/pages/500'));
const SearchView = lazy(() => import('./views/SearchView'));
const CategoryView = lazy(() => import('./views/CategoryView'));
const WishlistView = lazy(() => import('./views/Wishlist'));

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return children;
};

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const { style, setStyle } = createTheme({
    typography: {
      fontFamilySystem: '"Source Sans Pro", sans-serif',
    },
    palette: {
      primary: {
        main: '#43474c',
        light: '#f1f2f3',
        dark: '#0d0d0d',
      },
    },
  });
  const bodyElement = document.body;
  setStyle(bodyElement, style);

  return (
    <WidgetsProvider
      env={process.env.REACT_APP_ENV}
      customerKey={process.env.REACT_APP_CUSTOMER_KEY}
      apiKey={process.env.REACT_APP_API_KEY}
      useToken
    >
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter basename={BASE_PATH}>
            <ScrollToTop>
              <div>
                <Header />
                <TopMenu />
                <Suspense fallback={<div className="text-white text-center mt-3">Loading...</div>}>
                  <Routes>
                    <Route exact path="/" element={<HomeView />} />
                    <Route exact path="/search" element={<SearchView />} />
                    <Route exact path="/category/*" element={<CategoryView />} />
                    <Route exact path="/product/*/:sku" element={<ProductDetailView />} />
                    <Route exact path="/cart" element={<CartView />} />
                    <Route exact path="/order/confirmation" element={<OrderView />} />
                    <Route exact path="/500" element={<InternalServerErrorView />} />
                    <Route exact path="/account/wishlist" element={<WishlistView />} />
                    <Route path="/notfound" element={<NotFoundView />} />
                    <Route path="*" element={<Navigate to="/notfound" />} />
                  </Routes>
                </Suspense>
                <Footer />
              </div>
            </ScrollToTop>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </WidgetsProvider>
  );
}

export default App;
