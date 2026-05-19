import jsonwebtoken from "jsonwebtoken";

export default function authentify(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.json("couldn't log in");
  }
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.json("log in");
  }
}
