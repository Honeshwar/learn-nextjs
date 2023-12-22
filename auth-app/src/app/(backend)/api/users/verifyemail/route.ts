//get token from client side and verify token find db and remove if found
import connect from "@/dbConfig/dbSetup"; 
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

//connect eith mongodb at req of this route
connect();

export async function POST(req: NextRequest) {
  try {
    //token extract from body
    const { token } = await req.json();//return reqbody as json

    //find in DB
    const user = await User.findOne({ verifyUserToken: token, verifyUserTokenExpiry:{$gt: Date.now()} });
    if(!user) return NextResponse.json({ message:"Invalid token" }, { status: 400 });
    //update DB
    user.isVerified = true;
    user.verifyUserToken = null;
    user.verifyUserTokenExpiry = null;
    await user.save();

    return NextResponse.json({ message:"Email verified successfully",success:true }, { status: 200 });
    
  } catch (error:any) {
    return NextResponse.json({ message:"Internal server error" }, { status: 500 });
  }
}