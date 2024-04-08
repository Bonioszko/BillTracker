interface CellProps {
    content: React.ReactNode;
}

const Cell: React.FC<CellProps> = ({ content }) => {
    return (
        <div className="w-20 lg:w-52 bg-background-color text-black border-2 border-white text-center rounded-lg text-sm text-wrap lg:text-xl flex items-center justify-center sm:p-1  ">
            {content}
        </div>
    );
};

export default Cell;
