import { Page, expect } from "@playwright/test";
import { TodoPage } from "./TodoPage";

export class PageManager{
    private readonly page:Page
    private readonly todoPage: TodoPage

    constructor(page: Page){
        this.page = page
        this.todoPage = new TodoPage(this.page)
    }

    get todo() {
        return this.todoPage;
    }

    submitOneItem(item:string){
        return this.todoPage.submitOneItem(item)
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

    submitMultipleItems(taskList) {
        return this.todoPage.submitMultipleItems(taskList)
    }   

    checkAllBoxesToBeChecked(){
        return this.todoPage.checkAllBoxesToBeChecked()
    }

    
}