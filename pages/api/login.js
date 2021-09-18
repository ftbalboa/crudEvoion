//ruta login, busca user y password en la base, de encontrarlos devuelve nombre y token
const prisma = require("../../prisma/prisma");
const jwt = require("jsonwebtoken");

const getUserByEmail = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    if(user.password === password){
    const token = jwt.sign({id:user.id, email:user.email},process.env.TOKEN)
    const forSend ={
      token:token,
      firstName:user.firstName,
      lastName:user.lastName
    }
    return res.json(forSend);}
    else return res.status(404).json("userNotFound");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.email && req.body.password) {
      return getUserByEmail(req,res)
    } else {
      return res.status(200).json({ error: "Credenciales incorrectas" });
    }
  }
  return res.status(404).json({ error: "Not found" });
}
