function TitleInvoices({ title }: { title: string }) {
    return (
        <div className="w-20 lg:w-60 bg-secondary-color text-center text-text-color lg:text-2xl font-bold flex items-center justify-center p-1 rounded-lg border-2 border-white">
            {title}
        </div>
    );
}

export default TitleInvoices;
