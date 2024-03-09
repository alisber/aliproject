import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import CounterContextProvider, { CounterContext } from './context/CounterContext';
import UserContextProvider from './context/UserContext';
import { useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

let routes = createhashrRouter([
  { path: '/', element: <Layout />, children: [
    {index:true , element:<ProtectedRoute><Home /></ProtectedRoute>},
    {path:'Products' , element:<ProtectedRoute><Products /></ProtectedRoute>},
    {path:'ProductDetails/:x' , element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
    {path:'Cart' , element:<ProtectedRoute><Cart /></ProtectedRoute>},
    {path:'Categories' , element:<ProtectedRoute><Categories /></ProtectedRoute>},
    {path:'Brands' , element:<ProtectedRoute><Brands /></ProtectedRoute>},
    {path:'Login' , element:<Login/>},
    {path:'Register' , element:<Register/>},
  ] }
])
let {setUserToken} = useContext(UserContext);
useEffect(()=>{
   if (localStorage.getItem('userToken')){
     setUserToken(localStorage.getItem('userToken'))
 } , [])
  return <>
     <CounterContextProvider>
      <RouterProvider router={routers}></RouterProvider>
     </CounterContextProvider>
  </>


export default App;
