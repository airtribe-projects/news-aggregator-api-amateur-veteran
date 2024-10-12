import bcrypt from 'bcrypt';

const SALT_ROUNDS_FOR_PASSWORD = 10;

async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS_FOR_PASSWORD);
}

async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export {
    hashPassword,
    comparePasswords,
};