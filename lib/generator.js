"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = exports.install = exports.clone = exports.askInitialize = exports.initialize = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const shelljs_1 = __importDefault(require("shelljs"));
const index_1 = require("./interfaces/index");
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
exports.initialize = (appName) => {
    let appDirectory = path_1.default.resolve(process.cwd(), appName);
    fs_extra_1.default.exists(appDirectory, (exists) => {
        if (exists) {
            console.log(chalk_1.default.redBright("Specified directory is already exist, grandjs app cannot be initialized"));
            return process.exit(1);
        }
        else {
            fs_extra_1.default.mkdir(appDirectory, (err) => __awaiter(void 0, void 0, void 0, function* () {
                console.log("creating the project folder ......");
                if (err) {
                    console.log(err);
                    console.log("failed to initialize app".red);
                    return process.exit(1);
                }
                else {
                    exports.askInitialize().then((answers) => {
                        exports.bootstrap(appName, answers.projectType[0]);
                    }).catch(err => {
                        console.log(err);
                        console.log(chalk_1.default.redBright("PROCESS FAILED"));
                        process.exit(1);
                    });
                }
            }));
        }
    });
};
exports.askInitialize = () => __awaiter(void 0, void 0, void 0, function* () {
    return inquirer_1.default.prompt([
        {
            type: "checkbox",
            message: "select project type",
            name: "projectType",
            choices: [
                {
                    name: "API"
                },
                {
                    name: "Fullstack",
                }
            ],
            validate: (answer) => {
                if (answer.length < 1) {
                    return "you have to select project type";
                }
                return true;
            }
        },
    ]).then(answers => {
        return Promise.resolve(answers);
    }).catch(err => {
        console.log(err);
        return Promise.reject();
    });
});
exports.clone = (appName, project) => {
    console.log("clonning app");
    shelljs_1.default.cd(path_1.default.join(process.cwd(), appName));
    shelljs_1.default.exec(`git clone ${project} .`);
};
exports.install = () => {
    console.log("installing dependencies");
    shelljs_1.default.exec("npm i");
    console.log(chalk_1.default.greenBright("Dependencies installed sucessfully"));
};
exports.bootstrap = (appName, projectType) => {
    console.log("bootstrapping the project");
    let project;
    if (projectType === index_1.AppType.Fullstack) {
        project = index_1.ProjectRepos.FullStack;
    }
    else if (projectType === index_1.AppType.API) {
        project = index_1.ProjectRepos.API;
    }
    console.log(project);
    console.log("project type", projectType);
    exports.clone(appName, project);
    exports.install();
};
