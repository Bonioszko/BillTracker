import { Link } from 'react-router-dom'
import Icon from '../../public/iconBills.svg'
import Logout from './Logout'
import { useContext } from 'react'
import { UserContextType, UserContext } from '../context/UserContext'
import LocaleSwitcher from '../i18n/Switcher'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Hamburger from '../../public/Hamburger.svg'

export default function Navbar() {
  const { user } = useContext(UserContext) as UserContextType
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div
      className={`flex h-16 w-full border-b-2 border-gray-700 lg:justify-center ${
        isOpen && isMobile ? 'fixed z-50 h-screen bg-white' : ''
      }`}
    >
      <div
        className={`flex w-full flex-col sm:flex-row lg:w-10/12 lg:items-center lg:justify-between ${
          isOpen && isMobile && 'h-screen'
        }`}
      >
        {' '}
        <div className='flex w-full justify-between p-5'>
          {' '}
          <div className='flex items-center justify-center gap-5 font-bold lg:text-3xl'>
            PaymentPal <img src={Icon} className='w-8 lg:w-16'></img>
          </div>
          {isMobile && (
            <button onClick={toggleMenu}>
              <img src={Hamburger} alt='Menu' width='40px' height='40px' />
            </button>
          )}
        </div>
        {(isOpen || !isMobile) && (
          <div
            className={`flex flex-col items-center justify-center gap-2 sm:flex-row lg:gap-5 ${
              isOpen ? 'animate-slideInFromTop' : ''
            }`}
          >
            {user ? (
              <Logout className='hover:bg-secondary-color hover:text-background-color rounded-lg p-2 text-center font-bold transition-colors duration-300 ease-in-out lg:text-xl'></Logout>
            ) : (
              <Link
                to='/login'
                className='hover:bg-secondary-color hover:text-background-color rounded-lg p-2 text-center font-bold transition-colors duration-300 ease-in-out lg:text-xl'
              >
                {t('login')}
              </Link>
            )}
            <Link
              to='/signin'
              className='hover:bg-secondary-color hover:text-background-color rounded-lg p-2 text-center font-bold transition-colors duration-300 ease-in-out lg:text-xl'
            >
              {t('sign_in')}
            </Link>

            <Link
              to='/profile'
              className='hover:bg-secondary-color hover:text-background-color rounded-lg p-2 font-bold transition-colors duration-300 ease-in-out lg:text-xl'
            >
              {t('profile')}
            </Link>
            <Link
              to='/main'
              className='hover:bg-secondary-color hover:text-background-color rounded-lg p-2 font-bold transition-colors duration-300 ease-in-out lg:text-xl'
            >
              {t('invoices')}
            </Link>
            <Link
              to='/'
              className='hover:bg-secondary-color hover:text-background-color rounded-lg p-2 font-bold transition-colors duration-300 ease-in-out lg:text-xl'
            >
              {t('home')}
            </Link>
            <LocaleSwitcher></LocaleSwitcher>
          </div>
        )}
      </div>
    </div>
  )
}
