import { useContext, useEffect, useRef, useState } from 'react'
import { UNSAFE_NavigationContext, useNavigate } from 'react-router-dom'

/* https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743 */
export function useBlocker(blocker, when = true) {
    const { navigator } = useContext(UNSAFE_NavigationContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!when) return

        const unblock = navigator.block(tx => {
            const unblockTx = {
                ...tx,
                retry() {
                    unblock()
                    tx.retry()
                },
                redirect(pathname, opts = {}) {
                    unblock()
                    navigate(pathname, opts)
                }
            }

            blocker(unblockTx)
        })

        return unblock
    }, [navigator, blocker, when, navigate])
}

/* 防止连续点击按钮 */
export function useLock(delay = 500) {
    const [locked, setLocked] = useState(false)
    function lock() {
        setLocked(true)
        setTimeout(() => {
            setLocked(false)
        }, delay)
    }
    return [locked, lock]
}

/* 防止连续变更state导致的连续网络请求 */
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

/* 观察一个变量在前后渲染之间是否改变 */
export function useChanged(currVal) {
    const prevVal = useRef(currVal)
    useEffect(() => {
        prevVal.current = currVal
    }, [currVal])
    return currVal !== prevVal.current
}