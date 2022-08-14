import ReactMarkdown from 'react-markdown'
import './index.sass'

const statement = `
### 3点说明
1. 个人自学前端
1. BOSS直聘上的工作经历不连贯，是因为没有上班
1. 之前没有在正规软件公司上过班，做的项目是公司实验项目，并没有立项
***
###
`

export default function PersonalStatement() {
    return (
        <div className='myapp-comp-personalstatement'>
            <ReactMarkdown>{statement}</ReactMarkdown>
        </div>
    )
}