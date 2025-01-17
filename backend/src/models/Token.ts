import mongoose, { Schema, Types, Document, Model } from "mongoose";

interface IToken extends Document{
  owner: Types.ObjectId | undefined, 
  refreshToken: string,
}

interface ITokenModel extends Model<IToken>{
  saveToken: (userId: Types.ObjectId, refreshToken: string) => Promise<string>;
}

const TokenSchema = new Schema<IToken>({
  owner: {type: Types.ObjectId, ref: 'User', required: true},
  refreshToken: {type: String, required: true}
})

TokenSchema.statics.saveToken = async (userId: Types.ObjectId, refreshToken: string): Promise<string> => {
  const tokenData = await TokenModel.findOne({owner: userId});
  if(tokenData){
    tokenData.refreshToken = refreshToken;
    const updatedTokenData = await tokenData.save();
    return updatedTokenData.refreshToken;
  }
  const newTokenData = await TokenModel.create({owner: userId, refreshToken});
  return newTokenData.refreshToken;
}

export const TokenModel = mongoose.model<IToken, ITokenModel>('Token', TokenSchema);

