import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import RootLayout from './pages/root/root';
import Error404 from './pages/Error404/404';
import SignUpForm from './pages/signup/signup';
import ProtectedRoute from './common/util/ProtectedRoute';
import { tokenLoader } from './common/util/checkAuth';
import ProductDetails from './pages/productDetails/productDetails';
import Order from './pages/orderProduct/order';
import AddProductForm from './pages/addProduct/addProduct';

const router = createBrowserRouter([
  {
    path: '/',
    
    element: <RootLayout />,
    errorElement: <Error404 />,

    children: [
      {
        path: '/', element: <ProtectedRoute> <Home /></ProtectedRoute>,
        id: 'root',
        loader: tokenLoader,
      },
      { path: '/auth', element: <Login /> },
      { path: '/sign-up', element: <SignUpForm /> },
      { path: '/product-details', element: <ProtectedRoute><ProductDetails /></ProtectedRoute>,
      id: 'product-details-root',
       loader: tokenLoader,
      },
      { path: '/order-details', element: <ProtectedRoute><Order /></ProtectedRoute>,
      id: 'order-details-root',
       loader: tokenLoader,
      },
      { path: '/add-product', element: <ProtectedRoute><AddProductForm /></ProtectedRoute>,
      id: 'add-product-root',
       loader: tokenLoader,
      },
    ]
  },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);

reportWebVitals();
