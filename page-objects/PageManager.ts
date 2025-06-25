import { Page, expect } from "@playwright/test";
import { TodoPage } from "./TodoPage";

export class PageManager{
    private readonly page:Page
    private readonly todoPage: TodoPage

    constructor(page: Page){
        this.page = page
        this.todoPage = new TodoPage(this.page)
    }

    submitOneItem(item:string){
        return this.todoPage.addASingleItemToList(item)
    }

    get deleteItemButton(){
        return this.todoPage.deleteItem
    }
    get toDoItem(){
        return this.todoPage.toDoItem
    }

    get checkButton(){
        return this.todoPage.checkButton
    }

    get allFilter(){
        return this.todoPage.allFilter
    }

    get activeFilter(){
        return this.todoPage.activeFilter
    }
    
    get completedFilter(){
        return this.todoPage.completedFilter
    }

    get tasksCount(){
        return this.page.locator('[class="todo-count"]')
    }

    checkAllFilter(count: number){
        return this.todoPage.checkAllFilter(count)
    }

    submitEditToDoItem(item:string){
        return this.todoPage.editTodoItem(item)
    }

    checkActiveFilter(){
        return this.todoPage.checkActiveFilter()
    }

    checkCompletedFilter(){
        return this.todoPage.checkCompletedFilter()
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