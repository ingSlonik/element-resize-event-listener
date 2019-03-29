# Element Resize Event Listener

Low performance resize event listener to HTML element.

I am sorry to all good programmers, but I tried all (2018) resize listener/events packages on npm.
No one works right for my usecase or it had really big CPU consumption and the clients had big problems with that.

With this motivation was created this package.
It is not working with absolutelly right programing approach. 
It works really easy and right for users and it is low performance.

Include types for TypeScript.

## API

```js
import resize from "element-resize-event-listener";

const element = document.getElementById("element");

function resizeHandler(element, size) {
    console.log(size); // { width: 150, height: 100 }
}

resize.setCheckInterval("animationFrame"); // default 250ms

resize.addEventListener(element, resizeHandler);
resize.removeEventListener(element, resizeHandler);
resize.removeAllEventListeners(element);
```
