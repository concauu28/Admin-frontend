import React from 'react';
import ReactDOM from 'react-dom/client';
import { useParams } from 'react-router-dom';
import './style/global.css';
import App from './App';
import RegisterPage from './pages/register';
import UserPage from './pages/user';
import HomePage from './pages/home';
import CustomerProfle from './pages/customerprofile'
import AddCustomer from './pages/addcustomer';
import AddRequest from './pages/addRequest';
import RequestPage from './pages/request';
import ServicePage from './pages/addservice';
import ReportPage from './pages/report';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LoginPage from './pages/login';
import { AuthWrapper } from './component/context/auth.context';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: "user",
        element: <UserPage/>,
      },
      {
        path: "profile/:email",
        element: <CustomerProfle />,
      },
      {
        path: "addcustomer",
        element: <AddCustomer />,
      },
      {
        path: "addrequest",
        element: <AddRequest />,
      },
      {
        path: "request",
        element: <RequestPage />,
      },
      {
        path: "addservice",
        element: <ServicePage />,
      },
      {
        path: "report",
        element: <ReportPage />,
      },
      {
        path: "register",
        element: <RegisterPage/>,
      },
    ]
  },

  {
    path: "login",
    element: <LoginPage/>,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthWrapper>
    <RouterProvider router={router} />
    </AuthWrapper>
  
  </React.StrictMode>
);

