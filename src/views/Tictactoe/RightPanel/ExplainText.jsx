import { useState } from 'react'
import { powerValues, scoreValues } from '../../../tools/variables'
import '../index.sass'

export default function ExplainText() {
    const [cheat, setCheat] = useState(false)

    return (
        <>
            <table className='myapp-tic-main-right-explain'>
                <tbody>
                    <tr>
                        <th>结果</th>
                        <th>得分</th>
                    </tr>
                    <tr>
                        <td>平简单</td>
                        <td className='myapp-tic-main-right-explain-number'>+{scoreValues[0]}</td>
                    </tr>
                    <tr>
                        <td>平困难</td>
                        <td className='myapp-tic-main-right-explain-number'>+{scoreValues[1]}</td>
                    </tr>
                    <tr>
                        <td>胜简单</td>
                        <td className='myapp-tic-main-right-explain-number'>+{scoreValues[2]}</td>
                    </tr>
                    <tr>
                        <td>胜困难</td>
                        <td className='myapp-tic-main-right-explain-number'>+{scoreValues[3]}</td>
                    </tr>

                    <tr>
                        <th>战力</th>
                        <th>称号</th>
                    </tr>
                    <tr>
                        <td className='myapp-tic-main-right-explain-number'>{powerValues[1]}</td>
                        <td>孤者</td>
                    </tr>
                    <tr>
                        <td className='myapp-tic-main-right-explain-number'>{powerValues[2]}</td>
                        <td>勇者</td>
                    </tr>
                    <tr>
                        <td className='myapp-tic-main-right-explain-number'>{powerValues[3]}</td>
                        <td>孤勇者</td>
                    </tr>
                    <tr>
                        <td className='myapp-tic-main-right-explain-number'>{powerValues[4]}</td>
                        <td>
                            <span onClick={() => setCheat(state => !state)}
                                className='myapp-tic-main-right-explain-number-clue'
                            >
                                孤独患者
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            {cheat &&
            <span className='myapp-tic-main-right-explain-cheat'>
                <span>complete it<br />in practice</span>
                <br />
                ⚔️🛡️🛡️
                <br />
                ⚔️⚔️🛡️
                <br />
                🛡️⚔️⚔️
            </span>}
        </>
    )
}