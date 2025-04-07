import mongoose, { Schema, Types } from "mongoose";

export enum GenderEnum {
  male = "male",
  female = "female",
}

export enum LanguageEnum {
  english = "english",
  russian = "russian",
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  fullName: string;
  gender: GenderEnum;
  language: LanguageEnum;
  country: string;
  tasks: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6, select: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
      default: GenderEnum.male,
    },
    language: {
      type: String,
      enum: Object.values(LanguageEnum),
      default: LanguageEnum.russian,
    },
    fullName: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
