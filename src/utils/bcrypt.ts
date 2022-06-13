import { genSalt, hash, compare } from "bcryptjs";

const encrypt = (txt: string) => genSalt().then((salt: number | string) => hash(txt, salt));

export {
  compare,
  encrypt
};
