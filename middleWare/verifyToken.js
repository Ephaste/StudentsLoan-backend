import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let auth = req.headers.authorization;

    let token = auth?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No access token provided",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log("decoded:", decoded);
      if (err) {
        return res.status(401).json({
          message: err.message,
        });
      }
      req.userId = decoded._id;
      req.userEmail=decoded.email
      next();
    });
  } catch (error) {
    console.log(error, "Server error");
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};
