interface CellProps {
    content: React.ReactNode;
}

const Cell: React.FC<CellProps> = ({ content }) => {
    return (
        <div className="w-60 bg-background-color text-black border-2 border-white text-center rounded-lg text-xl flex items-center justify-center p-1 ">
            {content}
        </div>
    );
};

export default Cell;
