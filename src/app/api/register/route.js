import { NextResponse } from "next/server";
import { connectionDb, disconnectDb } from "@/libs/connectionDb";
import User from "@/schemas/User";
import { validateRegister } from "@/libs/validations";
import { genSalt, hash } from "bcrypt";

export async function POST(req, res) {
  const { username, email, password } = await req.json();
  try {
    //Validamos los datos que recibimos
    await validateRegister.validateAsync({ username, email, password });

    //Nos conectamos a la bd
    const conn = await connectionDb();

    //Revisamos la conexión a la bd
    if (!conn) return NextResponse.json("Error connecting to database");

    //Validamos que el correo no exista
    const user = await User.exists({ email: email });
    if (user)
      return NextResponse.json({
        status: 400,
        message: "Email already exists",
        error: true,
      });

    //Encriptamos la contraseña
    const salt = await genSalt(10);
    const encryptedPassword = await hash(password, salt);

    //Creamos el usuario
    const newUser = await User.create({
      username: username,
      email: email,
      password: encryptedPassword,
    });

    //Cerramos la conexión a la bd
    await disconnectDb();

    //Redirigimos al usuario el login
    return NextResponse.json({
      status: 200,
      message: "User created",
      data: {
        username: newUser.username,
        email: newUser.email,
      },
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
