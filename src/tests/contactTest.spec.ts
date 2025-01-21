import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";

test('Contact creation test', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    const homePage = await loginPage.login(process.env.userid!, process.env.password!);
    await homePage.verifyServiceTitle();
    logger.info('Login test passed');
    const contactPage = await homePage.navigateToContactPage();
    await contactPage.createContact('John', 'Doe');
    await contactPage.verifyContactCreated('John', 'Doe');
    logger.info('Contact creation test passed');
});