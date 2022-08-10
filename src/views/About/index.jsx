import { lazy, Suspense } from 'react'
import './index.sass'
import list from './projects.json'
import Resume from './Resume'

const ProjectList = lazy(() => import('./ProjectList'))

export default function About() {
    return (
        <div className="myapp-about">
            <div className="myapp-about-main-left">
                <Resume />
            </div>

            <div className="myapp-about-main-center">
                <div className="myapp-about-main-center-headline">
                    个人项目
                </div>
                <hr />
                <Suspense fallback={<div>Loading...</div>}>
                    <ProjectList list={list}/>
                </Suspense>
            </div>
        </div>
    )
}