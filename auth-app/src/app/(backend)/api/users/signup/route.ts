import connect from "@/dbConfig/dbSetup";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

//connect db, before every route request
connect();

//post = function name POST , GET function NAME GET,....
//SYNTAX: export async function REQUEST_METHOD_NAME(request: Request) {}
export async function POST(request: NextRequest) {
  try {
    //body data get
    const reqBody = await request.json();
    const { username,email, password } = reqBody;
    //check user in db already exist or not
    const user = await User.findOne({ email });

    if(user) {
      return NextResponse.json({ message: "User already exist" ,}, { status: 200 });
    }

    //new user create
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, 10);
    // new User({
    //   username,
    //   email,
    //   password: hashedPassword,
    // }).save();
    const newUser = new User({
      username,email, password: hashedPassword
    });
    const saveUser = await newUser.save();

    return NextResponse.json({ message: "User created successfully", user:saveUser, success:true }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong at nextjs server",error: error });
  }
}