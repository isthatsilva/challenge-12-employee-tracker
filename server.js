const inquirer = require("inquirer");
const mysql2 = require("mysql2");

require("console.table");

// mysql connection
const db = mysql2.createConnection({
    host: 'localhost',
    // your port
    port: 3306,
    // your username
    user: 'root',
    // your password
    password: 'lola',
    database: 'employee_db'
});

db.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + db.threadId);
    console.log(` 
    ###################################
             Employee Manager          
    ###################################
    `)
    // runs app
    startUp();
});

// starts prompts
function startUp() {
    inquirer
      .prompt({
        type: "list",
        name: "option",
        message: "Please select one.",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee role",
          "Quit"
        ],
      })
      .then(function(result) {
        console.log("You entered: " + result.option);
  
        switch (result.option) {
          case "Add department":
            addDepartment();
            break;
          case "Add role":
            addRole();
            break;
          case "Add employee":
            addEmployee();
            break;
          case "View departments":
            viewDepartment();
            break;
          case "View roles":
            viewRoles();
            break;
          case "View employees":
            viewEmployees();
            break;
          case "Update employee role":
            updateEmployee();
            break;
          default:
            quit();
        }
      });
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "deptName",
        message: "Enter department name.",
    })
    .then(function(answer) {
        db.query("INSERT INTO department (name) VALUES (?)", [answer.deptName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            startUp()
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
          type: "input",
          message: "Enter role name",
          name: "roleName"
        },
        {
          type: "input",
          message: "Enter salary",
          name: "salaryTotal"
        },
        {
          type: "input",
          message: "Enter department id number",
          name: "deptID"
        }
    ])
    .then(function(answer) {
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
          if (err) throw err;
          console.table(res);
          startUp();
        });
    });
}

function addEmployee() {
    inquirer.prompt([
        {
          type: "input",
          message: "Enter first name",
          name: "firstName"
        },
        {
            type: "input",
            message: "Enter last name",
            name: "lastName"
          },
        {
          type: "input",
          message: "Enter employee's role id number",
          name: "roleID"
        },
        {
          type: "input",
          message: "Enter manager's id number",
          name: "managerID"
        }
    ])
    .then(function(answer) {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function(err, res) {
          if (err) throw err;
          console.table(res);
          startUp();
        });
    });
}

function viewDepartment() {
     // select from the db
    let query = "SELECT * FROM department";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startUp();
    });
    // display result to user (console.table)
}

function viewRoles() {
    // select from the db
    let query = "SELECT * FROM role";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startUp();
    });
    // display result to user (console.table)
}

function viewEmployees() {
    // select from the db
    let query = "SELECT * FROM employee";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startUp();
    });
    // display result to user (console.table)
}

function updateEmployee() {
    inquirer.prompt([
        {
          type: "input",
          message: "Enter employee you want to update",
          name: "updateEmployee"
        },
        {
          type: "input",
          message: "Enter update role for employee",
          name: "updateRole"
        }
    ])
    .then(function(answer) {
        db.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.updateEmployee],function(err, res) {
          if (err) throw err;
          console.table(res);
          startUp();
        });
    });
}

function quit() {
    connection.end();
    process.exit();
  }