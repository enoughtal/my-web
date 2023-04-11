import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './index.sass'

const SQRT2 = 2 ** 0.5 // 根号2

// 计算tip放置位置的left，top值
function getPlacement({ row0, row1, row2, col0, col1, col2 }, place) {
    const placement = {}
    switch (place) {
        case 'top':
            placement.left = col1
            placement.top = row0
            break
        case 'bottom':
            placement.left = col1
            placement.top = row2
            break
        case 'left':
            placement.left = col0
            placement.top = row1
            break
        case 'right':
            placement.left = col2
            placement.top = row1
            break
        case 'top-left':
            placement.left = col0
            placement.top = row0
            break
        case 'top-right':
            placement.left = col2
            placement.top = row0
            break
        case 'bottom-left':
            placement.left = col0
            placement.top = row2
            break
        case 'bottom-right':
            placement.left = col2
            placement.top = row2
            break
        case 'center':
            placement.left = col1
            placement.top = row1
            break
    }
    return placement
}

// 计算箭头的transform值，和一些相关的style
function getStyle(tipWidth, tipHeight, place, arrowSize) {
    const arrowStyle = {}
    const contentStyle = {}
    switch (place) {
        case 'top':
            arrowStyle.transform = `translate(${(tipWidth - arrowSize) / 2}px, ${-arrowSize / 2}px) rotate(0.375turn)`
            break
        case 'bottom':
            arrowStyle.transform = `translate(${(tipWidth - arrowSize) / 2}px, ${-tipHeight + arrowSize / 2}px) rotate(-0.125turn)`
            break
        case 'left':
            arrowStyle.transform = `translate(${tipWidth - arrowSize / 2}px, ${-(tipHeight - arrowSize + arrowSize) / 2}px) rotate(0.125turn)`
            break
        case 'right':
            arrowStyle.transform = `translate(${-arrowSize / 2}px, ${-(tipHeight - arrowSize + arrowSize) / 2}px) rotate(-0.375turn)`
            break
        case 'top-left':
            arrowStyle.visibility = 'hidden'
            contentStyle.borderBottomRightRadius = 0
            contentStyle.transform = `translate(${arrowSize / SQRT2}px, ${arrowSize / SQRT2}px)`
            break
        case 'top-right':
            arrowStyle.visibility = 'hidden'
            contentStyle.borderBottomLeftRadius = 0
            contentStyle.transform = `translate(${-arrowSize / SQRT2}px, ${arrowSize / SQRT2}px)`
            break
        case 'bottom-left':
            arrowStyle.visibility = 'hidden'
            contentStyle.borderTopRightRadius = 0
            contentStyle.transform = `translate(${arrowSize / SQRT2}px, ${-arrowSize / SQRT2}px)`
            break
        case 'bottom-right':
            arrowStyle.visibility = 'hidden'
            contentStyle.borderTopLeftRadius = 0
            contentStyle.transform = `translate(${-arrowSize / SQRT2}px, ${-arrowSize / SQRT2}px)`
            break
        case 'center':
            arrowStyle.visibility = 'hidden'
            break
    }
    return { arrowStyle, contentStyle }
}

export default function Tooltip({
    children,
    place = 'top',
    size = 1,
    width = 'max-content',
    arrowSize = 8
}) {
    const tooltipRef = useRef()

    const [isShow, setIsShow] = useState(false)
    const [tipWidth, setTipWidth] = useState(0)
    const [tipHeight, setTipHeight] = useState(0)

    let placement = {}
    let arrowStyle = {}
    let contentStyle = {}
    ;(function setCss() {
        if (tooltipRef.current && isShow) {
            const parent = tooltipRef.current.parentNode.getBoundingClientRect()
            const viewHeight = document.body.clientHeight
            const viewWidth = document.body.clientWidth

            const row0 = Math.max(parent.top - tipHeight + arrowSize - arrowSize / SQRT2, 0) + 'px'
            const row1 = parent.top + (parent.height - tipHeight + arrowSize) / 2 + 'px'
            const row2 = Math.min(parent.bottom + arrowSize / SQRT2, viewHeight - tipHeight) + 'px'
            const col0 = Math.max(parent.left - tipWidth - arrowSize / SQRT2, 0) + 'px'
            const col1 = parent.left + (parent.width - tipWidth) / 2 + 'px'
            const col2 = Math.min(parent.right + arrowSize / SQRT2, viewWidth - tipWidth) + 'px'

            placement = getPlacement({ row0, row1, row2, col0, col1, col2 }, place)

            const style = getStyle(tipWidth, tipHeight, place, arrowSize)
            arrowStyle = style.arrowStyle
            contentStyle = style.contentStyle
        }
    })()
    // 获取当前tooltip的尺寸，注意使用useLayoutEffect，在render之后commit（browser paint）之前
    useLayoutEffect(() => {
    //useEffect(() => {
        if (isShow) {
            const { width, height } = tooltipRef.current.getBoundingClientRect()
            setTipWidth(width)
            setTipHeight(height)
        }
    }, [isShow])

    // 给父组件注册鼠标覆盖事件
    useEffect(() => {
        const parent = tooltipRef.current.parentNode

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
            style={{
                ...placement,
                fontSize: size + 'rem',
                width
            }}
        >
            {
                isShow &&
                <>
                    <div className='tooltip-content'
                        style={{...contentStyle}}
                    >
                        &nbsp;{children}&nbsp;
                    </div>
                    <div className='tooltip-arrow'
                        style={{
                            ...arrowStyle,
                            width: arrowSize + 'px',
                            height: arrowSize + 'px'
                        }}
                    >
                    </div>
                </>
            }
        </div>
    )
}
