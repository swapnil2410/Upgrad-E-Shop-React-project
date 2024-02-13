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
