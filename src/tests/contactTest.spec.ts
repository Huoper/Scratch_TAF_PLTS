import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import users from "../data/userData.json";
import { generateTestData, exportToJSON } from "../utils/FakerUtil";

for (const user of users) {
    test(`Contact creation test for ${user.firstName} ${user.lastName}`,
        { tag: ['@ddt'] }, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.navigateToLoginPage();

            const homePage = await loginPage.login(process.env.userid!, process.env.password!);
            
            await homePage.verifyServiceTitle();
            logger.info('Login test passed');

            const contactPage = await homePage.navigateToContactPage();

            await contactPage.createContact(user.firstName!, user.lastName!);

            await contactPage.verifyContactCreated(user.firstName!, user.lastName!);
            logger.info('Contact creation test passed');
        });
}

// Generate test data using Faker
test('Faker', async () => {
    const testData = generateTestData(5);
    exportToJSON(testData, 'fakerUserData.json');
});

