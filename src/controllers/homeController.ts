import { Request, Response } from "express";

import { Product } from "../models/Product";
import User from "../models/User";

export const home = async (req: Request, res: Response) => {
  /*
1ª forma:

  let newUser = await User.create({
    name: { firstName: "Monaliza", lastName: "Fernandes" },
    email: "mona@paris.org",
    age: 200,
    interests: ["arte", "pizza"],
  });

  console.log("NOVO USUÁRIO", newUser);
*/
  //2ª forma:
  let newUser = new User();
  newUser.name = { firstName: "André", lastName: "Soares" };
  newUser.email = "andre@hotmail.com";
  newUser.age = 35;
  newUser.interests = ["programação", "skate"];
  let resultado = await newUser.save();

  console.log("NOVO USUÁRIO", resultado);

  let age: number = 90;
  let showOld: boolean = false;

  if (age > 50) {
    showOld = true;
  }

  let list = Product.getAll();
  let expensiveList = Product.getFromPriceAfter(12);

  res.render("pages/home", {
    name: "Bonieky",
    lastName: "Lacerda",
    showOld,
    products: list,
    expensives: expensiveList,
    frasesDoDia: [],
  });
};
