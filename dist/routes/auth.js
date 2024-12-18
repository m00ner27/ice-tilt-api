"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Protected route
router.get('/protected', (req, res) => {
    if (!req.auth) {
        return res.status(401).json({
            message: 'Unauthorized: No valid token provided.',
        });
    }
    res.status(200).json({
        message: 'You have successfully accessed a protected route!',
        user: req.auth, // User info provided by Auth0 middleware
    });
});
exports.default = router;
