const inquirer = require("inquirer");
const database = require('./functions');
const tracker = require("./functions");

class Employee {
  constructor() {
    this.p;
  } 

  load(...arg) {

    this.ip = inquirer, 
    this.db = database,
    this.id = -1;
    this.op = [
      "first_name",
      "last_name",
      "role_id",
      "manager_id"
    ]
  }

  // We need to be able to input new data, whether to create or to update.
  add(id) {

    this.update()
  }

  update() {
    let updateList = [
      {
        type: 'rawlist',
        name: 'employeeName',
        message: 'Please select which employee you would like to update',
        choices: () => {
          //return list;
          return database.viewBy('employee');
        }
      }
    ]
  
    this.ip.prompt(updateList)
    .then((res) => {
      //this.updateId = 
      //console.log(res);
      
      this.updateId(res)
      return;
    })
    return;
  }

  updateId(id) {
    //console.log('test')

    this.db.getData('employee', id.employeeName)
    .then((res) => {

      this.op = this.details(res[0]);

      //console.log(this.op)
      //console.log(res[0].first_name)

      /*
      this.ip.prompt([{
        type: 'input',
        name: 'firstName',
        message: 'First Name',
        validate: function (input) {
          return (input.length > 0) ? true : 'You have not provided a valid response.'
        }
      }])
      .then((ans)=>{
        console.log(ans)
      })
      */
    })


  }

  details(data) {

    Object.keys(data).map((key) => {
      //console.log(key.indexOf('id'))

      if ( key.indexOf('id') == -1) {
        console.log(key)
      }
    })
    
  //  this.data
  }

  // If the details exists, we will display the current data store.
  current() {

  }

  // In case we need to remove the use
  remove() {

  }

  
}

let staff = new Employee;
staff.load(inquirer, database);

console.log(staff.add());


module.export = Employee