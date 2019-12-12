import useDOM from 'jsdom-global'

export function withDOM(test) {
  return async () => {
    const cleanDOM = useDOM()

    const result = await test()

    cleanDOM()

    return result
  }
}
