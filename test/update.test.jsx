/** @jsx h */
import { h, useState, useRef } from '../src/index'
import { testUpdates } from './test-util'
import { withDOM } from "./setup"
import { test } from "zora"

test('async state update', withDOM(async is => {
  let updates = 0

  const Component = () => {
    const [count, setState] = useState(0)

    updates += 1

    return <button onClick={() => setState(count => count + 1)}>{count}</button>
  }

  const content = <Component />

  await testUpdates([
    {
      content,
      test: ([button]) => {
        is.equal(+button.textContent, 0)
        is.equal(updates, 1)

        // trigger several functional state updates:
        button.click()
        button.click()
        button.click()
      }
    },
    {
      content,
      test: ([button]) => {
        is.equal(+button.textContent, 3) // all 3 state updates applied
        is.equal(updates, 2)
      }
    }
  ])
}))

test('persist reference to any value', withDOM(async is => {
  const Component = () => {
    const ref = useRef('')

    ref.current = ref.current + 'x'

    return <p>{ref.current}</p>
  }

  await testUpdates([
    {
      content: <Component value={1}/>,
      test: ([p]) => {
        is.equal(p.textContent, 'x')
      }
    },
    {
      content: <Component value={2}/>,
      test: ([p]) => {
        is.equal(p.textContent, 'xx')
      }
    }
  ])
}))

test('render/update object properties and DOM attributes', withDOM(async is => {
  let lastChildren = []

  await testUpdates([
    {
      content: (
        <ul>
          <li class="foo" />
          <li className="bar" />
          <li data-something="baz" data-remove-me tabIndex={123} />
        </ul>
      ),
      test: elements => {
        is.equal(elements[0].tagName, 'UL')
        is.equal(elements[0].children.length, 3)
        is.equal(elements[0].children[0].getAttribute('class'), 'foo')
        is.equal(elements[0].children[1].className, 'bar')
        is.equal(elements[0].children[2].getAttribute('data-something'), 'baz')
        is.equal(elements[0].children[2].hasAttribute('data-remove-me'), true)
        is.equal(elements[0].children[2].tabIndex, 123)

        lastChildren = [...elements[0].children]
      }
    },
    {
      content: (
        <ul>
          <li class="foo2" />
          <li className="bar2" />
          <li data-something="baz2" tabIndex={99} />
        </ul>
      ),
      test: elements => {
        is.equal(elements[0].tagName, 'UL')
        is.equal(elements[0].children.length, 3)
        is.equal(elements[0].children[0].getAttribute('class'), 'foo2')
        is.equal(elements[0].children[1].className, 'bar2')
        is.equal(elements[0].children[2].getAttribute('data-something'), 'baz2')
        is.equal(elements[0].children[2].hasAttribute('data-remove-me'), false)
        is.equal(elements[0].children[2].tabIndex, 99)

        lastChildren.forEach((lastChild, index) =>
          is.equal(elements[0].children[index], lastChild)
        )
      }
    },
    {
      content: 'removed',
      test: ([text]) => {
        is.equal(text.textContent, 'removed')
      }
    }
  ])
}))

test('attach/remove DOM event handler', withDOM(async is => {
  let clicks = 0

  const handler = () => (clicks += 1)

  await testUpdates([
    {
      content: <button onclick={handler}>OK</button>,
      test: ([button]) => {
        button.click()

        is.equal(clicks, 1)
      }
    },
    {
      content: <button>OK</button>,
      test: ([button]) => {
        button.click()

        is.equal(clicks, 1) // doesn't trigger handler, which has been removed
      }
    }
  ])
}))

test('diff style-object properties', withDOM(async is => {
  await testUpdates([
    {
      content: <div style={{ color: 'red', backgroundColor: 'blue' }} />,
      test: ([div]) => {
        is.equal(div.style.color, 'red')
        is.equal(div.style.backgroundColor, 'blue')
      }
    },
    {
      content: <div style={{ color: 'yellow', fontSize: '99px' }} />,
      test: ([div]) => {
        is.equal(div.style.color, 'yellow')
        is.equal(div.style.backgroundColor, '')
        is.equal(div.style.fontSize, '99px')
      }
    },
    {
      content: <div />,
      test: ([div]) => {
        is.equal(div.style.color, '')
      }
    }
  ])
}))
