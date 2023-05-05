import { lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCategory } from '../../store/files'
import Loading from '../Loading'
import Category from './Category'
import FileContent from './FileContent'
import './index.sass'
const DropdownCategory = lazy(() => import('./DropdownCategory'))

export default function Blog() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    return (
        <div className='myapp-blog'>
            <div className='myapp-blog-main-center'>
                <div className='myapp-blog-main-center-catalog'>
                    <Suspense fallback={<Loading />}>
                        <DropdownCategory />
                    </Suspense>
                </div>

                <FileContent />
            </div>

            <div className='myapp-blog-main-right'>
                <Category />
            </div>
        </div>
    )
}