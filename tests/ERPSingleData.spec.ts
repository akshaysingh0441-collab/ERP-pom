import { AdminLogin } from "../Pages/AdminLogin";
import { AddSuppliers } from "../Pages/AddSuppliers";
import { AddCustomers } from "../Pages/AddCustomers";
import { AdminLogout } from "../Pages/AdminLogout";
import test from "@playwright/test";

let login : AdminLogin
let sup : AddSuppliers
let cus : AddCustomers
let logout : AdminLogout

test.beforeEach(async({page})=>{
    login = new AdminLogin(page)
    await login.ERPURL(process.env.BASE_URL!)
    await login.ERPLogin(process.env.BASE_USER!, process.env.BASE_PASS!)
})
test.describe('ERP mgmt modules',()=>{
    test('adding suppliers',async({page})=>{
        sup = new AddSuppliers(page)
        await sup.addsupplierdetails("aksay",'asdfgh','gulbarga','india','werfg0','789456','asdfghj@gmail.com','7896527455','wsedrftgyhujsexdcrftvgbyh')
    })
    test('adding customers',async({page})=>{
        cus = new AddCustomers(page)
        await cus.ERPCustomers("qweertsay",'asdfgh','gwsdflbarga','india','werfg0','78456','afghj@gmail.com','78967455','hujsexdcrftvgbyh')
    })
})

test.afterEach(async({page})=>{
    logout = new AdminLogout(page)
    await logout.ERPLogout()
    await page.close()
})