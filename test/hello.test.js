/** @jsx h */

import { test, withDOM } from "./setup"

const h = (type, props, ...children) => ({ type, props, children })

test(withDOM(async (is) => {
  is.equal(1, 1)
  console.log(<div>foo</div>)

  document.body.appendChild(document.createElement("div"))
  is.equal(document.body.children.length, 1)

  await new Promise(resolve => {
    setTimeout(() => {
      is.equal(3, 3)

      resolve()

      setTimeout(() => is.equal(1, 2), 2000)
    }, 1000)
  })

  //is.equal(1, 2);
}))
