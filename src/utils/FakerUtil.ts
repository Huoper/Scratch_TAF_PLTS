import {faker} from '@faker-js/faker'; 
import path from 'path';
import fs from 'fs';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

const generateUserData = (): UserData => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
    }
}

export const generateTestData = (recordsCount: number): UserData[] => {
    const testData: UserData[] = faker.helpers.multiple(generateUserData,
         { count: recordsCount });
    return testData;
}

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, '..');
const dataDir = path.resolve(srcDir, 'data');

export const exportToJSON = (data: UserData[], fileName: string) => {
    fs.writeFileSync(`${dataDir}/${fileName}`, JSON.stringify(data, null, 2), {flag: 'a'});
    console.log(`Data exported to ${fileName}`);
}