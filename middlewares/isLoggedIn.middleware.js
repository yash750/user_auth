const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const isloggedIn = async(req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
        console.log("Error in middleware: No token found in cookie");
        return res.status(401).json({ status: false, message: "Unauthorized access" });
    }
    if(accessToken){
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findOne({ _id: decoded.id });
            if (!user) {
                return res.status(401).json({ status: false, message: "Unauthorized access" });
            }
            const newAccessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
            const newRefreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
            user.refreshToken = newRefreshToken;
            await user.save();
            res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
            res.cookie("accessToken", newAccessToken, { httpOnly: true });
            req.user = decoded;
            next();
        } catch (error) {
            console.log("Error in middleware: Invalid access token");
            return res.status(401).json({ status: false, message: "Unauthorized access" });
        }
    }
    if(refreshToken){
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await User.findOne({ _id: decoded.id });
            if (!user) {
                return res.status(401).json({ status: false, message: "Unauthorized access" });
            }
            const newAccessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
            const newRefreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
            user.refreshToken = newRefreshToken;
            await user.save();
            res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
            res.cookie("accessToken", newAccessToken, { httpOnly: true });
            req.user = decoded;
            next();
        } catch (error) {
            console.log("Error in middleware: Invalid refresh token");
            return res.status(401).json({ status: false, message: "Unauthorized access" });
        }
    }

}

module.exports = isloggedIn