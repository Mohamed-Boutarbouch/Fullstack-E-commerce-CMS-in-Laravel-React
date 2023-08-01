import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import CreateStorePage from '@/pages/CreateStorePage';
import Settings from '@/pages/Settings';
import PageNotFound from '@/pages/PageNotFound';
import AppLayout from '@/components/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import LogIn from '@/pages/LogIn';
import Register from '@/pages/Register';
import Overview from '@/pages/Overview';
import Billboards from '@/pages/Billboards/Billboards';
import Billboard from '@/pages/Billboards/Billboard';
import NewBillboard from '@/pages/Billboards/NewBillboard';
import Products from '@/pages/Products';
import Categories from '@/pages/Categories';
import Colors from '@/pages/Colors';
import Sizes from '@/pages/Sizes';
import Orders from '@/pages/Orders';
import ThemeProvider from '@/context/ThemeProvider';
import { ModalProvider } from '@/context/ModalContext';
import BillboardHeader from './components/PageHeaders/BillboardHeader';

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />

          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path=":storeId/billboards" element={<BillboardHeader />}>
                  <Route index element={<Billboards />} />
                  <Route path="new" element={<NewBillboard />} />
                  <Route path=":billboardId" element={<Billboard />} />
                </Route>
                <Route path=":storeId/overview" element={<Overview />} />
                <Route path=":storeId/billboards" element={<Billboards />} />
                <Route path=":storeId/categories" element={<Categories />} />
                <Route path=":storeId/colors" element={<Colors />} />
                <Route path=":storeId/sizes" element={<Sizes />} />
                <Route path=":storeId/orders" element={<Orders />} />
                <Route path=":storeId/products" element={<Products />} />
                <Route path=":storeId/settings" element={<Settings />} />
              </Route>

              <Route path="/" element={<CreateStorePage />} />
              <Route path="register" element={<Register />} />
              <Route path="log-in" element={<LogIn />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="bottom-center"
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: '16px',
                maxWidth: '500px',
                padding: '16px 24px',
                backgroundColor: 'var(--color-grey-0)',
                color: 'var(--color-grey-700)',
              },
            }}
          />
        </QueryClientProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}
