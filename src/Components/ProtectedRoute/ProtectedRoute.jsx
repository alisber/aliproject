import React from 'react';
import styles from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
  if (localStorage.getItem('userToken')){
    return props.children
  }else{
    return <Navigate to={'/Login'}/>
  }
  
}