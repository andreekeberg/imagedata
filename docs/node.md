# Node.js

## Classes

<dl>
    <dt>
        <a href="#ImageData">ImageData</a>
    </dt>
    <dd>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData">ImageData</a> polyfill for Node.js</p>
    </dd>
</dl>

## Functions

<dl>
    <dt>
        <a href="#get">get(data, callback)</a>
    </dt>
    <dd>
        <p>Asynchronously get an <code>ImageData</code> instance based on provided data</p>
    </dd>
    <dt>
        <a href="#getSync">getSync(data)</a> ⇒ <code>ImageData</code>
    </dt>
    <dd>
        <p>Synchronously get an <code>ImageData</code> instance based on provided data</p>
    </dd>
</dl>

<a name="ImageData"></a>

## ImageData
[ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) polyfill for Node.js

<a name="new_ImageData"></a>

### new ImageData(object)
Create a new `ImageData` instance from an object literal

**Throws**:

- <code>Error</code> If the object argument is not an object literal
- <code>Error</code> If the object argument is missing required data parameter
- <code>Error</code> If the object argument is missing required width parameter
- <code>Error</code> If the object argument is missing required height parameter

| Param | Type |
| --- | --- |
| object | `Object` |

<a name="get"></a>

## get(data, callback)
Asynchronously get an `ImageData` instance based on provided data

**Throws**:

- <code>Error</code> If the data argument is not a string, Buffer, or ReadStream
- <code>Error</code> If the callback argument is not a function

| Param | Type |
| --- | --- |
| data | `string` \| `Buffer` \| `ReadStream` | 
| callback | `function` | 

<a name="getSync"></a>

## getSync(data) ⇒ `ImageData`
Synchronously get an `ImageData` instance based on provided data

**Throws**:

- <code>Error</code> If the data argument is not a string or Buffer
- <code>Error</code> If the data argument is a string and the file could not be found
- <code>Error</code> If the mime type could not be retrieved
- <code>Error</code> If no image decoder could be found for the mime type

| Param | Type |
| --- | --- |
| data | `string` \| `Buffer` |
