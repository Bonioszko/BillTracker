import { useEffect, useState, useContext } from 'react'
import CurrentApartment from '../components/CurrentApartment'
import AddApartmentPopoup from '../components/AddApartmentPopup'
import { UserContextType, UserContext } from '../context/UserContext'
import PlusIcon from '../../public/plus.svg'
import Layout from '../components/Layouts/Layout'
import { Invoice, Apartment } from '../ts/interfaces_types'

function InvoicesPage() {
  const { user } = useContext(UserContext) as UserContextType
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [activeApartment, setActiveApartment] = useState(0)

  const [refresh, setRefresh] = useState(false)
  const [addApartmentPopupBool, setAddApartmentPopupBool] = useState(false)
  const toggleRefresh = () => {
    setRefresh(!refresh)
  }
  // const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const invoiceResponse = await fetch(`/api/invoice/${user._id}`)
        const invoiceData = await invoiceResponse.json()
        let invoices: Invoice[] = []
        if (invoiceResponse.ok) {
          invoices = invoiceData.invoices
        }

        // Fetch apartments
        const apartmentResponse = await fetch(`/api/apartment/${user._id}`)
        const apartmentData = await apartmentResponse.json()
        let apartments: Apartment[] = []
        if (apartmentResponse.ok) {
          apartments = apartmentData.apartments
          const apartmentsWithInvoices = apartments.map((apartment) => ({
            ...apartment,
            invoices: invoices
              .filter((invoice) => invoice.apartment === apartment._id)
              .map((invoice) => ({
                ...invoice,
                date: new Date(invoice.date),
              })),
          }))

          setApartments(apartmentsWithInvoices)
        }
      }
    }

    fetchData()
  }, [user, refresh])
  return (
    <Layout>
      {user ? (
        <>
          <div className='h-15 bg-secondary-color flex w-11/12 items-center justify-center overflow-x-auto rounded-lg lg:w-10/12'>
            <div className='white-scrollbar flex h-20 items-center gap-5 overflow-x-auto px-2 py-0 lg:h-28 lg:px-10'>
              {apartments.length > 0 ? (
                apartments.map((apartment, index) => (
                  <div
                    key={index}
                    className={`max-w-96 cursor-pointer rounded-lg p-2 text-center font-bold lg:text-2xl ${
                      index === activeApartment
                        ? 'bg-primary-color text-black transition-colors duration-500 ease-in-out'
                        : 'text-text-color'
                    }`}
                    onClick={() => setActiveApartment(index)}
                  >
                    {apartment.name}
                  </div>
                ))
              ) : (
                <div className='text-xl font-bold'>Add some apartments</div>
              )}
            </div>
            <div className='flex w-20 justify-center lg:w-20'>
              {apartments && (
                <img
                  src={PlusIcon}
                  alt=''
                  className='w-6 cursor-pointer lg:w-20'
                  onClick={() => setAddApartmentPopupBool(true)}
                />
              )}
            </div>
          </div>
          <div className='bg-secondary-color animate-slideInFromBottom h-5/6 w-11/12 rounded-lg lg:w-10/12'>
            {/* <div className="text-center  pt-4 flex flex-col">
                            <span className="text-3xl font-extrabold text-text-color">
                                {t("invoices")}
                            </span>
                            <span className="text-xl">
                                {apartments[activeApartment]?.name}
                            </span>
                        </div> */}

            {apartments &&
              apartments.map((apartment, index) => (
                <CurrentApartment
                  key={index}
                  name={apartment.name}
                  _id={apartment._id}
                  description={apartment.description}
                  tenant={apartment.tenant}
                  invoices={apartment.invoices}
                  owner={apartment.owner}
                  active={index === activeApartment ? true : false}
                  setRefresh={toggleRefresh}
                  refresh={refresh}
                ></CurrentApartment>
              ))}
          </div>
          {addApartmentPopupBool && (
            <AddApartmentPopoup
              onClose={() => setAddApartmentPopupBool(false)}
              refresh={() => toggleRefresh()}
            ></AddApartmentPopoup>
          )}
        </>
      ) : (
        <div className='text-3xl font-bold'>To access this content you must be logged in</div>
      )}
    </Layout>
  )
}

export default InvoicesPage
