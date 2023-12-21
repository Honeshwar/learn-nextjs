import connect from "@/dbConfig/dbSetup";
import User from "@/models/userModel";//create if not exist
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//connect db, before every route request
connect();

//post = function name POST , GET function NAME GET,....
//SYNTAX: export async function REQUEST_METHOD_NAME(request: Request) {}
export async function POST(request: NextRequest) {
  try {
    //body data get
    const reqBody = await request.json();
    const {email, password } = reqBody;
    console.log(email, password);
    //check user in db already exist or not
    const user = await User.findOne({ email });

    if(!user) {
      return NextResponse.json({ message: "User does not exist" ,}, { status: 404 });
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" ,}, { status: 400 });
    }

    //create token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d"
    })

    //set cookie
    const response = NextResponse.json({ message: "Login successful", success: true, token },{status: 200});//return normal response, express..
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true   
    })
    return response;
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong at nextjs server",error: error });
  }
}