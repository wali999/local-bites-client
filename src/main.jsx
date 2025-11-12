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
import Error404 from './components/Error/Error404.jsx';
import MyReviews from './pages/MyReviews.jsx';
import EditReview from './pages/EditReview.jsx';


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
        loader: ({ params }) => fetch(`http://localhost:3000/allReviews/${params.id}`)
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
        path: 'myReviews',
        element: <PrivateRoute>
          <MyReviews></MyReviews>
        </PrivateRoute>
      },
      {
        path: 'editReview/:id',
        element: <PrivateRoute>
          <EditReview></EditReview>
        </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/allReviews/${params.id}`)
      },

      {
        path: '/*',
        element: <Error404></Error404>
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
