import { XIcon } from '@heroicons/react/solid'

Modal.defaultProps = {
    width: "80%",
    height: "80%"
}

export default function Modal(props) {

    const styles = {
        width: props.width,
        height: props.height
    }

    return (
        <div className="fixed left-0 top-0 w-full h-full bg-gray-800 bg-opacity-40 flex justify-center items-center">
            <div style={styles} className='flex'>
                <div className="bg-white rounded-lg p-3 border-2 shadow-xl flex flex-col overflow-auto w-full h-full" onClick={(e) => e.stopPropagation()}>
                    {props.children}
                </div>
                <div onClick={props.closeModal} className="button "><XIcon className='w-5 h-5 m-1 fill-red-200' /></div>
            </div>
        </div>
    )
} 