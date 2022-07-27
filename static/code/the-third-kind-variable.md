# plain variable can do something in React
Normally, there are two kinds of variables in React function component, the variable created by useState and the variable created by useRef. But a plain variable created by let can also do something valuable. See the following code.
```
function Component() {
    const [val, setVal] = useState(false)
    let timer
    //omit some code
    <span onMouseOver={() => { clearTimeout(timer); setVal(true) }}
        onMouseOut={() => timer = setTimeout(() => setVal(false), 1000)}
    >
    //omit some code
}
```
It's worked on my purpose! It's the third kind of variable that worked in React function component!
So, React is an unopinionated library, you have more than one path to reach the destination. For a beginner, it's harder to master than Vue.