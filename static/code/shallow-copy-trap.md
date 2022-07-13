# shallow copy trap
You must care about the shallow copy trap when meeting an object or array nests in another object.

I wrote the following code.

```
class Ai {
    constructor() {
        this.lines = Ai.winLines.map(line => new LineOfWin(line))
    }
    static winLines = [
        ['00', '01', '02'],
        ['10', '11', '12'],
    ]
}
```

I found a bug that different Ai instances seem to share a common state. I soon located the bug source, the class static variable. So, I changed a line in the code as follows.

```
this.lines = Ai.winLines.slice().map(line => new LineOfWin(line))
```

I used a slice method before the map since I know the slice is an immutable method that returns a new array with the source array unchanged. But, when I ran the code, the bug was still alive. Later, I found the static variable was a 2-dimension array, a nested object that all property is reference pointed by many variables. While the slice is a **shallow-copy** method, which creates a root object and points to the references of the nested objects instead of creating them. So, I rewrote the code as follows.

```
this.lines = Ai.winLines.map(line => new LineOfWin(line.slice()))
```
Note that I used the slice inside the map callback. Then it worked.
