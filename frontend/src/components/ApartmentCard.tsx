import { useTranslation } from 'react-i18next'
import { Apartment } from '../ts/interfaces_types'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
interface ApartmentCardProps {
  apartment: Apartment
}
const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  const { t } = useTranslation()
  const [popup, setPopup] = useState(false)
  const [count, setCount] = useState(0)

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',

      bottom: 'auto',
      width: '80%',
      height: '80%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex', // Using flex to center content inside the modal
      alignItems: 'center', // Center content vertically
      justifyContent: 'center', // Center content horizontally
    },
  }

  const changePopup = () => {
    setPopup((prevPopup) => !prevPopup)
  }
  useEffect(() => {
    Modal.setAppElement('#root')
    const fetchCount = async () => {
      const response = await fetch(`/api/invoice/count/${apartment._id}`)
      const data = await response.json()
      if (response.ok) {
        setCount(data.invoices_count)
      }
    }
    fetchCount()
  }, [])
  return (
    <div className=''>
      <Modal isOpen={popup} style={customStyles}>
        <FontAwesomeIcon
          icon={faX}
          className='absolute right-5 top-5 hover:cursor-pointer'
          size='xl'
          onClick={changePopup}
        />
        <div className='bg-secondary-color flex h-4/5 w-4/5 flex-col items-center justify-center gap-6 rounded-lg p-4 shadow-lg'>
          <p className='text-primary-color mb-2 font-semibold lg:text-2xl'>{apartment.name}</p>
          <p className='mb-2 text-gray-700 lg:text-xl'>{apartment.description}</p>
          <p className='text-gray-600 lg:text-xl'>Number of invoices : {count}</p>
        </div>
      </Modal>
      <div
        onClick={changePopup}
        className='bg-secondary-color flex h-40 flex-col items-center gap-3 rounded-xl p-2 hover:scale-105 hover:cursor-pointer sm:p-5'
      >
        {' '}
        <div className='text-text-color text-wrap text-center text-lg font-bold'>
          {apartment.name}
        </div>
        <div className='text-center'>{apartment.description}</div>
        <div className='text-center'>
          {' '}
          {t('tenant')} : {apartment.tenant}
        </div>
      </div>
    </div>
  )
}
export default ApartmentCard
