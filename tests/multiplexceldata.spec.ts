import { AdminLogin } from "../Pages/AdminLogin";
import { AddCustomers } from "../Pages/AddCustomers";
import { AddSuppliers } from "../Pages/AddSuppliers";
import { AdminLogout } from "../Pages/AdminLogout";
import { ExcelUtility } from "../util/ExcelUtility";
import path from "path";
import test from "@playwright/test";

let login: AdminLogin
let customers: AddCustomers
let suppliers:AddSuppliers
let logout: AdminLogout

//store excel sheet data
let supdata:any
let cusdata:any

//filepath of exceldata file

let filepath= path.join(__dirname,"../test_data/ERPExcelData.xlsx")
try {
    supdata = ExcelUtility.getExcelData(filepath,"supplierdata") 
    cusdata = ExcelUtility.getExcelData(filepath,"customerdata")
    // console.log(supdata)
    // console.log(cusdata)
    
} catch (error) {
    console.log(error)
    
}

test.beforeEach(async({page})=>{
    login = new AdminLogin(page)
    await login.ERPURL(process.env.BASE_URL!)
    await login.ERPLogin(process.env.BASE_USER!, process.env.BASE_PASS!)

})

test.describe('ERP Modules',()=>{
    //using forof loop to access collection data
    for (const data of supdata) {
        test(`supplier module ${data.SupplierName}`,async({page})=>{
            suppliers = new AddSuppliers(page)
            await suppliers.addsupplierdetails(
                data.SupplierName,
                data.Address,
                data.City,
                data.Country,
                data.ContactPerson,
                data.PhoneNumber,
                data.Email,
                data.MobileNumber,
                data.Notes
            )
        })
        
    }
    for (const data of cusdata ) {
        test(`customer module ${data.CustomerName}`,async({page})=>{
            customers = new AddCustomers(page)
            await customers.ERPCustomers(
                data.CustomerName,
                data.Address,
                data.City,
                data.Country,
                data.ContactPerson,
                data.PhoneNumber,
                data.Email,
                data.MobileNumber,
                data.Notes
            )

        })
        
    }
})
test.afterEach(async({page})=>{
    logout = new AdminLogout(page)
    await logout.ERPLogout()
    await page.close()
})




// import { AdminLogin } from "../Pages/AdminLogin";
// import { AddSuppliers } from "../Pages/AddSuppliers";
// import { AddCustomers } from "../Pages/AddCustomers";
// import { AdminLogout } from "../Pages/AdminLogout";
// import { ExcelUtility } from "../util/ExcelUtility";
// import path from "path";

// let login : AdminLogin
// let supplier : AddSuppliers
// let customer: AddCustomers
// let logout : AdminLogout
// //to store excel sheet data
// let supdata: any
// let cusdata: any
// //to read path of excel file

// let filepath = path.join(__dirname,"../test_data/ERPExcelData.xlsx")
// try {
//     supdata = ExcelUtility.getExcelData(filepath,'supplierdata')
//     cusdata = ExcelUtility.getExcelData(filepath,"customerdata")
//     // console.log(supdata)
//     // console.log(cusdata)
// } catch (error) {
//     console.log(error)
// }
