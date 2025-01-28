import { Page, expect } from '@playwright/test';
import logger from '../utils/LoggerUtil';
import ContactPage from './ContactPage';

export default class HomePage {
    private readonly serviceTitle: string = 'Service';
    private readonly contactLink: string = 'Contacts';

    constructor(private page: Page) {}

    async verifyServiceTitle() {
        try {
            await expect(this.page.getByTitle(this.serviceTitle)).toBeVisible({ timeout: 5000 });
            logger.info('Service title is visible');
        } catch (error) {
            logger.error('Service title is not visible: ', error);
            throw error;
        }
    }

    async navigateToContactPage() {
        try {
            await this.page.getByTitle(this.contactLink).click();
            logger.info('Navigated to Contacts page');

            await expect(this.page.getByTitle(this.contactLink))
                .toBeVisible({timeout: 5000})
            logger.info('Contacts title is visible');

        } catch (error) {
            logger.error('Navigation fail:', error);
            throw error;
        } 
        
        return new ContactPage(this.page);
    }
}