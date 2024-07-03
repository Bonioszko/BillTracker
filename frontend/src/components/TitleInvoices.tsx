function TitleInvoices({ title }: { title: string }) {
  return (
    <div className='bg-secondary-color text-text-color flex w-20 items-center justify-center rounded-lg border-2 border-white p-1 text-center text-sm font-bold lg:w-52 lg:text-2xl'>
      {title}
    </div>
  )
}

export default TitleInvoices
