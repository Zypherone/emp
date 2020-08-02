// Dependencies
const inquirer = require("inquirer");
const questionArray = require('./questions.js');
const tracker = require('./functions');
const { Employee } = require('./employee');

//const actionOption = [
const options = {
  view: [
    new inquirer.Separator('>> View Options <<'), 
    'View all employees',
    'View all employees by department',
    'View all employees by role',
  ],
  create: [
    new inquirer.Separator('>> New entry options <<'),
    'Add employee',
    'Add department',
    'Add role',
  ],
  update: [
    new inquirer.Separator('>> Update Options <<'),
    'Update employee',
    'Update department',
    'Update role'
  ],
  delete: [
    new inquirer.Separator('>> Delete Options <<'),
    'Archive employee' // Use archive instead of delete for better understanding. 
  ],
  function: [
    new inquirer.Separator('>> Operational Options <<'),
    'Return to main menu',
    'Exit program'
  ]
}

function runChoice(list, role) {  

  role = !role ? 'department' : role;
  
  inquirer.prompt({
    type: 'rawlist',
    name: 'action',
    message: 'View by:',
    choices:function() {
      return list
    }
  })
  .then(ans => {
    
    

    // View the type of role: department, employee or job.
    tracker.viewData(role, ans.action)
    .then((ans) => {

      //console.log(role);

      // Ensure we only repeat the questions once.
      runProgram(role);

      

      // If by role = employee (legal team lead)
      //console.log(ans.action);

      //return ans.action;           
    });



    //console.log(ans.action);
  })

}

function runUpdate(action, list) {

  Employee.add();
  
  let updateList = [
    {
      type: 'rawlist',
      name: 'employeeName',
      message: 'Please select which employee you would like to update',
      choices: () => {
        return list;
      }
    }
  ]

  inquirer.prompt(updateList)
  .then((ans) => {
    //console.log(ans);

    tracker.getData('employee', ans.employeeName)
    .then((res) => {
      //console.log(res)

      //console.table(res);

      runAction('update', list)
    })
  })

}


function runAction(action, list) {

  let actionQuestion = [];
  let updateList = []

  if (action === 'update') {
    
  }
  
  actionQuestion = [
    {
      type: 'input',
      name: 'firstName',
      message: 'First Name',
      validate: function (input) {
        return (input.length > 0) ? true : 'You have not provided a valid response.'
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Last Name',
      validate: function (input) {
        return (input.length > 0) ? true : 'You have not provided a valid response.'
      }
    },
    {
      type: 'rawlist',
      name: 'roleId',
      message: 'Please select role',
      choices: () => {
        return tracker.viewBy('role');
      }
    },
    {
      type: 'rawlist',
      name: 'managerId',
      message: 'Please select a manager',
      choices: () => {
        return tracker.viewBy('employee');
      }
    }
  ]

  //console.log(action);

  //inquirer.prompt([].concat(updateList, employeeQuestions))
  inquirer.prompt(employeeQuestions)
  .then(ans => {
    /*

    let fixedObj = Object.keys(ans).map((key, value, index) => {
      //console.log(key, value, index);
      //console.log(ans[key]);
      //return 

      if (key === 'roleId') {
        return 1
      }

      return ans[key];
    });
    */

    // Lets grab the Ids for role and manager.
    tracker.grabId('role', ans.roleId)
    .then((result) => {
      ans.roleId = result[0].id;
      tracker.grabId('employee', ans.managerId)
      .then((result) => {
        ans.managerId = result[0].id;
        
        tracker.createData(ans)
        .then(() => {
          let name = ans.firstName + ' ' + ans.lastName;
          console.log(name + ' was succesfully added.');
          runProgram();
        })
      })
    })
    

   

    //console.log(fixedObj);

    /*
    let data = ans.map((v, i, a) => {
      console.log(d);
    })
    */
    //tracker.createData(ans)
  })
  

}


function runProgram(role) {
  
  let choices = [];

  if ( typeof role === 'string') {
    choices = [].concat(options.create[1], options.update[1], options.delete[1], options.function);
  }
  else {
    choices = [].concat(options.view, options.create, options.update, options.function);
  }

  // Provide a lsit of choices to select from, ie, view list of department, or employee or role etc....

  inquirer.prompt({
    type: 'rawlist',
    name: 'action',
    message: 'What would you like to do?',
    choices: choices
  })
  .then(ans => {

    // Switch between the main choices.

    switch(ans.action) {
      case options.view[1]:
        tracker.viewData('all')
        .then(() => {
          runProgram();
        });
        break;
      case options.view[2]:
        tracker.viewBy('department')
        .then(res => {
          runChoice(res);
        });
        break;
      case options.view[3]:
        tracker.viewBy('role')
        .then(res => {
          runChoice(res, 'role');
        });
        break;
      case options.create[1]:
          runAction('add');
        break;
        case options.update[1]:
          tracker.viewBy('employee')
          .then((res) => {
            runUpdate('employee', res)
          })
        break;
      case options.function[1]:
        runProgram();
        break;
      case options.function[2]:
        process.exit();
        break;
    }

    
    

    //process.exit();

    return;
  })

}

tracker.viewData('all').then(runProgram);
