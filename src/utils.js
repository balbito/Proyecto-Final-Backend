import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Hash generation
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Hash validation
export const isValidPassword = (user, password) => {
  console.log(
    `Data to validate: user-password: ${user.password}, password: ${password}`
  );
  return bcrypt.compareSync(password, user.password);
};


export { __dirname };