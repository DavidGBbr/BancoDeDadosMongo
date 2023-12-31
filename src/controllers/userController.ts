import { Request, Response } from "express";
import User from "../models/User";

export const nome = (req: Request, res: Response) => {
  let nome: string = req.query.nome as string;
  let idade: string = req.query.idade as string;

  res.render("pages/nome", {
    nome,
    idade,
  });
};

export const idadeForm = (req: Request, res: Response) => {
  res.render("pages/idade");
};

export const idadeAction = (req: Request, res: Response) => {
  let mostrarIdade: boolean = false;
  let idade: number = 0;

  if (req.body.ano) {
    let anoNascimento: number = parseInt(req.body.ano as string);
    let anoAtual: number = new Date().getFullYear();
    idade = anoAtual - anoNascimento;
    mostrarIdade = true;
  }

  res.render("pages/idade", {
    idade,
    mostrarIdade,
  });
};

export const addUserAction = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, age, interests } = req.body;

    if (!firstName || !lastName || !email || !age || !interests) {
      return res.status(400).send("Todos os campos são obrigatórios.");
    }

    const newUser = new User({
      name: { firstName, lastName },
      email,
      age: Number(age),
      interests: interests
        .split(",")
        .map((interest: string) => interest.trim()),
    });

    await newUser.save();

    res.redirect("/");
  } catch (error) {
    console.error("Erro ao inserir novo usuário no banco de dados:", error);
    res
      .status(500)
      .send("Ocorreu um erro ao inserir o usuário no banco de dados.");
  }
};

export const incrementAgeAction = async (req: Request, res: Response) => {
  let id = req.params.id;

  let user = await User.findOne({ _id: id });
  if (user) {
    user.age++;
    user.save();
  } else {
    console.log("Erro na incrementação");
  }

  res.redirect("/");
};
