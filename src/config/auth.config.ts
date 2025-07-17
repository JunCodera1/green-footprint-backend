export const authConfig = {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiresin: process.env.JWT_EXPIRES_IN || "1d",
    saltRounds: Number(process.env.SALT_ROUND) || 10,
    refresh_token_secret:
      process.env.REFRESH_TOKEN_SECRET || "VmVyeVBvd2VyZnVsbFNlY3JldA==",
    refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || "2d",
  };
  