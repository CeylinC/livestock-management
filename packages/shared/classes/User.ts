import { IUser } from "../models/IUser";

export class User implements IUser {
    username: string;
    id: string;
    email: string;

    constructor(data?: any) {
        this.username = data?.username ?? '';
        this.email = data?.email ?? '';
        this.id = data?.id ?? '';
    }
}