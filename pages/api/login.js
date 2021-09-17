const prisma = require("../../prisma/prisma");

const getUserByEmail = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    return res.json(user);
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
