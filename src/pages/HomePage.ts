import { Page, expect } from '@playwright/test';

export default class HomePage {
    private readonly serviceTitle: string = 'Service';

    constructor(private page: Page) {
    }

   async verifyServiceTitle() {
        await expect(this.page.getByTitle(this.serviceTitle)).toBeVisible({timeout: 5000});
    }
}