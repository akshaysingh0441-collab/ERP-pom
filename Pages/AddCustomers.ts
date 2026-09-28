import { Locator, Page } from "@playwright/test";

export class AddCustomers{
    //declaring properties to use
    page:Page
    clickCustomers: Locator
    clickAddIcon: Locator
    customerNumber: Locator
    customerName: Locator
    Caddress: Locator
    Ccity: Locator
    Ccountry: Locator
    Ccontactperson: Locator
    Cphone: Locator
    Cemail: Locator
    mobileNo: Locator
    notes: Locator
    clickAddBtn: Locator
    clickConfirmOK: Locator
    AlertOK: Locator
    SearchIcon: Locator
    SearchTextbox: Locator
    searchBtn: Locator
    supplierTable: Locator

        //creating a constructor to initialize
        constructor(page:Page)
        {
    this.page=page
    this.clickCustomers =  page.locator('#mi_a_customers')
    this.clickAddIcon =  page.locator("div[class='panel-heading ewGridUpperPanel'] a[class='btn btn-default ewAddEdit ewAdd btn-sm']")
    this.customerNumber =  page.locator('#x_Customer_Number') 
    this.customerName =  page.locator('#x_Customer_Name')
    this.Caddress = page.locator('#x_Address')
    this.Ccity =  page.locator('#x_City')
    this.Ccountry = page.locator('#x_Country')
    this.Ccontactperson = page.locator('#x_Contact_Person')
    this.Cphone =  page.locator('#x_Phone_Number')
    this.Cemail=  page.locator('#x__Email')
    this.mobileNo=  page.locator('#x_Mobile_Number')
    this.notes=  page.locator('#x_Notes:visible')
    this.clickAddBtn=  page.locator('#btnAction:visible')
    this.clickConfirmOK=  page.getByText('OK!', { exact: true })
    this.AlertOK=  page.locator('button').filter({ hasText: 'OK' }).first()
    this.SearchIcon=  page.locator('span.glyphicon.glyphicon-search.ewIcon')
    this.SearchTextbox=  page.locator('#psearch')
    this.searchBtn=  page.locator('[name="btnsubmit"]')
    this.supplierTable=    page.locator('#r1_a_customers').locator('td').nth(4)
        }

    //creating a method to use 
    async ERPCustomers(name:string, address:string, city:string, Country:string,
     contperson:string, phone:string, email:string, mobile:string, notes:string)
     {
    
     await this.clickCustomers.waitFor()
    await this.clickCustomers.click()
    await this.clickAddIcon.waitFor()
    await this.clickAddIcon.click()
   // await this.customerNumber.waitFor()
    const EXP_num= await this.customerNumber.inputValue()
    await this.customerName.fill(name)
    await this.Caddress.fill(address)
    await this.Ccity.fill(city)
    await this.Ccountry.fill(Country)
    await this.Ccontactperson.fill(contperson)
    await this.Cphone.fill(String(phone))
    await this.Cemail.fill(email)
    await this.mobileNo.fill(String(mobile))
    await this.notes.fill(notes)
    await this.clickAddBtn.click()
    await this.clickConfirmOK.click()
    await this.AlertOK.click()
    await this.SearchIcon.waitFor()
    if(! await this.SearchTextbox.isVisible()){
        await this.SearchIcon.click()
    }
    await this.SearchTextbox.clear()
    await this.SearchTextbox.fill(EXP_num)
    await this.searchBtn.click()
    const actu_num = await this.supplierTable.textContent()
    if((await actu_num)?.match(EXP_num)){
        console.log(`customer number found in table ${actu_num}  ${EXP_num}`)
    }
    else{
        console.log(`customer number not found in table ${actu_num}  ${EXP_num}`)
    }
     }
}