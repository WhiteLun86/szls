/**
 * 事件节流
 * @param {*} callBack
 * @param {*} delay
 * @returns
 */
export function throttle(callBack, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        callBack();
        timer = null;
      }, delay);
    }
  };
}

/**
 * 事件防抖
 * @param {*} callBack
 * @param {*} delay
 * @returns
 */
export function debounce(callBack, delay) {
  let timer = null;
  return function () {
    let arg = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      callBack.apply(this, arg);
    }, delay);
  };
}
