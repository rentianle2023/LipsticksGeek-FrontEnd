import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Audio } from 'react-loader-spinner'

export default function LoadingPage() {
    const { pathname } = useLocation();
    const [isLoading,setIsLoading] = useState(false)

    const prefix = '/recommendation/'

    useMemo(() => {
        if(pathname.startsWith(prefix)) return
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [pathname])


    

    return (
        <div>
            {isLoading &&
                <div className='flex justify-center items-center fixed left-0 top-0 w-full h-full bg-white z-40'>
                    <Audio
                        height="50"
                        width="50"
                        color='#ef4444'
                        ariaLabel='loading'
                    />
                </div>}
        </div>
    );
}