import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import TodoApp from "../TodoApp.vue"
import { Task } from "../models/task"

describe("TodoApp", () => {
  it("should add a task", async () => {
    const wrapper = mount(TodoApp)
    const taskName = "Test Task"

    // Simulate adding a task
    await wrapper.find("input").setValue(taskName)
    await wrapper.find("form").trigger("submit")

    // Check if the task is added
    const tasks = wrapper.vm.tasks as Task[]
    expect(tasks.length).toBe(1)
    expect(tasks[0].name).toBe(taskName)
  })

  it("should open a task", async () => {
    const wrapper = mount(TodoApp)
    const task: Task = {
      id: 1,
      name: "Test Task",
      notes: "",
      completed: false,
      dateCompleted: null,
    }
    wrapper.vm.tasks = [task]

    // Simulate opening a task
    await wrapper.find(".task-item").trigger("click")

    // Check if the task is opened
    expect(wrapper.vm.selectedTask).toEqual(task)
  })

  it("should update a task", async () => {
    const wrapper = mount(TodoApp)
    const task: Task = {
      id: 1,
      name: "Test Task",
      notes: "",
      completed: false,
      dateCompleted: null,
    }
    wrapper.vm.tasks = [task]
    wrapper.vm.selectedTask = task

    // Simulate updating the task
    const updatedName = "Updated Task"
    await wrapper.find('input[type="text"]').setValue(updatedName)
    await wrapper.find('button:contains("Save Changes")').trigger("click")

    // Check if the task is updated
    expect(wrapper.vm.tasks[0].name).toBe(updatedName)
  })

  it("should complete a task", async () => {
    const wrapper = mount(TodoApp)
    const task: Task = {
      id: 1,
      name: "Test Task",
      notes: "",
      completed: false,
      dateCompleted: null,
    }
    wrapper.vm.tasks = [task]
    wrapper.vm.selectedTask = task

    // Simulate completing the task
    await wrapper.find('button:contains("Mark as Completed")').trigger("click")

    // Check if the task is marked as completed
    expect(wrapper.vm.tasks[0].completed).toBe(true)
    expect(wrapper.vm.tasks[0].dateCompleted).not.toBeNull()
  })
})
