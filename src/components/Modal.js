export default function Modal(props) {

    return (
        <div className="fixed left-0 top-0 w-full h-full bg-gray-800 bg-opacity-40 flex justify-center items-center disabled" onClick={props.onOverlayClick}>
            <div className="w-3/5 bg-white rounded-lg p-3 border-2 shadow-xl h-80 flex flex-col  overflow-auto" onClick={props.onModalClick}>
                {props.children}
            </div>
        </div>
    )
}