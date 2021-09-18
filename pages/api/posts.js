const prisma = require("../../prisma/prisma");
const jwt = require("jsonwebtoken");

// C - POST

const postPostByUser = async (req, res, auth) => {
  const { title, content, img, color } = req.body;
  let { pinned, order } = req.body;
  pinned = Boolean(pinned);
  order = Number(order);
  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.id },
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
const getPostsByUser = async (req, res, auth) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.id },
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
    if (Object.keys(req.body).includes(key)) {
      if (key === "pinned") {
        console.log(Boolean(req.body[key]));
        obj[key] = Boolean(req.body[key]);
      } else if (key === "order") {
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
  let auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) auth = auth.substring(7);
  else {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }
  const decodeAuth = jwt.verify(auth, process.env.TOKEN);
  if (req.method === "POST") {
      return postPostByUser(req, res, decodeAuth);
  }
  if (req.method === "GET") {
      return getPostsByUser(req, res, decodeAuth);
  }
  if (req.method === "PUT") {
    if (req.body.id) {
      return putPostById(req, res);
    } else {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
  }
  if (req.method === "DELETE") {
    if (req.body.id) {
      return deletePostById(req, res);
    } else {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
  }
  return res.status(404).json({ error: "Not found" });
}
