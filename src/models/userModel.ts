
//User Model
interface UserModel {
    id: string;
    fullName: string;
    email: string;
    password?: string;
    phoneNumber:string,
    role: "admin"|"provider"|"customer",
    createdAt: Date;
  }
  export default UserModel;