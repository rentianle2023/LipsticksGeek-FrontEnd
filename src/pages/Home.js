export default function Home() {

    return (
        <div>
            <div className="bg-gray-800 text-indigo-100 ">
                <div className="text-center py-5">
                    <div className="font-bold text-3xl m-2">LipstickGeeks</div>
                    <div>帮助选择困难的直男</div>
                    <div>挑选合适他女朋友的口红</div>
                    <div className=" bg-red-500 rounded-lg text-white py-2 w-32 mx-auto mt-4">快速开始</div>
                </div>
            </div>

            <main className="bg-gray-200 text-gray-900 pt-10 p-4">
                <div className="font-bold text-2xl">功能</div>
                <div className="flex-col-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <p>快速推荐，解决礼物购买的燃眉之急</p>
                </div>
                <div className="flex-col-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p>百科全书，学懂口红，让购买不再盲目，挑选最适合她的</p>
                </div>
                <div className="flex-col-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <p>社区交流，让买口红的你，不再孤单</p>
                </div>

            </main>
        </div>
    )
}