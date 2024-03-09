import React, {useContext, useState} from 'react';
import styles from './Login.module.css';
import { useformik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  
  const [loading, setLoading] = useState(false)
  const [apierror, setApierror] = useState(null)
  let navigate = useNavigate()
  let {setUserToken}=useContext(UserContext)

  async function LoginSubmit(values) {
    setLoading(true)
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
  .catch((err)=>{
    setApierror(err.response.data.message)
    setLoading(false)
  })
  if (data.message == 'success')
      setLoading(false)
      localStorage.setItem('usertoken', data.token)
      setUserToken(data.token)
      navigate('/')
  }
  let validationschema = yup.object({
    email : yup.string().required('Email is required').email('invalid email'),
    password : yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}$/ , 'invalid password ex(Ahmed123)'),
  })


  let formik = useformik({
    initialValues: {
      email: '',
      password: '',
    },validationschema
    , onSubmit: LoginSubmit
  })
  return <>
  <div className="w-75 mx-auto py-4">
    <h2>Login Now</h2>
    <form onSubmit={formik.handleSubmit}>
      {apierror?<div className="alert alert-danger">{apierror}</div>:''}

     

      <label htmlFor="Email">Email : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id="email" name='email' className='form-control mb-3'/> 
      {formik.errors.Email && formik.touched.Email? <div className="alert alert-danger py-2">{formik.errors.Email}</div> :null} 

      <label htmlFor="password">password : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="password" name='password' className='form-control mb-3'/> 
      {formik.errors.password &&  formik.touched.password? <div className="alert alert-danger py-2">{formik.errors.password}</div> :null}
      
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
      </button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Login</button>}
      <link className='ps-3' to={'/login'}>Login Now</link>
    </form>
  </div>
  </>
}
