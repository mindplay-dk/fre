/** @jsx h */

import { test } from "zora"
import { withDOM } from "./setup"

const h = (type, props, ...children) => ({ type, props, children })

test("all that jazz", withDOM(async is => {
  console.log(<div>foo</div>)

  document.body.appendChild(document.createElement("div"))
  is.equal(document.body.children.length, 1)

  await new Promise(resolve => {
    setTimeout(() => {
      is.equal(3, 3)

      resolve()
    }, 100)
  })
}))
