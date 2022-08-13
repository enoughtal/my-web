# node Buffer to web String
If writing the following code in Node,
```
readFile(filePath)
```
it will return a Buffer. While on the Web site, I use the following code to convert the Buffer to String.
```
//Buffer is in res.text
new TextDecoder().decode(new Uint8Array(res.text.data))
```
It's like a trick. I know if sending a Buffer, the Response instance has a method text() that can do this directly. But, in some cases, the Response is an Object and the Buffer is a property of the Object liking the upon code.

If writing code in Node like this,
```
readFile(filePath, { encoding: 'utf8' })
```
it will return a String directly. Obviously, it's more convenient.
