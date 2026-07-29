import { AppError } from "@/exceptions/AppError";
import { comparePassword, hashPassword } from "@/lib/bcrypt";
import { APP_URL } from "@/lib/env";
import { generateToken, verifyToken } from "@/lib/jwt";
import { sendEmail } from "@/lib/mail/mailer";
import { createActivationEmailTemplate } from "@/lib/mail/templates/activation-email";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import {
  LoginInput,
  loginSchema,
  RegisterInput,
  registerSchema,
  ResendActivationEmailInput,
  resendActivationEmailSchema,
  VerifyEmailInput,
  verifyEmailSchema,
} from "@/validations/auth.validation";
import {
  JwtPayload,
  LoginResponse,
  RegisterResponse,
  VerifyEmailResponse,
} from "@/types/auth";

export async function register(data: RegisterInput): Promise<RegisterResponse> {
  await connectDB();
  const validatedData = registerSchema.parse(data);
  const { name, email, password } = validatedData;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser?.isVerified) {
    throw new AppError("Email already exists", 409);
  }

  if (existingUser && !existingUser.isVerified) {
    throw new AppError(
      "Account is not activated. Please verify your email or request a new activation email.",
      409,
    );
  }

  const hashedPassword = await hashPassword(password);
  const activationToken = generateToken({
    email,
  });
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isVerified: false,
    activationToken,
  });

  const activationLink = `${APP_URL}/verify-email?token=${activationToken}`;

  const html = createActivationEmailTemplate({
    name,
    activationLink,
  });

  await sendEmail({
    to: email,
    subject: "Activate Your Account",
    html,
  });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    message:
      "Registration successful. Please check your email to activate your account.",
  };
}

export async function verifyEmail(
  data: VerifyEmailInput,
): Promise<VerifyEmailResponse> {
  await connectDB();
  const validateData = verifyEmailSchema.parse(data);
  const { token } = validateData;
  const payload = verifyToken<JwtPayload>(token);
  const { email } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isVerified) {
    throw new AppError("Email already verified", 409);
  }

  if (user.activationToken !== token) {
    throw new AppError("Invalid or expired activation token", 401);
  }

  user.isVerified = true;
  user.activationToken = null;

  await user.save();

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  };
}

export async function resendActivationEmail(data: ResendActivationEmailInput) {
  await connectDB();

  const validatedData = resendActivationEmailSchema.parse(data);

  const { email } = validatedData;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user.isVerified) {
    throw new AppError("Email already verified", 409);
  }

  const newActivationToken = generateToken({ email });
  user.activationToken = newActivationToken;
  await user.save();

  const activationLink = `${APP_URL}/verify-email?token=${newActivationToken}`;

  const html = createActivationEmailTemplate({
    name: user.name,
    activationLink,
  });

  await sendEmail({
    to: user.email,
    subject: "Activate Your Email",
    html,
  });
  return {
    email: user.email,
  };
}

export async function login(data: LoginInput): Promise<LoginResponse> {
  await connectDB();

  const validateData = loginSchema.parse(data);
  const { email, password } = validateData;

  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isVerified) {
    throw new AppError("Please verify your email before logging in", 403);
  }

  const token = generateToken({
    sub: user._id.toString(),
    email: user.email,
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  };
}

export async function logout() {}

export async function getCurrentUser() {}
