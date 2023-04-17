# 4个react自定义钩子

## useToggle

```javascript
function useToggle(initialValue) {
    const [value, setValue] = useState(initialValue)

    const toggle = useCallback(value => {
        setValue(currentValue => typeof value === 'boolean'
            ? value
            : !currentValue)
    }, [])

    return [value, toggle]
}
```

> toggle很常用
***

## useArray

```javascript
function useArray(initialValue = []) {
    const [array, setArray] = useState(initialValue)

    const push = (element) => {
        setArray(prevState => [...prevState, element])
    }

    const filter = (callback) => {
        setArray(prevState => prevState.filter(callback))
    }

    const update = (index, newElement) => {
        array[index] = newElement
        setArray([...array])
    }

    const remove = (index) => {
        setArray(prevState => prevState.filter((_, i) => i !== index)
    }

    const clear = () => {
        setArray([])
    }

    return {
        array,
        set: setArray,
        push,
        filter,
        update,
        remove,
        clear
    }
}
```

> 这个很实用
***

## useDebounce

```javascript
function useDebounce(value, delay) {
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
```

> 这个我已经实际用过
***

## useUpdateEffect

```javascript
function useUpdateEffect(callback, deps) {
    const didMount = useRef(true)

    useEffect(() => {
        if (didMount.current) {
            didMount.current = false
            return
        }
        return callback
    }, deps)
}
```

> 这个钩子似乎只有在StrictMode模式下才有意义。这个对理解useEffect有帮助，也可理解vue3中watch和watchEffect的区别——初始化时前者不执行后者执行
