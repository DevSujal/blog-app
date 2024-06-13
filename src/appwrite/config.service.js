import { Client, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class DatabasesService {
  client = new Client();
  dataBases;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.dataBases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, featuredImage, userId, status, content }) {
    try {
      const document = await this.dataBases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          featuredImage,
          status,
          content,
          userId,
        }
      );
      return document;
    } catch (error) {
      console.log("app write error in createpost : ", error);
    }
  }

  async updataPost(slug, { title, featuredImage, status, content }) {
    try {
      return await this.dataBases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          featuredImage,
          content,
          status,
        }
      );
    } catch (error) {
      console.log("error in appwrite in updataPost : ", error);
    }
  }
  async deletePost(slug) {
    try {
      return await this.dataBases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite error in deletePost : ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.dataBases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("appwrite error in getPost : ", error);
      return null;
    }
  }
  async getAllPost(queries = [Query.equal("status", queries)]) {
    try {
      return await this.dataBases.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("appwrite error in getPost : ", error);
      return null;
    }
  }
}

const dataBaseService = new DatabasesService();

export default dataBaseService;
