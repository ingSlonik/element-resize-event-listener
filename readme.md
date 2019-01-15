# Element Resize Event Listener

Low performance resize event listener to HTML element.

## API

```js
import resize from "element-resize-event-listener";

const element = document.getElementById("element");

function resizeHandler(element, size) {
    console.log(size); // { width: 150, height: 100 }
}

resize.addEventListener(element, resizeHandler);
resize.removeEventListener(element, resizeHandler);
resize.removeAllEventListener(element);
```
