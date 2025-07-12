import { serialize } from 'v8';
import conf from './conf.js';
import { Client,ID,Databases,Storage,Query} from 'appwrite';

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,//u can use slug as document ID or if you want to use unique ID then use ID.unique()
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
            return response;
        }
        catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            const response = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
            return response;
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    }
    async deletePost(slug){
        try{
            const response=await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );
            return true;
            
        }
        catch(error){
            console.error('Error deleting post:', error);
            return false;
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        }
        catch{
            console.log("Appwrite service::getPost::error",error);
            return false;
        }
    }
    async getPosts(queries=[Query.equal('status','active')]){
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            return response;
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            return false;
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            const response = this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error('Error uploading file:', error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            const response = this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return response;
        } catch (error) {
            console.error('Error deleting file:', error);
            return false;
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}
const service=new Service();
export default service;
