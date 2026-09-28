import { AddCustomers } from "../Pages/AddCustomers";
import { AddSuppliers } from "../Pages/AddSuppliers";
import { AdminLogin } from "../Pages/AdminLogin";
import { AdminLogout } from "../Pages/AdminLogout";
import data from "../test_data/ERPData.json"
import test from "@playwright/test";
//console.log(data)
let login : AdminLogin
let supplier : AddSuppliers
let customer: AddCustomers
let logout : AdminLogout

test.beforeEach(async({page})=>{
    login = new AdminLogin(page)
    await login.ERPURL(process.env.BASE_URL!)
    await login.ERPLogin(process.env.BASE_USER!, process.env.BASE_PASS!)
})

test.describe('ERP mgmt modules',async()=>{
    //test for supplier module
    for (const sup of data.suppliers) {
        test(`validate supplier module ${sup.SupplierName}`,async({page})=>{
            supplier = new AddSuppliers(page)
            await supplier.addsupplierdetails(
                sup.SupplierName,
                sup.Address,
                sup.City,
                sup.Country,
                sup.ContactPerson,
                sup.PhoneNumber,
                sup.Email,
                sup.MobileNumber,
                sup.Notes
            )
        })
    }

        for (const cus of data.customers) {
            test(`validate customer module ${cus.ContactPerson}`,async({page})=>{
                customer = new AddCustomers(page)
                await customer.ERPCustomers(
                    cus.CustomerName,
                    cus.Address,
                    cus.City,
                    cus.Country,
                    cus.ContactPerson,
                    cus.PhoneNumber,
                    cus.Email,
                    cus.MobileNumber,
                    cus.Notes
                )
            })
            
        }
        
    
})
test.afterEach(async({page})=>{
    logout = new AdminLogout(page)
    await logout.ERPLogout()
    page.close()
})