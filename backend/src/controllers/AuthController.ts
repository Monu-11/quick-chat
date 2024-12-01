import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config";

interface LoginPayloadType {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  image?: string;
}

const login = async (request: Request, response: Response): Promise<any> => {
  try {
    const body: LoginPayloadType = request.body;
    let findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    console.log('body :', body)

    if (!findUser) {
      findUser = await prisma.user.create({
        data: body,
      });
    }
    let JWTPayload = {
      name: body.name,
      email: body.email,
      id: findUser.id,
    };
    const token = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
      expiresIn: "365d",
    });
    return response.json({
      message: "Logged in successfully!",
      user: {
        ...findUser,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Something went wrong.please try again!" });
  }
};

export { login };
