# Browser

## Functions

<dl>
    <dt>
        <a href="#get">get(data, callback)</a>
    </dt>
    <dd>
        <p>Asynchronously get an <code>ImageData</code> instance based on provided data</p>
    </dd>
    <dt>
        <a href="#getSync">getSync(image)</a> ⇒ <code>ImageData</code>
    </dt>
    <dd>
        <p>Synchronously get an <code>ImageData</code> instance based on provided image</p>
    </dd>
</dl>

<a name="get"></a>

## get(data, callback)
Asynchronously get an <code>ImageData</code> instance based on provided data

**Throws**:

- <code>Error</code> If the data argument is not a string, HTMLImageElement, File or Blob
- <code>Error</code> If the callback argument is not a function

| Argument | Type |
| --- | --- |
| data | `string` \| `HTMLImageElement` \| `File` \| `Blob` | 
| callback | `function` | 

<a name="getSync"></a>

## getSync(image) ⇒ `ImageData`

Synchronously get an <code>ImageData</code> instance based on provided image

**Throws**:

- <code>Error</code> If the image argument is not an HTMLImageElement
- <code>Error</code> If the image has not completed loading

| Argument | Type |
| --- | --- |
| image | `HTMLImageElement` | 
