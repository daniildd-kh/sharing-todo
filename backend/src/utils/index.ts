import { IUser } from "../models/User";
import { UserDto } from "../models/User.dto";

export const toUserDto = (user: IUser): UserDto =>{
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,

  }
}