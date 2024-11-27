import express, { Request, Response, RequestHandler } from "express";
import "dotenv/config";
import { User } from "./db";
import { z } from "zod";
import connectToDB from "./connectToDb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());

app.post(
  "/api/v1/signup",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const signupSchema = z.object({
        username: z
          .string()
          .min(3, "Username should be of minimum 3 characters")
          .max(10, "Username can not exceed 10 characters"),
        password: z
          .string()
          .min(8, "Password should be of minimum 8 characters")
          .max(20, "Password can not exceed 20 characters")
          .regex(/[a-z]/, "Password must contain at least one lowercase letter")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[0-9]/, "Password must contain at least one number")
          .regex(
            /[\W_]/,
            "Password must contain at least one special character"
          ),
      });
      const { username, password } = req.body;

      const result = signupSchema.safeParse({ username, password });

      if (!result.success) {
        return res.status(411).json({
          success: false,
          message: result.error.errors,
        });
      }

      let existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(403).json({
          success: false,
          message: "User already exists with this username",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        username,
        password: hashedPassword,
      });

      return res.status(200).json({
        success: true,
        message: "Sign up successfull.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server Error",
      });
    }
  }
);

app.post(
  "/api/v1/signin",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const signinSchema = z.object({
        username: z
          .string()
          .min(3, "Username should be of minimum 3 characters")
          .max(10, "Username can not exceed 10 characters"),
        password: z
          .string()
          .min(8, "Password should be of minimum 8 characters")
          .max(20, "Password can not exceed 20 characters")
          .regex(/[a-z]/, "Password must contain at least one lowercase letter")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[0-9]/, "Password must contain at least one number")
          .regex(
            /[\W_]/,
            "Password must contain at least one special character"
          ),
      });
      const { username, password } = req.body;

      const result = signinSchema.safeParse({ username, password });

      if (!result.success) {
        return res.status(411).json({
          success: false,
          message: result.error.errors,
        });
      }
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(403).json({
          success: false,
          message: "User not found.",
        });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(403).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        success: true,
        message: "Signin successfull.",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server Error.",
      });
    }
  }
);

app.post("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.post("/api/v1/brain/:shareLink", (req, res) => {});

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log("Server is running on PORT: ", process.env.PORT);
});
