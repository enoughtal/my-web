import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './index.sass'

const SQRT2 = 2 ** 0.5

function getPlacement({ row0, row1, row2, col0, col1, col2 }, place) {
    const tipStyle = {}
    switch (place) {
        case 'top':
            tipStyle.left = col1
            tipStyle.top = row0
            break
        case 'bottom':
            tipStyle.left = col1
            tipStyle.top = row2
            break
        case 'left':
            tipStyle.left = col0
            tipStyle.top = row1
            break
        case 'right':
            tipStyle.left = col2
            tipStyle.top = row1
            break
        case 'top-left':
            tipStyle.left = col0
            tipStyle.top = row0
            //tipStyle.borderBottomRightRadius = 0
            break
        case 'top-right':
            tipStyle.left = col2
            tipStyle.top = row0
            break
        case 'bottom-left':
            tipStyle.left = col0
            tipStyle.top = row2
            break
        case 'bottom-right':
            tipStyle.left = col2
            tipStyle.top = row2
            break
        case 'center':
            tipStyle.left = col1
            tipStyle.top = row1
            break
    }
    return tipStyle
}
function getTransform({ width, height }, place, arrowSize) {
    const arrowStyle = {}
    const contentStyle = {}
    switch (place) {
        case 'top':
            arrowStyle.transform = `translate(${(width - arrowSize) / 2}px, ${-arrowSize / 2}px) rotate(0.375turn)`
            break
        case 'bottom':
            arrowStyle.transform = `translate(${(width - arrowSize) / 2}px, ${-height + arrowSize / 2}px) rotate(-0.125turn)`
            break
        case 'left':
            arrowStyle.transform = `translate(${width - arrowSize / 2}px, ${-(height - arrowSize + arrowSize) / 2}px) rotate(0.125turn)`
            break
        case 'right':
            arrowStyle.transform = `translate(${-arrowSize / 2}px, ${-(height - arrowSize + arrowSize) / 2}px) rotate(-0.375turn)`
            break
        case 'top-left':
            arrowStyle.visibility = 'hidden'
            contentStyle.borderBottomRightRadius = 0
            contentStyle.transform = `translate(${arrowSize / SQRT2}px, ${arrowSize / SQRT2}px)`
            break
        case 'top-right':
            arrowStyle.visibility = 'hidden'
            break
        case 'bottom-left':
            arrowStyle.visibility = 'hidden'
            break
        case 'bottom-right':
            arrowStyle.visibility = 'hidden'
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

    let placement = {
        left: '0px',
        top: '0px'
    }
    //let initialPlace = {
    //    left: '0px',
    //    top: '0px'
    //}
    let arrowStyle = {}
    let contentStyle = {}

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
        const result = getTransform({ width: tipWidth, height: tipHeight }, place, arrowSize)
        arrowStyle = result.arrowStyle
        contentStyle = result.contentStyle
    }

    const tooltipStyle = {
        ...placement,
        //borderBottomRightRadius: 0,
        //backgroundColor: 'red',
        fontSize: size + 'rem',
        width
    }

    // 获取当前tooltip的尺寸，注意使用useLayoutEffect，在render之后commit（browser paint）之前
    // 先渲染不提交，得到尺寸后重新渲染，最后提交，这是使用useLayoutEffect的一种固定模式
    // 如果使用useEffect也看不出有什么区别，可能是因为速度太快
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
            style={tooltipStyle}
        >
            {
                isShow &&
                <>
                    <div className='tooltip-content'
                        style={contentStyle}
                    >
                        &nbsp;{children}&nbsp;
                    </div>
                    <div className='tooltip-arrow'
                        style={{...arrowStyle, width: arrowSize + 'px', height: arrowSize + 'px'}}
                    >
                    </div>
                </>
            }
        </div>
    )
}
