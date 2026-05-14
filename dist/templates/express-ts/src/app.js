"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// I create my Express app in this file so the server file stays clean.
const app = (0, express_1.default)();
// I allow the API to receive JSON request bodies.
app.use(express_1.default.json());
// I enable CORS so frontend apps can communicate with this backend.
app.use((0, cors_1.default)());
// I use morgan so I can see incoming requests in my terminal during development.
app.use((0, morgan_1.default)("dev"));
// I keep a simple health route so I can quickly test if the API is running.
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Generated backend is running successfully",
    });
});
exports.default = app;
