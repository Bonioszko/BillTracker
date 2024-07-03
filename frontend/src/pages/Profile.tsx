import { UserContext, UserContextType } from '../context/UserContext.js'

import { useContext, useEffect, useState } from 'react'

import Layout from '../components/Layouts/Layout.js'
import { Apartment } from '../ts/interfaces_types.js'
import { useTranslation } from 'react-i18next'
import ApartmentCard from '../components/ApartmentCard.js'

type Summary = {
  _id: null
  toPayByMeCount: number
  toPayByTenantsCount: number
  totalAmountToPay: number
  totalAmountToReceive: number
  difference: number
}
function Profile() {
  const { user } = useContext(UserContext) as UserContextType
  const { t } = useTranslation()
  const [apartments, setApartments] = useState<Apartment[]>()
  const [summary, setSummary] = useState<Summary>({
    _id: null,
    toPayByMeCount: 0,
    toPayByTenantsCount: 0,
    totalAmountToPay: 0,
    totalAmountToReceive: 0,
    difference: 0,
  })
  useEffect(() => {
    const FetchApartments = async () => {
      if (user) {
        const apartmentResoponse = await fetch(`/api/apartment/${user._id}`)
        const data = await apartmentResoponse.json()
        if (apartmentResoponse.ok) {
          setApartments(data.apartments)
        }
      }
    }
    const FetchSummary = async () => {
      if (user) {
        const apartmentResoponse = await fetch(`/api/invoice/summary/${user._id}`)
        const data = await apartmentResoponse.json()
        if (apartmentResoponse.ok) {
          setSummary(data.summary)
        }
      }
    }
    FetchApartments()
    FetchSummary()
  }, [user])
  return (
    <Layout>
      {user ? (
        <div className='animate-fadeIn flex flex-col items-center justify-center gap-5 lg:w-1/2'>
          {' '}
          <h1 className='pb-8 text-center text-5xl font-bold'>{t('profile_page')}</h1>
          <div className='flex flex-col items-center justify-center gap-10 sm:flex-row'>
            {' '}
            <div className='text-center text-2xl font-bold'>{user.name}</div>
            <div className='border-secondary-color flex grow flex-col border-4 p-2'>
              {' '}
              <div className='border-b-2'>
                <span className='font-bold'> {t('invoices_to_pay')}</span>

                {summary?.toPayByMeCount}
              </div>{' '}
              <div className='border-b-2'>
                <span className='font-bold'>{t('invoices_to_be_paid')}</span>
                {summary?.toPayByTenantsCount}
              </div>{' '}
              <div className='border-b-2'>
                <span className='font-bold'>{t('amount_to_pay')}</span>
                {summary?.totalAmountToPay}
              </div>
              <div className='border-b-2'>
                <div className=' '>
                  {' '}
                  <span className='font-bold'>{t('amount_to_be_paid')}</span>
                  {summary?.totalAmountToReceive}
                </div>
              </div>
              <div className='border-b-2'>
                <div className=''>
                  {' '}
                  <span className='font-bold'>{t('difference')}</span>
                  <span
                    className={`${
                      summary.difference >= 0 ? 'bg-green-500' : 'bg-red-500'
                    } rounded-lg px-1`}
                  >
                    {summary.difference}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h1 className='text-center text-2xl font-bold'>Your apartments:</h1>
          <div className='grid-cols-apartments-grid grid w-full gap-5 p-10'>
            {apartments?.map((apartment, index) => (
              <ApartmentCard key={index} apartment={apartment}></ApartmentCard>
            ))}
          </div>
        </div>
      ) : (
        <div className='text-3xl font-bold'>To access this content you must be logged in</div>
      )}
    </Layout>
  )
}
export default Profile
