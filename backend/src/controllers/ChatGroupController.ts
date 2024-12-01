import { Request, Response } from "express";
import prisma from "../config/db.config.js";

const store = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    await prisma.chatGroup.create({
      data: {
        title: body?.title,
        passcode: body?.passcode,
        user_id: user.id,
      },
    });

    return res.json({ message: "Chat Group created successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.please try again!" });
  }
};

const index = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    const groups = await prisma.chatGroup.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return res.json({
      message: "Chat Groups Fetched successfully!",
      data: groups,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.please try again!" });
  }
};

const show = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (id) {
      const group = await prisma.chatGroup.findUnique({
        where: {
          id: id,
        },
      });
      return res.json({
        message: "Chat Group Fetched successfully!",
        data: group,
      });
    }

    return res.status(404).json({ message: "No groups found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.please try again!" });
  }
};

const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (id) {
      await prisma.chatGroup.update({
        data: body,
        where: {
          id: id,
        },
      });
      return res.json({ message: "Group updated successfully!" });
    }

    return res.status(404).json({ message: "No groups found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.please try again!" });
  }
};

const destroy = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    await prisma.chatGroup.delete({
      where: {
        id: id,
      },
    });
    return res.json({ message: "Chat Deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.please try again!" });
  }
};
export { store, index, show, update, destroy };
