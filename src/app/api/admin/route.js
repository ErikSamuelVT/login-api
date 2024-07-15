import { NextResponse } from "next/server";
import { connectionDb, disconnectDb } from "@/libs/connectionDb";
import User from "@/schemas/User";

export async function GET(req, res) {
  try {
    //Nos conectamos a la bd
    const conn = await connectionDb();

    //Revisamos la conexión a la bd
    if (!conn) return NextResponse.json("Error connecting to database");

    const users = await User.find({});

    if (users.length === 0)
      return NextResponse.json({
        status: 400,
        message: "No user registered",
        error: true,
      });

    await disconnectDb();

    return NextResponse.json({
      status: 200,
      message: "All users",
      users,
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
