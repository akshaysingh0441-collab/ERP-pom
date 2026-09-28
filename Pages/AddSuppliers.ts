import { Locator, LocatorScreenshotOptions, Page } from "@playwright/test";

export class AddSuppliers{
page:Page
clickSuppliers: Locator
clickAddIcon: Locator
supplierNumber: Locator
supplierName: Locator
Saddress: Locator
Scity: Locator
Scountry: Locator
Scontactperson: Locator
Sphone: Locator
Semail: Locator
mobileNo: Locator
notes: Locator
clickAddBtn: Locator
clickConfirmOK: Locator
AlertOK: Locator
SearchIcon: Locator
SearchTextbox: Locator
searchBtn: Locator
supplierTable: Locator

constructor(page:Page)
{
    this.page=page
    this.clickSuppliers =  page.locator('#mi_a_suppliers')
    this.clickAddIcon =  page.locator("div[class='panel-heading ewGridUpperPanel'] a[class='btn btn-default ewAddEdit ewAdd btn-sm']")
    this.supplierNumber = page.locator('#x_Supplier_Number') 
    this.supplierName = page.locator('#x_Supplier_Name')
    this.Saddress = page.locator('#x_Address')
    this.Scity =   page.locator('#x_City')
    this.Scountry =  page.locator('#x_Country')
    this.Scontactperson = page.locator('#x_Contact_Person')
    this.Sphone =  page.locator('#x_Phone_Number')
    this.Semail=  page.locator('#x__Email')
    this.mobileNo=  page.locator('#x_Mobile_Number')
    this.notes=  page.locator('#x_Notes:visible')
    this.clickAddBtn=  page.locator('#btnAction:visible')
    this.clickConfirmOK=   page.getByText('OK!', { exact: true })
    this.AlertOK=  page.locator('button').filter({ hasText: 'OK' }).first()
    this.SearchIcon=  page.locator('span.glyphicon.glyphicon-search.ewIcon')
    this.SearchTextbox=  page.locator('#psearch')
    this.searchBtn=  page.locator('[name="btnsubmit"]')
    this.supplierTable=  page.locator('#r1_a_suppliers').locator('td').nth(5)
}
//creating methods to add suppliers
async addsupplierdetails(name:string, address:string, city:string, Country:string,
     contperson:string, phone:string, email:string, mobile:string, notes:string)
{
    await this.clickSuppliers.waitFor()
    await this.clickSuppliers.click()
    await this.clickAddIcon.waitFor()
    await this.clickAddIcon.click()
    await this.supplierNumber.waitFor()
    const EXP_num= await this.supplierNumber.inputValue()
    await this.supplierName.fill(name)
    await this.Saddress.fill(address)
    await this.Scity.fill(city)
    await this.Scountry.fill(Country)
    await this.Scontactperson.fill(contperson)
    await this.Sphone.fill(String(phone))
    await this.Semail.fill(email)
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
        console.log(`supplier number found in table ${actu_num}  ${EXP_num}`)
    }
    else{
        console.log(`supplier number not found in table ${actu_num}  ${EXP_num}`)
    }


}

}