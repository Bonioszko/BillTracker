import ErrorForm from './ErrorForm'
import { useContext, useState } from 'react'
import { UserContext, UserContextType } from '../context/UserContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation } from 'react-i18next'
interface AddApartmentPopoupProps {
  onClose: () => void
  refresh: () => void
}
type Errors = {
  name?: string
  description?: string
  tenant?: string
}
const AddApartmentPopoup: React.FC<AddApartmentPopoupProps> = ({ onClose, refresh }) => {
  const { t } = useTranslation()
  const { user } = useContext(UserContext) as UserContextType
  const [errors, setErrors] = useState<Errors>({})
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tenant: '',
  })
  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: '',
      description: '',
      tenant: '',
    }
    if (!formData.name) {
      newErrors.name = 'Podaj nazwe'
      isValid = false
    }
    if (!formData.description) {
      newErrors.description = 'Podaj opis mieszkania'
      isValid = false
    }
    if (!formData.tenant) {
      newErrors.tenant = 'Podaj lokatora'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.tenant)) {
      newErrors.tenant = 'Tenant must be an email'
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const { name, description, tenant } = formData
      const response = await fetch(`/api/apartment/${user?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, tenant }),
      })
      if (response.ok) {
        // const data = await response.json();
        toast.success(t('apartment_added'))
        setTimeout(() => {
          onClose()
          refresh()
        }, 1000)
      } else {
        console.log('Error:', response.status, response.statusText)
        toast.error(t('apartment_not_added'))
      }
    }
  }

  return (
    <div
      className='fixed left-0 top-0 flex h-screen w-screen items-center justify-center transition-none'
      style={{ backgroundColor: 'rgba(107, 114, 128, 0.45)' }}
    >
      {' '}
      <div className='bg-secondary-color animate-slideInFromBottom border-text-color flex w-11/12 flex-col items-center justify-around rounded-lg border-2 p-20 sm:h-2/3 lg:w-1/2'>
        <h1 className='text-2xl font-bold'>{t('add_apartment')}</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='flex flex-col'>
            {' '}
            <div className='flex flex-col'>
              {' '}
              <label htmlFor='fname'>{t('apartment_name')}</label>
              {errors.name && <ErrorForm text={t('give_name')}></ErrorForm>}
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
              <label htmlFor='description'>{t('apartment_description')}</label>{' '}
              {errors.description && <ErrorForm text={t('give_description')}></ErrorForm>}
            </div>
            <input
              type='text'
              id='description'
              name='description'
              className='rounded-lg p-2'
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className='flex flex-col'>
            {' '}
            <div className='flex flex-col'>
              {' '}
              <label htmlFor='tenant'>{t('tenant')}</label>{' '}
              {errors.tenant && <ErrorForm text={t('give_tenant')}></ErrorForm>}
            </div>
            <input
              type='text'
              id='tenant'
              name='tenant'
              className='rounded-lg p-2'
              value={formData.tenant}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tenant: e.target.value,
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
export default AddApartmentPopoup
