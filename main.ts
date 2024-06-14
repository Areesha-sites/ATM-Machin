import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import ora from "ora";

// Initialize user balance and pin code.
let myBalance: number = 10000; // Dollar
const myPin: number = 1234;

// Display welcome message using figlet
console.log(chalk.cyan(figlet.textSync("Welcome To ATM Machine")));

// Start spinner
const spinner = ora("Initializing ATM...").start();

setTimeout(async () => {
  spinner.stop();
  
  let pinAnswer = await inquirer.prompt([
    {
      name: "pin",
      type: "number",
      message: chalk.yellow("Enter your pin number"),
    },
  ]);

  if (pinAnswer.pin === myPin) {
    console.log(chalk.green("Pin is correct, login successfully!"));
    console.log(chalk.magenta(`Current account balance is ${myBalance}`));

    let operationAns = await inquirer.prompt([
      {
        name: "operation",
        type: "list",
        message: chalk.yellow("Select an option"),
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
        console.log(chalk.red("Insufficient Balance"));
      } else {
        myBalance -= amountAns.amount;
        console.log(chalk.green(`${amountAns.amount} withdrawn successfully!`));
        console.log(chalk.magenta(`Your Remaining balance is ${myBalance}`));
      }
    } else if (operationAns.operation === "Check Balance") {
      console.log(chalk.blue(chalk.green(`Your account balance is: ${myBalance}`)));
    }
  } else {
    console.log(chalk.red("Pin is Incorrect, Try Again!"));
  }
}, 2000);


