import { GithubOutlined, WechatOutlined } from '@ant-design/icons'
import { useState } from 'react'
import avatar from '../../../img/avatar-transparent.png'
import '../index.sass'

export default function Resume() {
    const [showWx, setShowWx] = useState(false)
    let timer
    return (
        <div className='myapp-about-main-left-resume'>
            <img src={avatar}
                alt='avatar'
            />

            <div>
                <a href='https://github.com/enoughtallisymcrift'
                    target='_blank'
                    rel='noreferrer'
                >
                    <GithubOutlined />
                </a>
                &nbsp;&nbsp;
                <span onMouseOver={() => { clearTimeout(timer); setShowWx(true) }}
                    onMouseOut={() => timer = setTimeout(() => setShowWx(false), 1000)}
                >
                    <WechatOutlined />
                    {showWx &&
                    <span className='myapp-about-main-left-resume-wx'>
                        yzchendan86
                    </span>}
                </span>
            </div>
        </div>
    )
}