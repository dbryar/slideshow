import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import TodoApp from "../TodoApp.vue"
import { Task } from "../models/task"

describe("TodoApp", () => {
  it("should handle the complete workflow: add task, edit details, save, and complete", async () => {
    const wrapper = mount(TodoApp)

    // 1. Add a new task
    const taskName = "Test Task"
    const input = wrapper.find('input[type="text"]')
    const form = wrapper.find("form")

    await input.setValue(taskName)
    await form.trigger("submit")

    // Verify task was added
    expect(wrapper.vm.tasks).toHaveLength(1)
    expect(wrapper.vm.tasks[0].name).toBe(taskName)
    expect(wrapper.vm.tasks[0].completed).toBe(false)

    // 2. Open the task details by clicking on the task item
    await wrapper.vm.$nextTick() // Wait for DOM update
    const taskItem = wrapper.find(".task-item")
    expect(taskItem.exists()).toBe(true)

    await taskItem.trigger("click")

    // Verify task details opened
    expect(wrapper.vm.selectedTask).toBeTruthy()
    expect(wrapper.vm.selectedTask?.id).toBe(wrapper.vm.tasks[0].id)

    // Wait for task details component to render
    await wrapper.vm.$nextTick()
    const taskDetails = wrapper.find(".task-details")
    expect(taskDetails.exists()).toBe(true)

    // 3. Add notes to the task
    const notes = "These are test notes for the task"
    const notesTextarea = wrapper.find("textarea")
    expect(notesTextarea.exists()).toBe(true)

    await notesTextarea.setValue(notes)

    // 4. Save the task
    const saveButton = wrapper.find(".save-button")
    expect(saveButton.exists()).toBe(true)

    await saveButton.trigger("click")

    // Verify notes were saved
    expect(wrapper.vm.tasks[0].notes).toBe(notes)

    // 5. Mark the task as completed
    const markCompletedButton = wrapper.find(".mark-completed button")
    expect(markCompletedButton.exists()).toBe(true)
    expect(markCompletedButton.text()).toContain("Mark as Completed")

    await markCompletedButton.trigger("click")

    // Verify task was marked as completed
    expect(wrapper.vm.tasks[0].completed).toBe(true)
    expect(wrapper.vm.tasks[0].dateCompleted).toBeTruthy()

    // 6. Verify the button is now disabled
    await wrapper.vm.$nextTick()
    expect(markCompletedButton.attributes("disabled")).toBeDefined()

    // 7. Verify the status display shows completed
    const statusSpan = wrapper.find(".status-section span")
    expect(statusSpan.text()).toContain("✅ Completed")
    expect(statusSpan.classes()).toContain("completed")
  })

  it("should close task details when close button is clicked", async () => {
    const wrapper = mount(TodoApp)

    // Add a task first
    const input = wrapper.find('input[type="text"]')
    const form = wrapper.find("form")

    await input.setValue("Test Task")
    await form.trigger("submit")

    // Open task details
    await wrapper.vm.$nextTick()
    const taskItem = wrapper.find(".task-item")
    await taskItem.trigger("click")

    // Verify task details is open
    expect(wrapper.vm.selectedTask).toBeTruthy()
    await wrapper.vm.$nextTick()
    expect(wrapper.find(".task-details").exists()).toBe(true)

    // Click close button
    const closeButton = wrapper.find(".close-button")
    expect(closeButton.exists()).toBe(true)

    await closeButton.trigger("click")

    // Verify task details is closed
    expect(wrapper.vm.selectedTask).toBeNull()
    await wrapper.vm.$nextTick()
    expect(wrapper.find(".task-details").exists()).toBe(false)
  })

  it("should handle editing task name and saving changes", async () => {
    const wrapper = mount(TodoApp)

    // Add a task
    const originalName = "Original Task"
    const input = wrapper.find('input[type="text"]')
    const form = wrapper.find("form")

    await input.setValue(originalName)
    await form.trigger("submit")

    // Open task details
    await wrapper.vm.$nextTick()
    const taskItem = wrapper.find(".task-item")
    await taskItem.trigger("click")
    await wrapper.vm.$nextTick()

    // Edit the task name
    const updatedName = "Updated Task Name"
    const nameInput = wrapper.find('.task-details input[type="text"]')
    expect(nameInput.exists()).toBe(true)

    await nameInput.setValue(updatedName)

    // Save changes
    const saveButton = wrapper.find(".save-button")
    await saveButton.trigger("click")

    // Verify the task name was updated
    expect(wrapper.vm.tasks[0].name).toBe(updatedName)
  })
})
