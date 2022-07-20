import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/files'
import Category from './Category'
import './index.sass'

export default function Home() {
    const dispatch = useDispatch()
    const { title, createdAt, content } = useSelector(state => state.files.article)
    const time = createdAt ? new Date(createdAt).toISOString().slice(0, 10) : ''

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    return (
        <div className='myapp-home'>
            <div className='myapp-home-main-center'>
                <div className='myapp-home-main-center-title'>
                    {title.slice(title.indexOf(' '))}
                </div>

                <div className='myapp-home-main-center-time'>
                    {time}
                </div>

                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </div>

            <div className='myapp-home-main-right'>
                <Category />
            </div>
        </div>
    )
}