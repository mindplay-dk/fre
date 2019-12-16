/** @jsx h */
import { h, render, useEffect, useState } from '../src'

export const testRender = jsx =>
  new Promise(resolve => {
    document.body.innerHTML = ''

    render(jsx, document.body, () => resolve([...document.body.childNodes]))
  })

export const testUpdates = async updates => {
  let effect = () => {
    console.log("NOOP EFFECT")
  }
  let setContent

  const Component = () => {
    const [content, _setContent] = useState(updates[0].content)

    setContent = _setContent

    useEffect(effect)
    return content
  }

  const run = index => updates[index].test([...document.body.childNodes])

  await testRender(<Component />)

  for (let i = 0; i < updates.length; i++) {
    console.log("AWAIT ", i)
    await new Promise(resolve => {
      effect = () => {
        console.log("RUN TEST ", i)
        run(i)
        console.log("RESOLVE ", i)
        resolve()
      }
      console.log("SET CONTENT", i, updates[i].content, [...document.body.childNodes])
      setContent(updates[i].content)
    })
    console.log("RESOLVED ", i)
  }

  console.log("RETURN")
}
