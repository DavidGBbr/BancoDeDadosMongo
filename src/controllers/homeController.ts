import { Request, Response } from "express";
import User from "../models/User";

export const home = async (req: Request, res: Response) => {
  /*1ª forma:
  await User.updateMany(
	{ age: { $lte: 18 } }, 
	{ age: 18 }
);
  */

  /*2ª forma: 
await User.updateOne(
  { email: "paulo@gmail.com.br" }, 
  { age: 76 }
  );
*/

  let paulo = await User.findOne({ email: "paulo@gmail.com.br" });
  if (paulo) {
    paulo.name.lastName = "Silva";
    paulo.age = 47;
    await paulo.save();
  }

  let users = await User.find({}).sort({ "name.firstName": 1 });

  res.render("pages/home", { users });
};
