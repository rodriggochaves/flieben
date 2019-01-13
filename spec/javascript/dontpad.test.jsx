import React from 'react'
import { shallow } from 'enzyme'
import { Dontpad } from 'packs/dontpad'

describe("Dontpad", () => {
  it("can be rendered", () => {
    expect(shallow(<Dontpad />)).toBeDefined()
  })

  it("is a textarea that sends its content to server", () => {
    const mock = jest.fn()
    const wrapper = shallow(<Dontpad />)
    wrapper.instance().requestUpdate = mock
    wrapper.find("textarea").simulate('change', { target: { value: "text" } })
    expect(mock).toHaveBeenCalled()
  })
})
