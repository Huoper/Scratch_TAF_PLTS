import { Page, expect } from '@playwright/test';
import logger from '../utils/LoggerUtil';

export default class HomePage {
    private readonly serviceTitle: string = 'Service';

    constructor(private page: Page) {
    }

   async verifyServiceTitle() {
        await expect(this.page.getByTitle(this.serviceTitle))
        .toBeVisible({timeout: 5000})
        .catch((error) => { logger.error('Service title not visible: ', error); throw error; })
        .then(() => { logger.info('Service title visible') });
    }
}