import React, { useState } from 'react';
import styles from './Register.module.css';
import { useformik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [apierror, setApierror] = useState(null)
  let navigate = useNavigate()

  async function RegisterSubmit(values) {
    setLoading(true)
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
  .catch((err)=>{
    setApierror(err.response.data.message)
    setLoading(false)
  })
  if (data.message == 'success')
       setLoading(false)
      navigate('/login')
  }
  let validationschema = yup.object({
    name : yup.string().required('Name is required').min(3, 'min length is 3').max(10, 'max length is 10'),
    email : yup.string().required('Email is required').email('invalid email'),
    password : yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}$/ , 'invalid password ex(Ahmed123)'),
    repassword : yup.string().required('Repassword is required').oneOf([yup.ref('password')]),
    phone : yup.string().required('phone is required').matches(/^01[0125[0125][0-9]{9}$/, 'we need egyptian number')
  })


  let formik = useformik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repassword: '',
      phone: ''
    },validationschema
    , onSubmit: RegisterSubmit
  })
  return <>
  <div className="w-75 mx-auto py-4">
    <h2>Register Now</h2>
    <form onSubmit={formik.handleSubmit}>
      {apierror?<div className="alert alert-danger">{apierror}</div>:''}

      <label htmlFor="Name">Name : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id="name" name='name' className='form-control mb-3'/>
      {formik.errors.name && formik.touched.name? <div className="alert alert-danger py-2">{formik.errors.name}</div> :null} 

      <label htmlFor="Email">Email : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id="email" name='email' className='form-control mb-3'/> 
      {formik.errors.Email && formik.touched.Email? <div className="alert alert-danger py-2">{formik.errors.Email}</div> :null} 

      <label htmlFor="password">password : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="password" name='password' className='form-control mb-3'/> 
      {formik.errors.password &&  formik.touched.password? <div className="alert alert-danger py-2">{formik.errors.password}</div> :null}

      <label htmlFor="repassword">repassword : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="repassword" name='repassword' className='form-control mb-3'/> 
      {formik.errors.repassword && formik.touched.repassword? <div className="alert alert-danger py-2">{formik.errors.repassword}</div> :null} 

      <label htmlFor="phone">phone : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id="phone" name='phone' className='form-control mb-3'/> 
      {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger py-2">{formik.errors.phone}</div> :null}
      
      {loading? <button  type='button' className='btn bg-main text-light'>
        <BallTriangle
        height={25}
        width={25}
        radius={5}
        color="#fff"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
      </button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register</button>}
      <link className='ps-3' to={'/register'}>Register Now</link>
    </form>
  </div>
  </>
}
