const prisma = require("../../prisma/prisma");

// C - POST

const postPostByUser = async (req, res) => {
  const { email, title, content, img, color } = req.body;
  let { pinned, order } = req.body;
  pinned = Boolean(pinned);
  order = Number(order);
  try {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    const post = await prisma.post.create({
      data: {
        title,
        content,
        img,
        pinned,
        color,
        order,
        author: {
          connect: { id: user.id },
        },
      },
    });
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// R - GET
const getPostsByUser = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await prisma.user.findFirst({
      where: { email: email },
      include: { Post: true },
    });
    return res.json(user.Post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// U - PUT

const putPostById = async (req, res) => {
  const { id } = req.body;
  const keys = ["title", "content", "img", "pinned", "color", "order"];
  let obj = {};
  keys.forEach((key) => {
    if (req.body[key]) {
      if (req.body[key] === "pinned") {
        obj[key] = Boolean(req.body[key]);
      } else if (req.body[key] === "order") {
        obj[key] = Number(req.body[key]);
      } else obj[key] = req.body[key];
    }
  });
  try {
    const post = await prisma.post.update({
      data: {
        ...obj,
      },
      where: { id: Number(id) },
    });
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// D - DELETE

const deletePostById = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    return res.json("deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.email) {
      return postPostByUser(req, res);
    } else {
      return res.status(200).json({ error: "Credenciales incorrectas" });
    }
  }
  if (req.method === "GET") {
    if (req.query.email) {
      return getPostsByUser(req, res);
    } else {
      return res.status(200).json({ error: "Credenciales incorrectas" });
    }
  }
  if (req.method === "PUT") {
    if (req.body.id) {
      return putPostById(req, res);
    } else {
      return res.status(200).json({ error: "Credenciales incorrectas" });
    }
  }
  if (req.method === "DELETE") {
    if (req.body.id) {
      return deletePostById(req, res);
    } else {
      return res.status(200).json({ error: "Credenciales incorrectas" });
    }
  }
  return res.status(404).json({ error: "Not found" });
}
