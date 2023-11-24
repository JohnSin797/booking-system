import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST (request) {
    try {
        const user = await request.json();
        const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {expiresIn: "1d"});
        const response = NextResponse.json({message: 'Logged in successfully', data: token}, {success: true});
        response.cookies.set('user_token', token, {httpOnly: true});
        return response;
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}
