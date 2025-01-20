import { Page } from '@playwright/test';
import HomePage from './HomePage';

export default class LoginPage {
    private readonly usernameInput: string = '#username';
    private readonly passwordInput: string = '#password';
    private readonly loginButton: string = '#Login';

    constructor(private page: Page) {
        
    }

    async navigateToLoginPage() {
        await this.page.goto('/');
    }
    
    async fillUsername(username: string) {
        await this.page.locator(this.usernameInput).fill(username);
    }

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInput).fill(password);
    }

    async clickLoginButton() {
        await this.page.locator(this.loginButton).click().catch((error) => {
            console.log('Error clicking login button: ', error);
        });
    }

    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();

        const homePage = new HomePage(this.page);
        return homePage;
    }
}