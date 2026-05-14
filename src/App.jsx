import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'

import Sales from './pages/Sales'
import Sell from './pages/Sell'
import Products from './pages/Products'

import Dashboard from './pages/Dashboard'
import PrimaryLayout from './PrimaryLayout'
import './App.css'



function App() {
  const PrimaryRouter = createBrowserRouter([
    {
      path: "/",
      element: <PrimaryLayout />,
      children: [
      {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/comprobantes",
          element: <Sales />
        },
        {
          path: "/productos",
          element: <Products />
        },
        {
          path: "/vender",
          element: <Sell />
        },
        {
          path: "/configuracion",
          element: <Settings />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={PrimaryRouter} />
    </>
  )
}

export default App
