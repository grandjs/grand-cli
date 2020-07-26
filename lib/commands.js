"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const commander_1 = __importDefault(require("commander"));
const shelljs_1 = __importDefault(require("shelljs"));
const generator_1 = require("./generator");
const chalk_1 = __importDefault(require("chalk"));
exports.init = () => {
    commander_1.default.version("1.0.0")
        .description("grandjs cli")
        .command("init <appName>").alias("i")
        .description("initialize new app")
        .action(generator_1.initialize);
    commander_1.default.command("dev")
        .action(() => {
        console.log(chalk_1.default.greenBright("running the app.."));
        shelljs_1.default.exec("npm run dev");
    });
    commander_1.default.command("build")
        .action(() => {
        console.log(chalk_1.default.greenBright("building the app.."));
        shelljs_1.default.exec("tsc -p .");
        console.log(chalk_1.default.greenBright("app built successfully"));
    });
    commander_1.default.parse(process.argv);
};
