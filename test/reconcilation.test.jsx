/** @jsx h */
import { h } from '../src/index'
import { testUpdates } from './test-util'
import { test } from "zora"
import { withDOM } from "./setup"

test('reorder and reuse elements during key-based reconciliation of child-nodes', withDOM(async is => {
  const states = [
    [1, 2, 3],
    [3, 1, 2], // shift right
    [1, 2, 3],
    [2, 3, 1], // shift left
    [1, 2, 3],
    [1, 3], // remove from middle
    [1, 2, 3],
    [2, 3], // remove first
    [1, 2, 3],
    [1, 2], // remove last
    [1, 2, 3],
    [3, 2, 1], // reverse order
    [1, 2, 3]
  ]

  let lastChildren

  await testUpdates(
    states.map((state, stateNumber) => ({
      content: (
        <ul>
          {state.map(value => (
            <li key={value}>{value}</li>
          ))}
          <li/>
        </ul>
      ),
      test: elements => {
        const children = [...elements[0].children]

        children.pop() // remove trailing key-less element

        is.deepEqual(
          children.map(el => el.textContent),

          state.map(value => '' + value)
        )

        if (stateNumber >= 1) {
          const lastState = states[stateNumber - 1]

          state.forEach((value, index) => {
            const lastIndex = lastState.indexOf(value)

            if (lastIndex !== -1) {
              is.deepEqual(children[index], lastChildren[lastIndex])
            }
          })
        }

        lastChildren = children
      }
    }))
  )
}))
