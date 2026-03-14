import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <div className='min-h-screen flex items-center justify-center' style={{ background: '#F8F5EF' }}>
      <div className='w-full max-w-md px-8 py-12' style={{ background: '#FFFFFF', border: '1px solid #C9A84C20' }}>

        {/* Header */}
        <div className='text-center mb-10'>
          <p className='text-xs tracking-widest mb-3' style={{ color: '#C9A84C', fontFamily: 'Montserrat, sans-serif' }}>
            VETRO
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#1A2E1A', fontWeight: '400' }}>
            {currentState === 'Login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#C9A84C', margin: '16px auto' }} />
          <p className='text-xs tracking-widest' style={{ color: '#6B7B6B' }}>
            {currentState === 'Login' ? 'SIGN IN TO CONTINUE' : 'JOIN THE VETRO FAMILY'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
          {currentState === 'Sign Up' && (
            <div>
              <label className='text-xs tracking-widest block mb-2' style={{ color: '#6B7B6B' }}>FULL NAME</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='w-full px-4 py-3 text-sm outline-none transition-all'
                style={{
                  border: '1px solid #C9A84C40',
                  background: '#F8F5EF',
                  color: '#1A2E1A',
                  fontFamily: 'Montserrat, sans-serif'
                }}
                type="text"
                placeholder='Your name'
                required
              />
            </div>
          )}

          <div>
            <label className='text-xs tracking-widest block mb-2' style={{ color: '#6B7B6B' }}>EMAIL ADDRESS</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='w-full px-4 py-3 text-sm outline-none transition-all'
              style={{
                border: '1px solid #C9A84C40',
                background: '#F8F5EF',
                color: '#1A2E1A',
                fontFamily: 'Montserrat, sans-serif'
              }}
              type="email"
              placeholder='your@email.com'
              required
            />
          </div>

          <div>
            <label className='text-xs tracking-widest block mb-2' style={{ color: '#6B7B6B' }}>PASSWORD</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full px-4 py-3 text-sm outline-none transition-all'
              style={{
                border: '1px solid #C9A84C40',
                background: '#F8F5EF',
                color: '#1A2E1A',
                fontFamily: 'Montserrat, sans-serif'
              }}
              type="password"
              placeholder='••••••••'
              required
            />
          </div>

          {/* Forgot password */}
          {currentState === 'Login' && (
            <div className='flex justify-end'>
              <p className='text-xs cursor-pointer hover:opacity-70 transition-opacity'
                style={{ color: '#C9A84C' }}>
                Forgot password?
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type='submit'
            className='w-full mt-4 text-xs tracking-widest transition-all duration-300'
            style={{
              background: '#1A2E1A',
              color: '#C9A84C',
              border: '1px solid #1A2E1A',
              padding: '16px',
              fontFamily: 'Montserrat, sans-serif',
              cursor: 'pointer',
              letterSpacing: '3px'
            }}
            onMouseEnter={e => { e.target.style.background = '#C9A84C'; e.target.style.color = '#1A2E1A'; }}
            onMouseLeave={e => { e.target.style.background = '#1A2E1A'; e.target.style.color = '#C9A84C'; }}
          >
            {currentState === 'Login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        {/* Toggle */}
        <div className='text-center mt-8'>
          <p className='text-xs' style={{ color: '#6B7B6B' }}>
            {currentState === 'Login' ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
              className='cursor-pointer hover:opacity-70 transition-opacity'
              style={{ color: '#C9A84C', textDecoration: 'underline' }}
            >
              {currentState === 'Login' ? 'Create one' : 'Sign in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login