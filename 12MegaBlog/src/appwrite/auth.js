import conf from '../conf/conf.js';
import{ Client, Account,ID } from 'appwrite';

export class Authservice{
    client=new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const response = await this.account.create(ID.unique(), email, password, name);
            if(response){
                //call another method
                return this.login({ email, password });
            }else{
                return response;
            }
            
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    }
    async login({ email, password }) {
        try {
            const response = await this.account.createEmailSession(email, password);
            return response;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
        return null;
    }
    async logout() {
        try {
            await this.account.deleteSessions('current');
            return true;
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }
}

const authservice=new Authservice();
export default authservice

