interface CellProps {
  content: React.ReactNode
}

const Cell: React.FC<CellProps> = ({ content }) => {
  return (
    <div className='bg-background-color flex w-20 items-center justify-center text-wrap rounded-lg border-2 border-white text-center text-sm text-black sm:p-1 lg:w-52 lg:text-xl'>
      {content}
    </div>
  )
}

export default Cell
