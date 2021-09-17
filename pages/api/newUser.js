const prisma = require("../../prisma/prisma");

const createUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    if (email && password && firstName && lastName) {
      try {
        const user = await prisma.user.create({
          data: {
            email,
            password,
            firstName,
            lastName,
          },
        });
        return res.json(user);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    return res.status(404).json("not found");
}

export default function handler(req, res) {
  if (req.method === "POST") {
    return createUser(req,res);
}
return res.status(404).json("not found");
}

