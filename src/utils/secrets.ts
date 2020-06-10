/* tslint:disable:no-string-literal */
let JWT_SECRET: string;
if (process.env.NODE_ENV === "production") {
  JWT_SECRET = process.env["JWT_SECRET"];
} else if (process.env.NODE_ENV === "development") {
  const token = require("../../configsDEV");
  JWT_SECRET = token.DEV_SECRET;
}

export { JWT_SECRET };
/* tslint:enable:no-string-literal */
