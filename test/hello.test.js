/** @jsx h */

import { test } from "zora"
import useDOM from 'jsdom-global'

const h = (type, props, ...children) => ({ type, props, children })

test("all that jazz", async (is) => {
  const cleanDOM = useDOM()

  console.log(<div>foo</div>)

  document.body.appendChild(document.createElement("div"))
  is.equal(document.body.children.length, 1)

  await new Promise(resolve => {
    setTimeout(() => {
      is.equal(3, 3)

      resolve()

      //setTimeout(() => is.equal(1, 2), 100)
    }, 1000)
  })

  //is.equal(1, 2);

  cleanDOM()
})
