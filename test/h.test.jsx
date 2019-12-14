/** @jsx h */

import { h } from "../src/h"
import { it } from "mocha"
import { expect } from "chai"

it('creates JSX node', () => {
  const div = <div/>

  expect(div).to.deep.equal({
    type: "div",
    key: null,
    ref: null,
    props: {}
  })
})

it('creates JSX node with key and props', () => {
  const div = <input key="foo" name="foo" value="bar"/>

  expect(div).to.deep.equal({
    type: "input",
    key: "foo",
    ref: null,
    props: {
      name: "foo",
      value: "bar"
    }
  })
})

it('creates JSX node with children', () => {
  const divs = (
    <div key="a">
      <div key="b">
        <div key="c"/>
      </div>
    </div>
  )

  expect(divs).to.deep.equal({
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

it('ignores `true`, `false`, `null` and `undefined` JSX literals', () => {
  const div = <div>{true}{false}{null}{undefined}</div>

  expect(div).to.deep.equal({
    type: "div",
    key: null,
    ref: null,
    props: {}
  })
})

it('emits JSX string/number literals', () => {
  const div = <div>{"hello"}{""}{123}</div>

  expect(div).to.deep.equal({
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

it('emits JSX component nodes', () => {
  const Component = ({ value }) => <input value={value}/>

  const div = <Component value={"foo"}>bar</Component>

  expect(div).to.deep.equal({
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