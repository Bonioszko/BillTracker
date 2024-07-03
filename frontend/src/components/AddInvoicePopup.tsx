import { useContext, useState } from 'react'
import { UserContext, UserContextType } from '../context/UserContext'
import { toast } from 'react-toastify'
import ErrorForm from './ErrorForm'
import { useTranslation } from 'react-i18next'

interface AddInvoicePopupProps {
  onClose: () => void
  category: string
  apartment_id: string
  refresh: () => void
}
type Errors = {
  name?: string
  date?: string
  amount?: string
}
const AddInvoicePopup: React.FC<AddInvoicePopupProps> = ({
  onClose,
  category,
  apartment_id,
  refresh,
}) => {
  const { t } = useTranslation()
  const [errors, setErrors] = useState<Errors>({})
  const { user } = useContext(UserContext) as UserContextType
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    amount: 0,
    category: category,
    apartment: apartment_id,
  })
  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: '',
      amount: '',
      date: '',
    }
    if (!formData.name) {
      newErrors.name = t('give_name')
      isValid = false
    }
    if (!formData.amount) {
      newErrors.amount = t('give_amount')
      isValid = false
    }
    if (!formData.date) {
      newErrors.date = t('give_date')
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      const { name, date, category, apartment, amount } = formData
      const response = await fetch(`/api/invoice/${user?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          date,
          category,
          apartment,
          amount,
        }),
      })
      if (response.ok) {
        // const data = await response.json();
        toast.success(t('invoice_added'))
        onClose()
        refresh()
      } else {
        console.log('Error:', response.status, response.statusText)
        toast.error(t('invoice_not_added'))
      }
    }
  }
  return (
    <div
      className='fixed left-0 top-0 flex h-screen w-screen items-center justify-center transition-none'
      style={{ backgroundColor: 'rgba(107, 114, 128, 0.45)' }}
    >
      <div className='bg-secondary-color animate-slideInFromBottom border-text-color flex w-11/12 flex-col items-center justify-around rounded-lg border-2 p-20 sm:h-2/3 lg:w-1/2'>
        <h1 className='text-xl'>
          {t('add_invoice')}
          <span className='font-bold'> {category}</span>
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='flex flex-col'>
            {' '}
            <div className='flex flex-col'>
              {' '}
              <label htmlFor='fname'> {t('invoice_name')}</label>
              {errors.name && <ErrorForm text={errors.name}></ErrorForm>}
            </div>
            <input
              type='text'
              id='fname'
              name='fname'
              className='rounded-lg p-2'
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className='flex flex-col'>
            {' '}
            <div className='flex flex-col'>
              {' '}
              <label htmlFor='famount'> {t('invoice_amount')}</label>
              {errors.amount && <ErrorForm text={errors.amount}></ErrorForm>}
            </div>
            <input
              type='number'
              id='famount'
              name='famount'
              className='rounded-lg p-2'
              min='1'
              step='any'
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: Number(e.target.value),
                })
              }
            />
          </div>
          <div className='flex flex-col'>
            {' '}
            <div className='flex flex-col'>
              {' '}
              <label htmlFor='date'> {t('invoice_date')}</label>{' '}
              {errors.date && <ErrorForm text={errors.date}></ErrorForm>}
            </div>
            <input
              type='date'
              id='date'
              name='date'
              className='rounded-lg p-2'
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
            />
          </div>
          <div className='flex justify-between'>
            {' '}
            <input
              type='submit'
              value='Submit'
              className='bg-primary-color transform cursor-pointer rounded-lg border-2 border-black p-2 font-bold hover:scale-105 sm:w-20'
            />{' '}
            <button
              className='transform rounded-lg border-2 border-black bg-red-700 p-2 font-bold hover:scale-105 sm:w-20'
              onClick={() => onClose()}
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddInvoicePopup
