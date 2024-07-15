import { NextResponse } from "next/server";
import { connectionDb, disconnectDb } from "@/libs/connectionDb";
import User from "@/schemas/User";
import { validateLogin, validatePassword } from "@/libs/validations";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export async function POST(req, res) {
  const { email, password } = await req.json();

  try {
    //Validamos los datos que recibimos
    await validateLogin.validateAsync({ email, password });

    //Nos conectamos a la bd
    const conn = await connectionDb();

    //Revisamos la conexión a la bd
    if (!conn) return NextResponse.json("Error connecting to database");

    //Validamos que el usuario exista
    const user = await User.find({ email });
    if (user.length === 0)
      return NextResponse.json({
        status: 400,
        message: "Email does not exist",
        error: true,
      });

    //Desencriptamos la contraseña y valiamos que coincida
    const validatePass = await compare(password, user[0].password);

    if (!validatePass)
      return NextResponse.json({
        status: 400,
        message: "Password invalid",
        error: true,
      });

    //Creamos el token con algo de info
    const token = sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        createAt: user.createAt,
      },
      process.env.TOKEN_SECRET
    );

    await disconnectDb();

    return NextResponse.json({
      status: 200,
      message: "User logged",
      token,
      error: false,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: error.message,
      error: true,
    });
  }
}
