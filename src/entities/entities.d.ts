import { NextFunction, Request, Response } from "express";

// ### TYPES ###
export type Configs = {
  PORT: number;
  INSTAGRAM_API: string;
  INSTAGRAM_API_VERSION: string;
  INSTAGRAM_SECRET_CLIENT: string;
  INSTAGRAM_USER_ACCESS_TOKEN: string;
  API_VERSION: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
};

export type VerifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type VerifyIdUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;


export type AuthController = {
  getUserId: (req: Request, res: Response) => Promise<Response>;
};

export type User = {
  id: string;
  username: string;
  account_type: string;
  media_count: number;
};

export type InstagramController = {
  alive: (req: Request, res: Response) => Response;
  userProfile: (req: Request, res: Response) => Promise<Response>;
};

// ### INTERFACES ###
