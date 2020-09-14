# Node.js

## Classes

<dl>
    <dt>
        <a href="#ImageData">ImageData</a>
    </dt>
    <dd>
        <p>Polyfill for <a href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData">ImageData</a></p>
    </dd>
</dl>

## Functions

<dl>
    <dt>
        <a href="#get">get(image, callback)</a>
    </dt>
    <dd>
        <p>Asynchronously get an <code>ImageData</code> instance based on provided input</p>
    </dd>
    <dt>
        <a href="#getSync">getSync(image)</a> ⇒ <code>ImageData</code>
    </dt>
    <dd>
        <p>Synchronously get an <code>ImageData</code> instance based on provided input</p>
    </dd>
</dl>

<a name="ImageData"></a>

## ImageData
Polyfill for [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)

<a name="new_ImageData"></a>

### new ImageData(object)
Create a new `ImageData` instance from an object literal

**Throws**:

- `Error` 

| Param | Type |
| --- | --- |
| object | `Object` |

<a name="get"></a>

## get(image, callback)
Asynchronously get an `ImageData` instance based on provided input

**Throws**:

- `Error` 

| Param | Type |
| --- | --- |
| image | `string` \| `Buffer` \| `ReadStream` | 
| callback | `function` | 

<a name="getSync"></a>

## getSync(image) ⇒ `ImageData`
Synchronously get an `ImageData` instance based on provided input

**Throws**:

- `Error` 

| Param | Type |
| --- | --- |
| image | `string` \| `Buffer` |
