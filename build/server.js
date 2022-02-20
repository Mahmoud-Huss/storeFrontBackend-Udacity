"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const orderHandler_1 = require("./handlers/orderHandler");
const productHandler_1 = __importDefault(require("./handlers/productHandler"));
const userhandler_1 = __importDefault(require("./handlers/userhandler"));
const PORT = process.env.PORT || 5050;
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
(0, productHandler_1.default)(exports.app);
(0, userhandler_1.default)(exports.app);
(0, orderHandler_1.orderRoutes)(exports.app);
exports.app.use(function (req, res) {
    res.status(404);
    res.send("Page not found");
});
exports.app.listen(PORT, () => {
    console.log(`SERVER STARTED AT http://localhost:${PORT}, MAKE FIREWORKS 🚀🚀`);
});
