import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken; // Assuming you are storing the token in cookies

    if (!token) {
        return res.status(403).json({ success: false, message: "Token is missing" });
    }

    // If token exists, then verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }

        req.user = user;
        next(); // Don't forget to call next
    });
};


export const verifyUser = (req, res, next) => {
    // Call verifyToken directly and perform additional checks in the callback
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authenticated" });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    // Call verifyToken directly and perform additional checks in the callback
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authorized" });
        }
    });
};
