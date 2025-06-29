import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/home/Home.jsx'
import About from './components/about/About.jsx'
import Contact from './components/contactus/Contact.jsx'
import User from './components/user/User.jsx'
import Github from './components/github/Github.jsx'

const router=createBrowserRouter([
  {
    path: '/',
    element:<Layout />,
    children:[
      {
        path:"",
        element:<Home />,
      },{
        path:"about",
        element:<About/>


      },
      {
        path:"contactus",
        element:<Contact/>,
      },
      {
        path:"user/:id",
        element:<User/>,
      },
      {
        path:"github",
        element:<Github/>,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
