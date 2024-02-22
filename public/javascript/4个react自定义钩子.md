# 4个react自定义钩子

## useToggle

```javascript
function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((value) => {
    setValue((currentValue) =>
      typeof value === 'boolean' ? value : !currentValue
    );
  }, []);

  return [value, toggle];
}
```

---

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

---

## useDebounce

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

---

## useUpdateEffect

```javascript
function useUpdateEffect(callback, deps) {
  const didMount = useRef(true);

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
      return;
    }
    return callback;
  }, deps);
}
```
