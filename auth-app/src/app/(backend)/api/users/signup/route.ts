import connect from "@/dbConfig/dbSetup";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

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
    const userByEmail = await User.findOne({ email,username });
    const userByUsername = await User.findOne({ username });
    console.log("user",userByEmail,userByUsername);
    
    if(userByEmail || userByUsername){
      return NextResponse.json({ message: "User already exist with this email or username" ,}, { status: 200 });
    }

    //new user create
    const salt = await bcrypt.genSalt(10);
    console.log("salt",salt);
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
    //send email
    await sendEmail({email:saveUser.email,emailType:process.env.VERIFY_EMAIL!, userId:saveUser._id});

    return NextResponse.json({ message: "User created successfully", user:saveUser, success:true }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong at nextjs server",success:false,error: error },{ status: 500 });
  }
}