import { Locator, Page } from "@playwright/test";

export class AdminLogin{
    //declare variables for login
    page:Page
    userName:Locator
    passWord: Locator
    clicklogin: Locator

    //writing constructer to initialize 
    constructor(page:Page)
    {
        this.page=page
        this.userName= page.locator('input#username')
        this.passWord = page.locator('input#password') 
        this.clicklogin = page.locator('button#btnsubmit')
    }

    //creating a method
    async ERPURL(Url:string){
        await this.page.goto('http://webapp.qedgetech.com/login.php')
    }

    async ERPLogin(user:string, pass:string){
        await this.userName.waitFor({state:"visible"})
        await this.userName.clear()
        await this.userName.fill(user)
        await this.passWord.waitFor()
        await this.passWord.clear()
        await this.passWord.fill(pass)
        await this.clicklogin.click()
    }
}