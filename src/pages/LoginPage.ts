import { Page } from '@playwright/test';
import HomePage from './HomePage';
import logger from '../utils/LoggerUtil';

export default class LoginPage {
    private readonly usernameInput: string = '#username';
    private readonly passwordInput: string = '#password';
    private readonly loginButton: string = '#Login';

    constructor(private page: Page) {
        
    }

    async navigateToLoginPage() {
        await this.page.goto('/');
        logger.info('Navigated to login page');
    }
    
    async fillUsername(username: string) {
        await this.page.locator(this.usernameInput).fill(username);
        logger.info('Filled username');
    }

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInput).fill(password);
        logger.info('Filled password');
    }

    async clickLoginButton() {
        await this.page.locator(this.loginButton).click().catch((error) => {
            logger.error('Error clicking login button: ', error);
            throw error;
        }).then(() => {logger.info('Clicked login button')});
    }

    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();

        const homePage = new HomePage(this.page);
        return homePage;
    }
}