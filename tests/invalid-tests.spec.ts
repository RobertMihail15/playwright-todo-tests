import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';
import { generateShoppingTask } from '../functions/generators';
import { generateMultipleTasks } from '../functions/generators';

const newTask = generateShoppingTask()

const randomTasks = generateMultipleTasks(4);


test.beforeEach(async({page})=>{
  await page.goto('https://todomvc.com/examples/react-redux/dist/#/')
})

test('add empty task', async({page})=>{
  const pm = new PageManager(page)
  await pm.submitOneItem('')
  await expect(pm.todo.toDoItem).not.toBeVisible() 
})

test('add only spaces', async({page})=>{
  const pm = new PageManager(page)
  await pm.submitOneItem('           ')
  await expect(pm.todo.toDoItem).not.toBeVisible() 
})

test('add a very long string', async({page})=>{
  const pm = new PageManager(page)
  const longTask = 'a'.repeat(1000);
  await pm.submitOneItem(longTask);
  await pm.submitOneItem(longTask); 
  await expect(pm.todo.toDoItem).toHaveCount(2);
  await expect(pm.todo.toDoItem.first()).toHaveText(longTask);
})

test('add special symbols', async({page})=>{
  const pm = new PageManager(page)
  await pm.submitOneItem('@@##!!@@')
  await expect(pm.todo.toDoItem).toBeVisible() 
})

