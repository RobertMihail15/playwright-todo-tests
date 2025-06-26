import { Page, expect } from "@playwright/test";

export class TodoPage{
    private readonly page:Page

    constructor(page: Page){
        this.page = page
    }

    get toDoInput(){
        return this.page.getByRole('textbox', {name: 'What needs to be done?'})
    }

    get toDoItem(){
        return this.page.locator('[data-testid="todo-item"]')
    }

    get deleteItemButton(){
        return this.page.locator('.destroy')
    }

    get checkButton(){
        return this.page.locator('input[data-testid="todo-item-toggle"]')
    }

    get editItemInput(){
        return this. page.locator('input[class="edit"]')
    }

    get allFilter(){
        return this.page.getByRole('link', { name: 'All' })
    }

    get activeFilter(){
        return this.page.getByRole('link', { name: 'Active' })
    }
    
    get completedFilter(){
        return this.page.getByRole('link', { name: 'Completed' })
    }

     get tasksCount(){
        return this.page.locator('[class="todo-count"]')
    }

    async checkAllFilter(count: number){
        await this.allFilter.click()
        await expect(this.toDoItem).toHaveCount(count)
    }

    async checkActiveFilter(){
        await this.activeFilter.click()
  
        const activeItems = this.toDoItem 
        for(const item of await activeItems.all()){
            await expect(item).not.toHaveClass('completed')
        }
    }

    async checkCompletedFilter(){
         await this.completedFilter.click()
         const completedItems = this.toDoItem
         for(const item of await completedItems.all()){
             await expect(item).toHaveClass('completed')
        }
    }

    async pressEnterOnKeyboard(){
         await this.page.keyboard.press('Enter')
    }

    async submitOneItem(item: string){
        await this.toDoInput.fill(item)
        await this.pressEnterOnKeyboard()
    }

    async editTodoItem(item: string){
        await this.toDoItem.dblclick()
        await expect(this.toDoItem).toContainClass('editing')
        await this.editItemInput.clear()
        await this.editItemInput.fill(item)
        await this.pressEnterOnKeyboard()
    }

     async submitMultipleItems(taskList) {
        for (const task of taskList) {
            await this.submitOneItem(task);
        }
    }   

    async checkAllBoxesToBeChecked(){
        const allBoxes = this.checkButton
        for(const box of await allBoxes.all()){
            await box.check({force:true})
            expect(await box.isChecked()).toBeTruthy()
          }
          const count = await this.toDoItem.count();

        for (let i = 0; i < count; i++) {
            const item = this.toDoItem.nth(i);
            await expect(item).toContainClass('completed');
        }

    }
}