import { useTranslation } from 'react-i18next'
interface ApartmentCardProps {
  name: string
  description: string
  tenant: string
}
const ApartmentCard: React.FC<ApartmentCardProps> = ({ name, description, tenant }) => {
  const { t } = useTranslation()
  return (
    <div className='bg-secondary-color flex h-40 flex-col items-center gap-3 rounded-xl p-2 sm:p-5'>
      {' '}
      <div className='text-text-color text-wrap text-center text-lg font-bold'>{name}</div>
      <div className='text-center'>{description}</div>
      <div className='text-center'>
        {' '}
        {t('tenant')} : {tenant}
      </div>
    </div>
  )
}
export default ApartmentCard
