// src/appwrite/auth.js

import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite endpoint
            .setProject(conf.appwriteProjectId); // Your Appwrite project ID

        this.account = new Account(this.client);
    }

    // Create a new user account and login after signup
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            // Automatically log the user in after account creation
            if (userAccount) {
                return await this.login({ email, password });
            }

            return userAccount;
        } catch (error) {
            console.error("❌ createAccount error:", error.message);
            throw error;
        }
    }

    // Login using email and password
    async login({ email, password }) {
        try {
            const session = await this.account.createEmailSession(email, password);
            console.log("✅ Login session created:", session);
            return session;
        } catch (error) {
            console.error("❌ login error:", error.message);
            throw error;
        }
    }

    // Get currently logged-in user
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("✅ Current user:", user);
            return user;
        } catch (error) {
            console.error("❌ getCurrentUser error:", error.message);
            return null;
        }
    }

    // Logout the current user (delete all sessions)
    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("✅ Successfully logged out");
        } catch (error) {
            console.error("❌ logout error:", error.message);
        }
    }
}

// Export the initialized service
const authService = new AuthService();
export default authService;


