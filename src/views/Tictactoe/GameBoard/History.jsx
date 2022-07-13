import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { themeClass } from '../../../tools/helper'
import '../index.sass'

export default function History({ currentStep, goToStep }) {
    const theme = useSelector(state => state.user.preference.theme)
    const [historyStep, setHistoryStep] = useState(0)//用来改变历史按钮的css类名

    useEffect(() => {
        setHistoryStep(0)
    }, [currentStep])//订阅currentStep，一更新说明已走子，historyStep归零

    const handleClick = (step) => {
        setHistoryStep(step)
        goToStep(step)
    }
    const reset =
        <button type='button'
            className={themeClass(theme, 'myapp-tic-main-center-history-reset')}
            onClick={() => handleClick(0)}
        >
            重新开始
        </button>

    const history =
        Array(9).fill().map((_, index) => {
            const step = index + 1
            let className = themeClass(theme, 'myapp-tic-main-center-history-button')
            className +=
                step > currentStep
                    ? ' myapp-tic-main-center-history-button-hidden'
                    : ' myapp-tic-main-center-history-button-visible'
            className +=
                step === historyStep
                    ? ' myapp-tic-main-center-history-button-select'
                    : ''

            return (
                <button type='button'
                    className={className}
                    key={step}
                    onClick={() => handleClick(step)}
                >
                    {step}
                </button>
            )
        })

    return (
        <div className='myapp-tic-main-center-history'>
            {reset}
            <div>
                {history}
            </div>
        </div>
    )
}