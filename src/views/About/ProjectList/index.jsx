import { useState } from 'react'
import '../index.sass'

export default function ProjectList({ list }) {
    const [folded, setFolded] = useState(list.map(() => true))
    const handleFold = (index) => {
        setFolded(state => state.map((val, key) => {
            if (key === index) {
                return !val
            }
            return val
        }))
    }

    return (
        list.map((project, index) => (
            <div className='myapp-about-main-center-project'
                key={project.name}
            >
                <div className='myapp-about-main-center-project-title'>
                    {project.name}
                </div>

                <div className='myapp-about-main-center-project-subtitle'>
                    <div className='myapp-about-main-center-project-subtitle-description'>
                        {project.description}
                    </div>

                    <div className='myapp-about-main-center-project-subtitle-code'>
                        <a href={project.code}
                            target='_blank'
                            rel='noreferrer'
                        >
                            仓库
                        </a>
                    </div>
                </div>

                <div className='myapp-about-main-center-project-content'>
                    <div className='myapp-about-main-center-project-content-libraries'>
                        {project.libraries.map((lib) => (
                            <span key={lib}
                                className='myapp-about-main-center-project-content-libraries-tag'
                            >
                                {lib}
                            </span>
                        ))}
                    </div>

                    <div className='myapp-about-main-center-project-content-more'>
                        {folded[index]
                        ? (
                            <a onClick={() => handleFold(index)}>
                                更多……
                            </a>
                        )
                        : (
                            <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;{project.details}
                                <br />
                                <a onClick={() => handleFold(index)}>
                                    收起。
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ))
    )
}