import {Page, expect} from '@playwright/test';
import logger from '../utils/LoggerUtil';

export default class ContactPage {
    private readonly contactLink = 'Contacts';
    private readonly newButton = 'New';
    private readonly firstNameInput = 'First Name';
    private readonly lastNameInput = 'Last Name';
    private readonly saveButton = 'Save';

    constructor(private page: Page) {}

    async createContact(firstName: string, lastName: string): Promise<void> {
        logger.info('Creating a new contact');
        await this.page.getByRole('button', {name: this.newButton , exact: true}).click();
        logger.info('New button clicked');
        
        await this.page.getByPlaceholder('Search Accounts...').click();
        await this.page.getByLabel('Recent Accounts').locator('span').nth(2).click();


        await this.page.getByPlaceholder(this.firstNameInput).fill(firstName);
        logger.info(`First name: ${firstName}`);
        await this.page.getByPlaceholder(this.lastNameInput).fill(lastName);
        logger.info(`Last name: ${lastName}`);

        await this.page.getByRole('button', {name: this.saveButton, exact: true }).click()
        .catch((error) => {
            logger.error(`Error clicking Save button: ${error}`)
            throw error;    
        }).then(() => { logger.info('Save button clicked') });

        logger.info('Contact created');
    }

    async verifyContactCreated(firstName: string, lastName: string): Promise<void> {
        logger.info('Verifying contact created');
        const label = this.page.getByRole('alert');
        await expect(label).toContainText(`${firstName} ${lastName}`);
        logger.info('Contact verified');
    }

}