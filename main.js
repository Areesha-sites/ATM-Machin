#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// initialize user balance and pin code.
let myBalance = 10000; // Dollar
const myPin = 1234;
console.log(chalk.cyan("Welcome to code with areesha - ATM Machin"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin number"),
    },
]);
// 12345 === 1234 - false
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("pin is correct, login successfully!"));
    console.log(chalk.magenta(`Current account balance is ${myBalance}`));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow("select an option"),
            choices: ["Withdraw Amount", "Check Balance"],
        },
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: chalk.yellow("Enter the amount to withdraw:"),
            },
        ]);
        if (amountAns.amount > myBalance) {
            console.log("Insufficient Balance");
        }
        else {
            myBalance -= amountAns.amount;
            console.log(chalk.green(`${amountAns.amount} withdraw successfully!`));
            console.log(chalk.magenta(`Your Remaining balance is ${myBalance}`));
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.blue(chalk.green(`Your account balance is: ${myBalance}`)));
    }
}
else {
    console.log(chalk.red("Pin is Incorrect, Try Again!"));
}
