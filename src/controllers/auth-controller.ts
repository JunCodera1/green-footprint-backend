import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    email,
    password,
    firstName,
    lastName,
    posts,
    profile,
    activities,
    goals,
  } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email is already used." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        profile: {
          create: {
            bio: profile?.bio || "",
          },
        },
        posts: {
          create: posts || [],
        },
        activities: {
          create: activities || [],
        },
        goals: {
          create: goals || [],
        },
      },
    });

    res
      .status(201)
      .json({ message: "Register successful!", userId: newUser.id });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error!" });
  }
};
