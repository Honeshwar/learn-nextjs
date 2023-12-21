// token get and jwt help we decode token and fetch data
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type payload = {
  id: string;
  username: string;
  email: string;
};
export function getDataFromToken(request: NextRequest): string {
  const token = request.cookies.get("token")?.value || "";
  console.log("token", token);
  const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!); //data
  console.log("decoded token", decodedToken);
  return decodedToken.id;
}
