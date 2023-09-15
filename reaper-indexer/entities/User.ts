import { createEntity } from '../deps.ts'

export interface IUser {
    address: string;
    dateAdded?: number;
}

export const User = createEntity<IUser>('User', {
    address: {
        type: String,
        index: true,
    },
    dateAdded: Number,
})