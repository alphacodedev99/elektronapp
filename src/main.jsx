import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// pages
import HomePage from './pages/HomePage.jsx';
import ErrorPage from './pages/ErrorPage.jsx'
import SingleProductPage from './pages/SingleProductPage.jsx'
import CartPage from './pages/CartPage.jsx'

// Clerk
import { ClerkProvider } from '@clerk/clerk-react'
import { Provider } from 'react-redux'
import store from './store/store.js'
import FavoritePage from './pages/FavoritePage.jsx'
import AuthGuarding from './utils/AuthGuarding.jsx'



// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/singleProduct/:id',
        element: <AuthGuarding>
          <SingleProductPage />
        </AuthGuarding>
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/favorite',
        element: <FavoritePage />
      }
    ]
  },
])





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </ClerkProvider>
  </React.StrictMode>,
)
