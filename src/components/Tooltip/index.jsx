import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './index.sass'

export default function Tooltip({ children, place, size = 1 }) {
    const tooltipRef = useRef()
    const parentSizeRef = useRef()
    const [isShow, setIsShow] = useState(false)
    const [tipWidth, setTipWidth] = useState(0)
    const [tipHeight, setTipHeight] = useState(0)

    const placement = {
        left: 0,
        top: 0
    }
    if (isShow) {
        const parent = parentSizeRef.current

        switch (place) {
            case 'top':
                placement.left = parent.left + (parent.width - tipWidth) / 2 + 'px'
                placement.top = parent.top - tipHeight + 'px'
                break
            case 'bottom':
                placement.left = parent.left + (parent.width - tipWidth) / 2 + 'px'
                placement.top = parent.bottom + 'px'
                break
            case 'left':
                placement.left = parent.left - tipWidth + 'px'
                placement.top = parent.top + (parent.height - tipHeight) / 2 + 'px'
                break
            case 'right':
                placement.left = parent.right + 'px'
                placement.top = parent.top + (parent.height - tipHeight) / 2 + 'px'
                break
        }
    }

    useLayoutEffect(() => {
        if (isShow) {
            const { width, height } = tooltipRef.current.getBoundingClientRect()
            setTipWidth(width)
            setTipHeight(height)
        }
    }, [isShow])

    useEffect(() => {
        const parent = tooltipRef.current.parentNode
        parentSizeRef.current = parent.getBoundingClientRect()

        function handlePointerEnter() {
            setIsShow(true)
        }
        function handlePointerLeave() {
            setIsShow(false)
        }
        parent.addEventListener('pointerenter', handlePointerEnter)
        parent.addEventListener('pointerleave', handlePointerLeave)

        return () => {
            parent.removeEventListener('pointerenter', handlePointerEnter)
            parent.removeEventListener('pointerleave', handlePointerLeave)
    }
    }, [])

    return (
        <div ref={tooltipRef}
            className='tooltip'
            style={{...placement, fontSize: size + 'rem'}}
        >
            {isShow && <>&nbsp;{children}&nbsp;</>}
        </div>
    )
}
