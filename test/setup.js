import tape from 'tape'
import usePromise from 'tape-promise'
import useDOM from 'jsdom-global'

export const test = usePromise(tape);

export function withDOM(test) {
  return async (...args) => {
    const cleanDOM = useDOM()
    const result = test(...args)
    cleanDOM()
    return result
  }
}
