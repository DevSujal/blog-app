import { Client, ID, Storage } from "appwrite";
import conf from "../conf/conf";

export class FileService {
  client = new Client();
  bucket
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.bucket = new Storage(this.client);
  }

  async uploadFile(file, fileId = ID.unique()) {
    try {
      return await this.bucket.createFile(conf.appWriteBucketId, fileId, file);
    } catch (error) {
      console.log("appwrite error in upload file : ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
    } catch (error) {
      console.log("appwrite error in deleteFile file : ", error);
      return false;
    }
  }

  async updateFile(fileId, file) {
    try {
      return this.uploadFile(fileId, file);
    } catch (error) {
      console.log("error in appwrite in updateFile : ", error);
      return false;
    }
  }

  async getFile(fileId) {
    try {
      return await this.bucket.getFile(conf.appWriteBucketId, fileId);
    } catch (error) {
      console.log("error in appwrite in getFile : ", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    console.log(fileId);
    try {
      return await this.bucket.getFilePreview(conf.appWriteBucketId, fileId);
    } catch (error) {
      console.log("appwrite error in getFilePreview in : ", error);
      return false;
    }
  }
}

const fileService = new FileService();

export default fileService;
