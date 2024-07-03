import { Link } from 'react-router-dom'
import Icon from '../../public/iconBills.svg'
import X from '../../public/X.svg'
import Yes from '../../public/Yes.svg'
import mail from '../../public/mail.svg'
import exclamation from '../../public/exclamation.svg'
function LandingPage() {
  return (
    <div className='bg-background-color flex h-screen w-full flex-col items-start gap-20 py-5'>
      <div className='flex w-full items-center justify-between px-6 lg:px-20'>
        {' '}
        <div className='flex items-center justify-center gap-5 text-xl font-bold sm:text-4xl'>
          Payment Pal <img src={Icon} className='w-12 sm:w-24'></img>
        </div>
        <div>
          <Link
            to='/login'
            className='bg-secondary-color block transform rounded-3xl p-3 font-bold hover:scale-110 sm:text-2xl'
          >
            Login
          </Link>
        </div>
      </div>

      <div className='flex w-full flex-col items-center justify-center gap-24'>
        <div className='flex flex-col items-center justify-center gap-10'>
          <h1 className='text-secondary-color text-center text-3xl font-bold lg:w-3/4 lg:text-5xl'>
            Perfect tool for every landlord
          </h1>
          <div className='flex transform flex-col gap-20 lg:flex-row'>
            <div className='flex w-80 flex-col gap-7 rounded-lg bg-gradient-to-r from-red-400 to-red-700 p-7 text-white sm:w-96'>
              <div className='flex items-center gap-3 text-xl font-semibold'>
                <img src={X} width='50px'></img>
                No more boring excel files
              </div>
              <div className='flex items-center gap-3 text-xl font-semibold'>
                <img src={X} width='50px'></img>No more file cabinets
              </div>
            </div>
            <div className='flex w-80 flex-col gap-5 rounded-lg bg-gradient-to-r from-green-300 to-green-400 p-7 sm:w-96'>
              <div className='flex items-center gap-3 text-xl font-semibold'>
                <img src={Yes} width='50px'></img>All properties in one place
              </div>
              <div className='flex items-center gap-3 text-xl font-semibold'>
                <img src={Yes} width='50px'></img>Easily keep track of everything
              </div>
            </div>
          </div>
        </div>
        <div className='bg-primary-color flex w-full flex-col items-center justify-center gap-8 p-7 lg:p-32'>
          <div className='text-center text-3xl font-bold lg:w-2/5'>
            Never miss a payment ever again
          </div>
          <div className='bg-secondary-color flex rounded-2xl p-5 text-center text-xl lg:w-2/5'>
            Welcome to our professional platform for managing accounts for apartment renters. Our
            user-friendly service simplifies the process of keeping track of rental expenses and
            payments. With our innovative tools, you can effortlessly manage your bills, invoices,
            and financial records in one convenient place. Our platform offers a secure and
            efficient way to organize your finances, ensuring transparency and accuracy in all your
            transactions. Say goodbye to the hassle of manually tracking your expenses and let our
            service streamline the process for you. Join our platform today to experience the
            convenience of efficient account management for apartment renters. Take control of your
            finances and enjoy peace of mind knowing that your accounts are in order. Trust us to
            help you stay on top of your rental payments effortlessly.
          </div>
        </div>
        <div className='m-2 flex flex-col items-center justify-center lg:flex-row'>
          <img src={mail} alt='' />
          <div className='flex flex-col items-start justify-start gap-10 font-bold lg:w-2/5'>
            <ul className='flex flex-col gap-3 rounded-xl bg-gradient-to-r from-red-400 to-red-700 p-5 text-white'>
              <li className='r flex items-center gap-3'>
                <img src={exclamation} width='30' alt='' />
                No more problems with sending emails to tenants
              </li>
              <li className='flex items-center gap-3'>
                <img src={exclamation} width='30' alt='' />
                By two clicks remind them about their missing payments
              </li>
              <li className='r flex items-center gap-3'>
                <img src={exclamation} width='30' alt='' />
                We will take care of everything, just type in subject and body of the email
              </li>
            </ul>
          </div>
        </div>
        <div className='flex w-full flex-col items-center justify-center gap-3 bg-gray-500 p-14 text-center'>
          Created by Bartosz Pers
          <div className='flex flex-col items-center justify-center gap-2 sm:flex-row'>
            {' '}
            <div>Other applications created by me:</div>
            <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
              <a href='https://bonioszko.github.io/Portfolio/' className='border-b-2 border-black'>
                Portfolio
              </a>
              <a href='trainingappfull.onrender.com' className='border-b-2 border-black'>
                TrainingApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LandingPage
