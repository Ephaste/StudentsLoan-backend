import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  console.log("pass:", password);
  
  const saltRounds = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

  let hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
  
};

export const comparePassword = async (password, hashedPassword) => {
  let result = await bcrypt.compare(password, hashedPassword);

  return result;
};
