import { Locator, Page } from "@playwright/test";

export class AdminLogout{
    //creating properties to use
    page:Page
    logoutBtn: Locator

    //creating constructor
    constructor(page:Page)
    {
        this.page=page
        this.logoutBtn= page.locator('li#mi_logout')
    }
    //creating a method
    async ERPLogout()
    {
        await this.logoutBtn.waitFor()
        await this.logoutBtn.click()
    }
}