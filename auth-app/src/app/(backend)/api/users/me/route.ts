import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbSetup";

//this is impt to call to connec tdb each req, otherwise model mongoose func not work
connect();

export async function GET(req: NextRequest) {
  try {
   const userId =  getDataFromToken(req);
   console.log("user id from token", userId);
   //fetch user by it from mongodb
   const user = await User.findById(userId).select("-password -__v -createdAt -updatedAt -isVerified -isAdmin");

   if (!user) {
     return NextResponse.json(
       { message: "User not found" },
       { status: 404 },
     );
   }

   return NextResponse.json({message:"User found",data:user,success:true, },{status:200});

  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      { message: "Something went wrong on server" },
      { status: 500 },
    );
  }
}