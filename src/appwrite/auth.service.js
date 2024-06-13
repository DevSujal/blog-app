import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!userAccount) {
        return userAccount;
      }

      return this.login({ email, password });
    } catch (error) {
      console.log("error occured in appwrite in createAccount : ", error);
      return false;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("error occured in login appwrite : ", error);
    }
    return false;
  }

  async getCurrectUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("appwrite getuser error : ", error);
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("issue in logout : ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
