import program from "commander"
import {prompt} from "inquirer"
import fs from "fs-extra";
import colors from "colors"
import shell from "shelljs";
import {initialize} from "./generator"
import chalk from "chalk";

export const init = () => {
    program.version("1.0.0")
    .description("grandjs cli")
    .command("init <appName>").alias("i")
    .description("initialize new app")
    .action(initialize)
    program.command("dev")
    .action(() => {
        console.log(chalk.greenBright("running the app.."))
        shell.exec("npm run dev");
    })
    program.command("build")
    .action(() => {
        console.log(chalk.greenBright("building the app.."))
        shell.exec("tsc -p .");
        console.log(chalk.greenBright("app built successfully"))
    })
    program.parse(process.argv);
}