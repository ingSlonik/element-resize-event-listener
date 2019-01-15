"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addResizeEventListener = addResizeEventListener;
exports.removeResizeEventListener = removeResizeEventListener;
exports.removeAllResizeEventListeners = removeAllResizeEventListeners;
exports.setCheckInterval = setCheckInterval;
exports.default = void 0;
// Magic constant
var interval = 250;
var listeners = [];
var timer = null;

function checkSizes() {
  listeners.forEach(function (listener) {
    var element = listener.element,
        size = listener.size,
        handler = listener.handler;

    var _getSize = getSize(element),
        width = _getSize.width,
        height = _getSize.height; // Some browsers has each measurement different.


    if (Math.abs(width - size.width) > 1 || Math.abs(height - size.height) > 1) {
      listener.size = {
        width: width,
        height: height
      };
      handler(element, {
        width: width,
        height: height
      });
    }
  });

  if (listeners.length > 0) {
    if (interval === "animationFrame") {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(checkSizes);
      } else {
        timer = setTimeout(checkSizes, 66);
      }
    } else {
      timer = setTimeout(checkSizes, interval);
    }
  } else {
    window.removeEventListener("resize", resizeEvent, false);
  }
}

function resizeEvent() {
  if (timer) {
    clearTimeout(timer);
  }

  checkSizes();
}

function getSize(element) {
  var _element$getBoundingC = element.getBoundingClientRect(),
      width = _element$getBoundingC.width,
      height = _element$getBoundingC.height;

  return {
    width: width,
    height: height
  };
} // Exported Listener functions


function addResizeEventListener(element, handler) {
  listeners.push({
    element: element,
    size: getSize(element),
    handler: handler
  });

  if (listeners.length === 1) {
    window.addEventListener("resize", resizeEvent, false);
    checkSizes();
  }
}

function removeResizeEventListener(element, handler) {
  listeners = listeners.filter(function (listener) {
    return element !== listener.element && handler !== listener.handler;
  });
}

function removeAllResizeEventListeners(element) {
  listeners = listeners.filter(function (listener) {
    return element !== listener.element;
  });
}

function setCheckInterval(customInterval) {
  interval = customInterval;
}

var _default = {
  addEventListener: addResizeEventListener,
  removeEventListener: removeResizeEventListener,
  removeAllEventListeners: removeAllResizeEventListeners,
  setCheckInterval: setCheckInterval
};
exports.default = _default;