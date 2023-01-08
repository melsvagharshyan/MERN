import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(404).json({message: "User not auth"});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded?.id;
        next();
    } catch (err) {
        console.log(err);
    }
}