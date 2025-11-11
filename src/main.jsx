import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layout/RootLayout.jsx';
import Home from './pages/Home.jsx';
import AllReviews from './pages/AllReviews.jsx';
import TopReviews from './components/TopReviews/TopReviews.jsx';
import FoodCardDetails from './components/FoodCardDetails/FoodCardDetails.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import PrivateRoute from './context/PrivateRoute.jsx';
import AddReview from './pages/AddReview.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch('/herosliderdata.json'),
      },
      {
        path: 'allReviews',
        Component: AllReviews,
        loader: () => fetch('http://localhost:3000/allReviews')
      },
      {
        path: 'foodCardDetails/:id',
        Component: FoodCardDetails,
        loader: () => fetch('http://localhost:3000/allReviews')
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'addReview',
        element: <PrivateRoute>
          <AddReview></AddReview>
        </PrivateRoute>
      },
      {
        path: '/*',
        element: <h2>Error404</h2>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
