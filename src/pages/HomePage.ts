import { Page, expect } from '@playwright/test';
import logger from '../utils/LoggerUtil';
import ContactPage from './ContactPage';

export default class HomePage {
    private readonly serviceTitle: string = 'Service';
    private readonly contactLink: string = 'Contacts';

    constructor(private page: Page) {}

   async verifyServiceTitle() {
        await expect(this.page.getByTitle(this.serviceTitle))
        .toBeVisible({timeout: 5000})
        .catch((error) => { logger.error('Service title not visible: ', error); throw error; })
        .then(() => { logger.info('Service title visible') });
    }

    async navigateToContactPage() {
        
        await this.page.getByTitle(this.contactLink).click();
        logger.info('Navigated to Contacts page');
        
        await expect(this.page.getByTitle(this.contactLink))
        .toBeVisible({timeout: 5000})

        return new ContactPage(this.page);
    }
}