import React from 'react'
import { shallow } from 'enzyme'
import { Dontpad } from 'packs/dontpad'

describe("Dontpad", () => {
  it("can be rendered", () => {
    expect(shallow(<Dontpad />)).toBeDefined()
  })

  it("is a textarea that sends its content to server", () => {
    window.fetch = jest.fn()
    const wrapper = shallow(<Dontpad />)
    wrapper.find("textarea").simulate('change', { target: { value: "text" } })
    expect(window.fetch).toHaveBeenCalledWith('/dontpad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "text": "text" })
    })
  })
})
