import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';
import { generateShoppingTask } from '../functions/generators';
import { generateMultipleTasks } from '../functions/generators';


const newTask = generateShoppingTask()

const randomTasks = generateMultipleTasks(4);


test.beforeEach(async({page})=>{
  await page.goto('https://todomvc.com/examples/react-redux/dist/#/')
})

test('add a single task and delete it', async({page})=>{
  const pm = new PageManager(page)
  await pm.submitOneItem(newTask)
  await expect(pm.todo.toDoItem).toBeVisible()
  await pm.todo.toDoItem.hover()
  await pm.todo.deleteItemButton.click()
  
})

test('add multiple tasks and delete them', async({page})=>{
  const pm = new PageManager(page)
  
  await pm.submitMultipleItems(randomTasks)
  while (await pm.todo.toDoItem.count() > 0) {
    await pm.todo.toDoItem.first().hover();
    await pm.todo.deleteItemButton.first().click();
  }
})

test('check a single task', async({page})=>{
   const pm = new PageManager(page)
   await pm.submitOneItem(newTask)
   await pm.todo.checkButton.check({force: true})
   expect(pm.todo.checkButton).toBeChecked()
   await expect(pm.todo.toDoItem).toContainClass('completed')
   await pm.todo.checkButton.uncheck({force: true})
   expect(pm.todo.checkButton).not.toBeChecked()
})

test('check multiple tasks', async({page})=>{
  const pm = new PageManager(page)
  await pm.submitMultipleItems(randomTasks)
  await pm.checkAllBoxesToBeChecked()

})

test('edit-todo', async({page})=>{
  const pm = new PageManager(page)
  await pm.submitOneItem(newTask)
  await pm.submitEditToDoItem('new task')
  await expect(pm.todo.toDoItem).toBeVisible()
})

test('filter-todo: all, active, completed', async({page})=>{
  const pm = new PageManager(page)
  await pm.submitMultipleItems(randomTasks)
  await page.waitForTimeout(2000)
  for(let i=0; i<randomTasks.length;i++){
    if(Math.random()<0.5){
      await pm.todo.checkButton.nth(i).check();
    }
  }

  await pm.checkAllFilter(randomTasks.length)
  await pm.checkActiveFilter()
  await pm.checkCompletedFilter()
})

test('counter items', async({page})=>{
  const pm = new PageManager(page)
  await pm.submitMultipleItems(randomTasks)

  await pm.checkAllFilter(randomTasks.length)
  await expect(pm.todo.tasksCount).toHaveText(`${randomTasks.length} items left!`);
  await pm.todo.checkButton.first().click()
  await expect(pm.todo.tasksCount).toHaveText(`${randomTasks.length-1} items left!`);
  await pm.todo.checkButton.first().click()
  await expect(pm.todo.tasksCount).toHaveText(`${randomTasks.length} items left!`);


})

