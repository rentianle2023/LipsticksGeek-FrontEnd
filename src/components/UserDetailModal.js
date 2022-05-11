import Modal from "./Modal";

export default function UserDetailModal(props){

    console.log(props.userInfo)
    const {id,username,avatar,roles} = props.userInfo

    return (
        <Modal closeModal={props.closeModal} width={'40%'} height={'40%'}>
            
            <div className='w-44 text-xs'>
                <div className='justify-around items-center'>
                    <img className='h-20 w-20' src={avatar} />
                    <div>
                        <div>
                            {roles.some((role) => role.id === 2) && <div className='text-red-500 inline text-xs'>管理员</div>}
                            {username}

                        </div>
                        <div>id :{id}</div>

                    </div>
                    <div>
                        <div className='button bg-gray-300 text-xs'>查看空间</div>
                        <div className='button bg-gray-300 text-xs mt-1'>私聊</div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}