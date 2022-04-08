export default function ModalWindow() {

    return (
        <div className="fixed left-0 top-0 w-full h-full bg-gray-800 bg-opacity-40 flex justify-center items-center disabled">
            <div className="w-3/5 bg-white rounded-lg p-3 border-2 shadow-xl h-80 flex flex-col">
                <input type="text" placeholder="输入..." className="w-full p-2 border border-gray-200 rounded-lg"></input>
                <div className="mt-5">最近查询</div>
                <div className="bg-gray-100 w-full h-0.5"></div>
                <div className="mt-5">查询1</div>
                <div className="mt-5">查询2</div>
                <div className="mt-5">查询3</div>
            </div>
        </div>
    )
}