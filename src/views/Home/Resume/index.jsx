import { GithubOutlined, WechatOutlined } from '@ant-design/icons'
import { useState } from 'react'
import avatar from '../../../img/avatar-transparent.png'
import '../index.sass'

export default function Resume() {
    const [showWx, setShowWx] = useState(false)
    return (
        <div className='myapp-home-main-left-resume'>
            <img src={avatar}
                alt='avatar'
            />

            <div>
                <a href='https://github.com/enoughtal'
                    target='_blank'
                    rel='noreferrer'
                >
                    <GithubOutlined />
                </a>
                &nbsp;&nbsp;
                <span onMouseOver={() => setShowWx(true)}
                    onMouseOut={() => setShowWx(false)}
                >
                    <WechatOutlined />
                </span>
                {showWx &&
                <span className='myapp-home-main-left-resume-wx'>
                    yzchendan86
                </span>
                }
            </div>
        </div>
    )
}