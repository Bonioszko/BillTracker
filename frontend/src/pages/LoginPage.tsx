import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { UserContextType, UserContext } from '../context/UserContext'
import Layout from '../components/Layouts/Layout'
import ErrorForm from '../components/ErrorForm'
import { useTranslation } from 'react-i18next'

type Errors = {
  email?: string
  password?: string
}
function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext) as UserContextType
  const [errors, setErrors] = useState<Errors>({
    email: '',
    password: '',
  })
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const validateForm = () => {
    let isValid = true
    const newErrors = {
      email: '',
      password: '',
    }
    if (!formData.email) {
      newErrors.email = t('give_email')
      isValid = false
    }
    if (!formData.password) {
      newErrors.password = t('give_password')
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }
  const handleResetPassword = async () => {
    const { email } = formData
    if (email) {
      const response = await fetch('/api/auth/forget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      })
      const responseData = await response.json()
      if (responseData.error) {
        toast.error(responseData.error)
      } else {
        toast.success('Check your email for instructions')
      }
    } else {
      toast.error('Provide valid email')
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const { email, password } = formData
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        })
        const responseData = await response.json()

        if (responseData.error) {
          toast.error(responseData.error)
        } else {
          setUser(responseData)
          navigate('/main')
          toast.success(t('logged_in_popup') + responseData.name)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <Layout>
      <div className='bg-secondary-color flex h-4/5 w-10/12 flex-col items-center justify-center gap-5 rounded-lg p-14 sm:gap-10'>
        {!user ? (
          <>
            <h2 className='text-3xl font-bold'>Login</h2>
            <form
              onSubmit={handleSubmit}
              className='bg-background-color animate-slideInFromBottom flex h-2/5 max-w-2xl flex-col justify-between gap-5 rounded-lg p-5 sm:w-1/2'
            >
              <div className='flex flex-col gap-1'>
                <div className='flex items-center justify-between'>
                  {' '}
                  <label htmlFor='email' className='text-xl'>
                    Email
                  </label>{' '}
                  {errors.email && <ErrorForm text={errors.email}></ErrorForm>}
                </div>

                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='enter email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className='focus:border-secondary-color rounded-xl border-2 border-black p-2 focus:outline-none'
                />
              </div>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center justify-between'>
                  <label htmlFor='password' className='text-xl'>
                    {t('password')}
                  </label>
                  {errors.password && <ErrorForm text={errors.password}></ErrorForm>}
                </div>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='enter password'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className='focus:border-secondary-color rounded-xl border-2 border-black p-2 focus:outline-none'
                />
              </div>
              <div className='flex w-full justify-between gap-7'>
                {' '}
                <button
                  type='submit'
                  className='bg-background-color border-text-color hover:bg-secondary-color hover:text-text-color w-full rounded-lg border-2 p-2 transition-colors duration-300 ease-in-out'
                >
                  {' '}
                  {t('submit')}
                </button>
                <button
                  type='button'
                  className='bg-background-color border-text-color hover:bg-secondary-color hover:text-text-color w-full rounded-lg border-2 p-2 transition-colors duration-300 ease-in-out'
                  onClick={handleResetPassword}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className='text-3xl font-bold'>{t('logged_in')}</div>
        )}
      </div>
      {/* <ToastContainer /> */}
    </Layout>
  )
}
export default Login
