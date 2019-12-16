import tape from "tape"
import usePromise from "tape-promise"
import { JSDOM } from "jsdom"

export const test = usePromise(tape)

export function withDOM(test) {
  return (...args) => {
    const dom = new JSDOM('');

    const { window } = dom;

    global.window = window
    global.document = window.document

    global.requestAnimationFrame = setTimeout
    global.cancelAnimationFrame = clearTimeout

    copyProps(window, global);

    const result = test(...args)

    // TODO clean up globals??

    return result
  }
}

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  })
}
