/**
 * NODE_ENV에 따라 다른 .env 파일 로드
 */
require("dotenv").config({
    path: `config/.env.${process.env.NODE_ENV || "development"}`,
});

/**
 * 환경변수 세팅
 */

 export const env = {
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",
    app:{
        port: Number(process.env.PORT) || 3000,
    },
    slack:{
        signingSecret: process.env.SIGNING_SECRET,
        endPoint: process.env.END_POINT,
        botUserOauthAccessToekn: process.env.BOT_USER_OAUTH_ACCESS_TOKEN
    }
 }
  