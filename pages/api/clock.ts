// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const requestMethod = req.method;
  console.log(req.body);
  switch (requestMethod) {
    case "PUT":
      res.status(200).json({ name: "PUT RESPONSE" });
      break;
    case "PATCH":
      res.status(200).json({ name: "PATCH RESPONSE" });
      break;
    case "GET":
      res.status(200).json({ name: "GET RESPONSE" });
      break;
    default:
      res.status(200).json({ name: "DEFAULT RESPONSE" });
  }
}
