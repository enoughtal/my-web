import './index.sass'
import ProjectList from './ProjectList'
import list from './projects.json'
import Resume from './Resume'

export default function About() {
    return (
        <div className="myapp-about">
            <div className="myapp-about-main-left">
                <Resume />
            </div>

            <div className="myapp-about-main-center">
                <div className="myapp-about-main-center-headline">
                    个人项目：
                </div>
                <ProjectList list={list}/>
            </div>
        </div>
    )
}