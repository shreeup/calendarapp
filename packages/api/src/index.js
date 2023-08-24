"use strict";
// packages/api/src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = 5000;
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.listen(port, function () { return console.log("Listening on http://localhost:".concat(port)); });
