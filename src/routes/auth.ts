import express from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res): Promise<any> => {
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
      return res.status(400).json({ message: "Email is already used." });
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
            bio: profile?.bio || "", // tránh lỗi nếu `profile` không có
          },
        },
        posts: {
          create: [], // hoặc bỏ đi nếu chưa có gì
        },
        activities: {
          create: [],
        },
        goals: {
          create: [],
        },
      },
    });

    res
      .status(201)
      .json({ message: "Register successful!", userId: newUser.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
  }
});

export default router;
