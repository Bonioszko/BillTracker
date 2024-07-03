import { useTranslation } from 'react-i18next'

interface PopupProps {
  onClose: () => void
  togglePaidByTenant: () => void
  currValue: boolean
}

const Popup: React.FC<PopupProps> = ({ onClose, togglePaidByTenant, currValue }) => {
  const { t } = useTranslation()

  return (
    <div
      className='fixed left-0 top-0 flex h-screen w-screen items-center justify-center transition-none'
      style={{ backgroundColor: 'rgba(107, 114, 128, 0.45)' }}
    >
      <div className='bg-secondary-color border-text-color animate-slideInFromBottom flex h-1/2 w-11/12 flex-col items-center justify-between rounded-lg border-2 p-20 xl:w-1/2'>
        <h1 className='text-xl font-bold'>
          {t('are_you_sure')}
          <span className='font-extrabold'>
            {' '}
            {currValue ? t('cancel_payment') : t('approve_payment')}
          </span>
        </h1>
        <div className='flex h-28 w-3/4 justify-between sm:w-1/2'>
          {' '}
          <button
            className='bg-primary-color transform cursor-pointer rounded-lg border-2 border-black p-2 font-bold hover:scale-105 md:w-60'
            onClick={() => {
              togglePaidByTenant()
              onClose()
            }}
          >
            {t('submit')}
          </button>
          <button
            className='transform rounded-lg border-2 border-black bg-red-700 p-2 font-bold hover:scale-105 md:w-60'
            onClick={() => onClose()}
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  )
}
export default Popup
