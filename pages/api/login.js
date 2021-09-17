const user = "admin@admin.com";
const password = "asd123";

export default function handler(req, res) {
  if (req.method === "POST") {
    if ((req.body.email === user) && (req.body.password === password)) {
      return res
        .status(201)
        .json({ firstName: "Jhon", lastName: "Doe", token: "#34" });
    } else {
        return res.status(200).json({error: "Credenciales incorrectas"});
  }}
  return res.status(404).json({error: "Not found"});
}
