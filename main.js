#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let condition = true;
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "options",
                type: "list",
                message: chalk.blueBright("Select the option you want to use"),
                choices: [
                    "Add Task",
                    "Delete Task",
                    "Update Task",
                    "View Todolist",
                    "Exit",
                ],
            },
        ]);
        if (option.options === "Add Task") {
            await addTask();
        }
        else if (option.options === "Delete Task") {
            await deleteTask();
        }
        else if (option.options === "Update Task") {
            await updateTask();
        }
        else if (option.options === "View Todolist") {
            await viewTask();
        }
        else if (option.options === "Exit") {
            condition = false;
            console.log(chalk.blueBright(`Your Todo-List: ${chalk.whiteBright.bold(todos)}`));
        }
    }
};
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.blueBright("Enter your Task:"),
        },
    ]);
    todos.push(newTask.task);
    console.log(chalk.greenBright(`\n ${chalk.green(newTask.task)} is added to your list`));
};
let viewTask = () => {
    console.log(chalk.yellowBright("\n Your Todo-List: \n"));
    todos.forEach((task, index) => {
        console.log(chalk.whiteBright.bold(`${index + 1}: ${task}`));
    });
    console.log("\n");
};
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.blueBright("Enter the Index No. of task you want to delete from your list:"),
        },
    ]);
    let deletedTask = todos.splice(taskIndex.index - 1, 1);
    console.log(chalk.greenBright(`\n ${chalk.green(deletedTask)} this task is deleted from your Todo-List\n`));
};
let updateTask = async () => {
    await viewTask();
    let updateTaskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.blueBright("Enter the Index No. of task you want to update:"),
        },
        {
            name: "newTask",
            type: "input",
            message: chalk.blueBright("Enter your new task:"),
        },
    ]);
    todos[updateTaskIndex.index - 1] = updateTaskIndex.newTask;
    console.log(chalk.greenBright(`\n Task at index No.${chalk.green(updateTaskIndex.index - 1)} is updated`));
};
main();
