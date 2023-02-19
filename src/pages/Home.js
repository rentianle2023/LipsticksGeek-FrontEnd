import { LightningBoltIcon, BookOpenIcon, ChatAlt2Icon, ArrowCircleRightIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ColorModal from '../components/ColorModal'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import { ReactComponent as GithubSvg } from '../svg/github.svg'
import { ReactComponent as LeetCodeSvg } from '../svg/leetcode.svg'

const SocialMediaIcons = () => {
    return (
        <div className="flex justify-center my-2 gap-5">
            <a href="https://github.com/rentianle2022/LipsticksGeek-BackEnd" className="">
                <GithubSvg className='w-6 h-6 inline-block fill-white' />
            </a>
            <a href="https://leetcode.cn/u/rentianle2023/" className="">
                <LeetCodeSvg className='w-6 h-6 inline-block fill-white' />
            </a>
        </div>
    )
}

const Landing = () => {
    const [showModal, setShowModal] = useState(false)

    const nevigate = useNavigate()

    const gotoRecommand = () => {
        nevigate("/recommendation")
    }
    return (
        <div className="h-[700px] bg-hero flex justify-center items-center">
            {/* <div className='absolute bg-indigo-300 bg-opacity-20 h-full w-full z-1'></div> */}
            <div className="text-sm bg-gray-900 h-full w-full bg-opacity-40 flex flex-col justify-center gap8">
                <motion.div
                    className={`text-indigo-100 text-center`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: -0 }
                    }}
                >
                    <div className="font-bold text-3xl m-2 ">LipstickGeeks</div>
                    <div>帮助选择困难的男士</div>
                    <div>挑选合适女朋友的口红</div>
                </motion.div>

                <motion.div
                    className={`text-indigo-100 text-center`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: -0 }
                    }}
                >
                    <SocialMediaIcons />
                </motion.div>
                <motion.div
                    className={`flex justify-center gap-5 `}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: -0 }
                    }}
                >
                    <motion.div
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }} >
                        <div className="search-btn " onClick={() => setShowModal(true)}>颜色匹配</div>
                    </motion.div>
                    <motion.div
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }} >
                        <div className="search-btn " onClick={gotoRecommand}>给我推荐</div>
                    </motion.div>
                </motion.div>
                {showModal && <ColorModal closeModal={() => setShowModal(false)} />}
            </div>
        </div >
    )
}

const Features = () => {
    return (
        <div className="bg-gray-200 text-gray-900 p-10 h-full">
            <motion.div
                className={`text-2xl font-semibold mt-10`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: -0 }
                }}
            >
                功能 Features
            </motion.div>
            <div className='sm:flex sm:gap-20'>
                <motion.div
                    className={`flex-col-feature sm:basis-1/3`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                    }}
                >
                    <div className='flex flex-col items-center'>
                        <LightningBoltIcon className='h-12 w-12' />
                        <div className="font-bold text-xl">快速推荐</div>
                    </div>

                    <div>
                        <p>对口红一窍不通？</p>
                        <p>不用担心,小姐姐们多方位推荐</p>
                        <p>解决礼物购买的燃眉之急</p>
                    </div>
                    <Link to="/recommendation">
                        <motion.div
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }} >
                            <ArrowCircleRightIcon className='h-10 w-10' />
                        </motion.div>

                    </Link>
                </ motion.div>

                <motion.div
                    className={`flex-col-feature sm:basis-1/3`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                    }}
                >
                    <div className='flex flex-col items-center'>
                        <BookOpenIcon className='h-12 w-12' />
                        <div className="font-bold text-xl">口红百科</div>
                    </div>
                    <div>
                        <p>8大口红品牌最新官网数据</p>
                        <p>支持名称搜索，颜色搜索</p>
                        <p>挑选最适合她的</p>
                    </div>
                    <Link to="/wiki">
                        <motion.div
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }} >
                            <ArrowCircleRightIcon className='h-10 w-10' />
                        </motion.div>

                    </Link>
                </ motion.div>
                <motion.div
                    className={`flex-col-feature sm:basis-1/3`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                    }}
                >
                    <div className='flex flex-col items-center'>
                        <ChatAlt2Icon className='h-12 w-12' />
                        <div className="font-bold text-xl">社区交流</div>
                    </div>
                    <div>
                        <p>支持在线聊天，留言板</p>
                        <p>让买口红的你，不再孤单</p>
                    </div>
                    <Link to="/community">
                        <motion.div
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.1 },
                            }} >
                            <ArrowCircleRightIcon className='h-10 w-10' />
                        </motion.div>

                    </Link>
                </ motion.div>
            </div>

        </div>
    )
}

export default function Home() {

    return (
        <div className='h-full'>
            <Landing />
            <Features />
        </div>
    )
}