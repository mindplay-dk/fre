import { JSDOM } from "jsdom"

// TODO testWithDOM() and direct integration with zora instead?
export function withDOM(test) {
  return async (...args) => {
    const dom = new JSDOM('')
    // const dom = new JSDOM('', { pretendToBeVisual: true })

    const { window } = dom

    global.window = window
    global.document = window.document

    // global.requestAnimationFrame = setTimeout
    // global.cancelAnimationFrame = clearTimeout

    copyProps(window, global)

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
