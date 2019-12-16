/** @jsx h */

import { h } from "../src/h"
import { test } from "zora"

test('create JSX node', is => {
  const div = <div/>

  is.deepEqual(div, {
    type: "div",
    key: null,
    ref: null,
    props: {}
  })
})

test('create JSX node with key and props', is => {
  const div = <input key="foo" name="foo" value="bar"/>

  is.deepEqual(div, {
    type: "input",
    key: "foo",
    ref: null,
    props: {
      name: "foo",
      value: "bar"
    }
  })
})

test('create JSX node with children', is => {
  const divs = (
    <div key="a">
      <div key="b">
        <div key="c"/>
      </div>
    </div>
  )

  is.deepEqual(divs, {
    type: "div",
    key: "a",
    ref: null,
    props: {
      children: {
        type: "div",
        key: "b",
        ref: null,
        props: {
          children: {
            type: "div",
            key: "c",
            ref: null,
            props: {}
          }
        }
      }
    }
  })
})

test('ignore `true`, `false`, `null` and `undefined` JSX literals', is => {
  const div = <div>{true}{false}{null}{undefined}</div>

  is.deepEqual(div, {
    type: "div",
    key: null,
    ref: null,
    props: {}
  })
})

test('emit JSX string/number literals', is => {
  const div = <div>{"hello"}{""}{123}</div>

  is.deepEqual(div, {
    type: "div",
    key: null,
    ref: null,
    props: {
      children: [
        { type: "text", props: { nodeValue: "hello" } },
        { type: "text", props: { nodeValue: "" } },
        { type: "text", props: { nodeValue: 123 } },
      ]
    }
  })
})

test('emit JSX component nodes', is => {
  const Component = ({ value }) => <input value={value}/>

  const div = <Component value={"foo"}>bar</Component>

  is.deepEqual(div, {
    type: Component,
    key: null,
    ref: null,
    props: {
      value: "foo",
      children: {
        type: "text",
        props: { nodeValue: "bar" }
      }
    }
  })
})