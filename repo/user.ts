import fs from 'fs';
import { User, UserWithoutId } from '../interfaces/users';
import { HttpError, httpErrorStatusCodes } from '../interfaces/http_errors';

const USERS_FILE_PATH = './users.json';
let usersMemLoad: User[] = [];

function loadUsersFromFile() {
    try {
        if (!fs.existsSync(USERS_FILE_PATH)) {
            usersMemLoad = [];
        }

        const jsonData = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
        const { users } = JSON.parse(jsonData);
        if (!Array.isArray(users)) {
            throw new Error('Invalid data from file read');
        }
        usersMemLoad = users;
    } catch (error: any) {
        throw new Error('Failed to load users: ' + error.message);
    }
}

async function writeUsersToFile(users: User[]): Promise<void> {
    try {
        const jsonData = JSON.stringify({ users }, null, 2);
        fs.writeFileSync(USERS_FILE_PATH, jsonData);
        loadUsersFromFile();
    } catch (error: any) {
        throw new Error('Failed to write users: ' + error.message);
    }
}

async function createUser(user: UserWithoutId): Promise<User> {
    const newUser = { ...user, id: Date.now().toString() };
    usersMemLoad.push(newUser);
    await writeUsersToFile(usersMemLoad);
    return newUser;
}

async function getUserByEmail(email: string): Promise<User | undefined> {
    return usersMemLoad.find((user) => user.email === email);
}

async function getUserById(id: string): Promise<User | undefined> {
    return usersMemLoad.find((user) => user.id === id);
}

async function getUserPreferences(id: string) {
    const user = await getUserById(id);
    return user?.preferences || [];
}

async function updateUserPreferences(id: string, preferences: string[]) {
    const user = await getUserById(id);
    if (!user) throw new HttpError(httpErrorStatusCodes.NOT_FOUND, 'User not found');

    user.preferences = preferences;
    await writeUsersToFile(usersMemLoad);
    const updatedUser = await getUserById(id);
    return updatedUser?.preferences || [];
}

export default {
    createUser,
    getUserByEmail,
    getUserById,
    getUserPreferences,
    updateUserPreferences,
};