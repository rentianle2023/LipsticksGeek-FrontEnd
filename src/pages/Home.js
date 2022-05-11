import { LightningBoltIcon, BookOpenIcon, ChatAlt2Icon } from '@heroicons/react/outline'

export default function Home() {

    return (
        <div >
            <div className="bg-gray-800 text-indigo-100 relative overflow-hidden">
                <div className="text-center py-5 text-sm">
                    <div className="font-bold text-3xl m-2">LipstickGeeks</div>
                    <div>帮助选择困难的男士</div>
                    <div>挑选合适女朋友的口红</div>
                    <div className=" bg-red-500 rounded-lg text-white py-2 w-32 mx-auto mt-4 text-base">快速开始</div>
                    <svg className='h-40 absolute opacity-30 -rotate-45 -right-12 bottom-5' t="1649252764265" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9319" ><path d="M275.95 508.83l-0.84 0.04h1.05zM746.48 508.87h1.07l-1.87-0.08z" p-id="9320" fill="#d81e06"></path><path d="M925.76 485.48c-110.66-10.23-251.7-371.8-415.54-117.45C346.37 113.68 205.33 475.25 94.67 485.48c100.57 135.85 461.42 477.24 833.32 0h-2.23z m-638.02 25.47h-0.03l-0.16-0.03c-8.01-1.25-12.44-2.05-12.44-2.05s0.15-0.05 0.39-0.12c0.65-0.2 2.2-0.67 4.51-1.35 8.15-2.38 25.94-7.35 48.92-12.37v-0.29h1.37c51.96-11.27 129.32-22.55 181.04-5.12 84.12-28.36 236.22 19.25 236.22 19.25-204.13 37.29-408.11 10.15-459.82 2.08z" p-id="9321" fill="#d81e06"></path></svg>
                </div>
            </div>

            <main className="bg-gray-200 text-gray-900 pt-10 p-4">
                <div className="font-bold text-2xl">功能</div>
                <div className="flex-col-feature">
                    <LightningBoltIcon className='h-6 w-6' />
                    <p>快速推荐，解决礼物购买的燃眉之急</p>
                </div>
                <div className="flex-col-feature">
                    <BookOpenIcon className='h-6 w-6' />
                    <p>百科全书，学懂口红，让购买不再盲目，挑选最适合她的</p>
                </div>
                <div className="flex-col-feature">
                    <ChatAlt2Icon className='h-6 w-6' />
                    <p>社区交流，让买口红的你，不再孤单</p>
                </div>

            </main>
        </div>
    )
}