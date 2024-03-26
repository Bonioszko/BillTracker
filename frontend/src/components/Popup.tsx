function Popup() {
    return (
        <div
            className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center"
            style={{ backgroundColor: "rgba(107, 114, 128, 0.45)" }}
        >
            <div className="w-1/2 h-1/2 bg-secondary-color rounded-lg flex flex-col justify-between items-center p-10">
                Czy jesteś pewny tego i tego
                <div className="flex justify-between  w-1/2">
                    {" "}
                    <button className="bg-green-600 p-2 border-2 border-black rounded-lg font-bold">
                        Potwierdź
                    </button>
                    <button className="bg-red-700 p-2 border-2 border-black rounded-lg font-bold">
                        Potwierdź
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Popup;
