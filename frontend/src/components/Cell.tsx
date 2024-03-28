interface CellProps {
    content: React.ReactNode;
}

const Cell: React.FC<CellProps> = ({ content }) => {
    return (
        <div className="w-60 bg-secondary-color text-center text-white text-xl flex items-center justify-center p-1 rounded-lg">
            {content}
        </div>
    );
};

export default Cell;
