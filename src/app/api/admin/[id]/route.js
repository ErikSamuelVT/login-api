import { NextResponse } from "next/server";
import { connectionDb, disconnectDb } from "@/libs/connectionDb";
import User from "@/schemas/User";
import { genSalt, hash } from "bcrypt";
import { validateUsername, validatePassword } from "@/libs/validations";

//Busqueda por Id
export async function GET(req, { params }) {
  //Obtenemos el id por parametros
  const id = params.id;

  try {
    //Nos conectamos a la bd
    const conn = await connectionDb();
    //Revisamos la conexión a la bd
    if (!conn) return NextResponse.json("Error connecting to database");

    const user = await User.findById(id);

    //Validamos que el encuentre un usuario
    if (user.length === 0)
      return NextResponse.json({
        status: 400,
        message: "No user registered",
        error: true,
      });

    // Nos desconectamos de la bd
    await disconnectDb();

    // Retornamos una respuesta al cliente
    return NextResponse.json({
      status: 200,
      message: `User ${user.username}`,
      user,
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

//Actualizar por id
export async function PUT(req, { params }) {
  //Obtenemos el id y los campos por parametros
  const id = params.id;
  const { username, password } = await req.json();

  //Creamos una bandera para saber que campos hay que actualizar
  let fieldToChanges = "";

  //generamos los saltos para encriptar la contraseña en caso de que se necesite
  const salt = await genSalt(10);
  let encryptedPassword;

  try {
    //Validamos que los campos no esten vacios
    if (username === "" && password === "") {
      return NextResponse.json({
        status: 200,
        message: `No changes, both field are empty`,
        error: false,
      });
    }

    //Si los campos contienen algo los validamos
    if (username !== "" && password !== "") {
      fieldToChanges = "both";
      await validateUsername.validateAsync({ username });
      await validatePassword.validateAsync({ password });
    }

    //Si un solo campo contiene información lo validamos
    if (username !== "" && password === "") {
      fieldToChanges = "username";
      await validateUsername.validateAsync({ username });
    }

    if (username === "" && password !== "") {
      fieldToChanges = "password";
      await validatePassword.validateAsync({ password });
    }

    //Nos conectamos a la bd
    const conn = await connectionDb();

    //Revisamos la conexión a la bd
    if (!conn) return NextResponse.json("Error connecting to database");

    //Validamos el valor de la bandera para comprobar su valor
    console.log(fieldToChanges);
    switch (fieldToChanges) {
      case "both":
        encryptedPassword = await hash(password, salt);

        await User.findByIdAndUpdate(id, {
          username,
          password: encryptedPassword,
        });
        break;
      case "username":
        await User.findByIdAndUpdate(id, { username });
        break;
      case "password":
        //Encriptamos la contraseña
        encryptedPassword = await hash(password, salt);
        await User.findByIdAndUpdate(id, { password: encryptedPassword });
        break;

      default:
        break;
    }
    //Nos desconectamos de la bd
    await disconnectDb();

    //Retornamos una respuesta al cliente
    return NextResponse.json({
      status: 200,
      message: `User updated`,
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

//Eliminar un usurio por id
export async function DELETE(req, { params }) {
  //Obtenemos el id por parametro
  const id = params.id;

  try {
    //Nos conectamos a la bd
    const conn = await connectionDb();

    //Revisamos la conexión a la bd
    if (!conn) return NextResponse.json("Error connecting to database");

    //Eliminamos el usuario por id
    const user = await User.deleteOne({ _id: id });

    //Validamos que el usuario exista en la bd
    if (user.deletedCount === 0)
      return NextResponse.json({
        status: 400,
        message: "No user registered",
        error: true,
      });

    //Nos desconectamos de la bd
    await disconnectDb();

    //Retornamos una respuesta al cliente
    return NextResponse.json({
      status: 200,
      message: `User deleted`,
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
