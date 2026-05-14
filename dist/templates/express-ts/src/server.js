"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
// I load environment variables before starting the server.
dotenv_1.default.config();
// I use the PORT from .env, but fall back to 5000 if none is provided.
const PORT = process.env.PORT || 5000;
// I start the backend server here.
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
