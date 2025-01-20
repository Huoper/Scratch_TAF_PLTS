import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test.skip('Login Test', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();

    const homePage = await loginPage.login(process.env.userid!, process.env.password!);
    await homePage.verifyServiceTitle();
});
