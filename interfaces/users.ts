interface User {
    id: string;
    email: string;
    password: string;
    preferences?: string[];
}

interface UserWithoutId {
    email: string;
    password: string;
}

export {
    User,
    UserWithoutId,
};
