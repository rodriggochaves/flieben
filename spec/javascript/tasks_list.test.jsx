import React from 'react'
import { shallow, mount } from 'enzyme'
import nock from 'nock';
import { TasksList } from 'packs/tasks_list'

describe("Task List Component", () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(url => {
      if(url = '/tasks') {
        return Promise.resolve({
          json: () => {
            return Promise.resolve({
              tasks: [
                { id: 1, description: "buy mac pro" }
              ]
            })
          }
        })
      }
    })
  })

  it('can be created with one task', async() => {
    const wrapper = shallow(<TasksList />)
    await wrapper.instance().fetchTodoTasks()
    await wrapper.update()
    const task = wrapper.find('.task').at(0)
    expect(task.find('span').text()).toEqual("buy mac pro")
  })

  it("can edit a task by double click", async() => {
    const wrapper = shallow(<TasksList />)
    await wrapper.instance().fetchTodoTasks()
    await wrapper.update()
    const task = wrapper.find('.task').at(0)
    task.simulate('doubleClick')
    expect(task.find("input[type='text']").length).toEqual(1)
  })
})