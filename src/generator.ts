import inquirer, {prompt} from "inquirer"
import fs from "fs-extra";
import colors from "colors"
import shell from "shelljs";
import {IProject, IDependency, AppType, ProjectRepos} from "./interfaces/index";
import path from "path";
import chalk from "chalk";
export const initialize = (appName:string) => {
    let appDirectory = path.resolve(process.cwd(), appName);
    fs.exists(appDirectory, (exists:boolean) => {
        if(exists) {
                console.log(chalk.redBright("Specified directory is already exist, grandjs app cannot be initialized"))
                return process.exit(1);
        } else {
            fs.mkdir(appDirectory, async(err) => {
                console.log("creating the project folder ......")
                if(err) {
                    console.log(err);
                    console.log("failed to initialize app".red);
                    return process.exit(1);
                } else {
                    askInitialize().then((answers:any) => {
                        bootstrap(appName, answers.projectType[0])
                    }).catch(err => {
                        console.log(err);
                        console.log(chalk.redBright("PROCESS FAILED"))
                        process.exit(1);
                    });
                }
            })
        }
    })
}

export const askInitialize = async () => {
    return inquirer.prompt([
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
                if(answer.length < 1) {
                    return "you have to select project type"
                }
                return true
            }
        },
        // {
        //     type: "checkbox",
        //     message: "select project form",
        //     name: "projectForm",
        //     choices: [
        //         {
        //             name: "full app",
        //         },
        //         {
        //             name: "simple app"
        //         },
        //     ],
        //     validate: (answer) => {
        //         if(answer.length < 1) {
        //             return "you have to select project form"
        //         }
        //         return true
        //     }
        // }
    ]).then(answers => {
        return Promise.resolve(answers);
    }).catch(err => {
        console.log(err);
        return Promise.reject();
    })
}

export const clone = (appName:string, project:string) => {
    console.log("clonning app")
    shell.cd(path.join(process.cwd(), appName));
    shell.exec(`git clone ${project} .`)
}

export const install = () => {
    console.log("installing dependencies");
    shell.exec("npm i");
    console.log(chalk.greenBright("Dependencies installed sucessfully"))
}

export const bootstrap =(appName:string, projectType: AppType) => {
    console.log("bootstrapping the project");
    let project:string
    if(projectType === AppType.Fullstack) {            
        project = ProjectRepos.FullStack;
    } else if(projectType === AppType.API) {
        project = ProjectRepos.API;
    }
    console.log(project);
    console.log("project type", projectType)
    clone(appName, project);
    install();
}