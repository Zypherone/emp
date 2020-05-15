var mysql = require("mysql");

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_db"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

function viewData(view, id) {

  //let query = 'SELECT ? ';

  let table = '';

  let query =  `SELECT e.id, 
      e.first_name AS 'First Name', 
      e.last_name AS 'Last Name', 
      r.title AS Title, 
      d.name AS Department, 
      r.salary AS Salary, 
      CONCAT(m.first_name, ' ', m.last_name) AS Manager 
    FROM employee AS e
      INNER JOIN role AS r ON (e.role_id = r.id)
      INNER JOIN department AS d ON (r.department_id = d.id)
      INNER JOIN employee AS m ON (e.manager_id = m.id)
    WHERE ?? != -1`;

  switch(view) {
    case 'department':
        table = 'd.id';
        query = !id ? query : query.concat(' AND d.id = ?'.replace('?', parseInt(id)));
      break;
    case 'role':
        table = 'r.id';
        query = !id ? query : query.concat(' AND r.id = ?'.replace('?', parseInt(id)));
      break;
    case 'employee':
    default:
        table = 'e.id';
        query = !id ? query : query.concat(' AND e.id = ?'.replace('?', parseInt(id)));
      break;
  }


  connection.query(query, [table], (err, res) => {
    if (err) throw err;

    console.table(res);
  })


}

//viewData('employee', 3);

//INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Kida','Akashima', 8, 7);


function createData(firstName, lastName, roleId, managerId) {

  let data = { 
    first_name: connection.escape(firstName),
     last_name: connection.escape(lastName),
       role_id: connection.escape(roleId),
    manager_id: connection.escape(managerId)
  }
  
  let query = `INSERT INTO employee SET ?`;
  
  connection.query(query, data, (err, result) => {
    if(err) throw err;

    console.log(result.insertId)
  });
}

//createData('China', 'Doll', 2, 1);



function updateData(table, dataObj, id) {

  let data = [];

  Object.entries(dataObj).forEach(key => data.push(key.join('=')));

  let query = `UPDATE ? SET ${data} WHERE id = ?`;
  //let query = `UPDATE employee SET ? WHERE id = ?`;

  connection.query(query, [table, id], (err, result) => {
    if(err) throw err;

    if (result.affectedRows == 0) {
      // ID does not exists, therefore nothing was deleted.
      console.log('Data ID was invalid. Nothing was updated.');
    }
    else {
      console.log('Data ID: ' + id + ' was successfully updated.')
    }
  });

}

/*
let firstName = 'Danu';
let lastName = 'Tucker';
let roleId = 1;
let managerId = -1;

let answers = { 
  first_name: connection.escape(firstName),
   last_name: lastName,
     role_id: roleId,
  manager_id: managerId
}

updateData('table', answers, 1);
*/

function deleteData(table, id) {

  let query = `DELETE FROM ?? WHERE id = ?`;

  connection.query(query, [table, id], (err, result) => {
    if (err) throw err;

    if (result.affectedRows == 0) {
      // ID does not exists, therefore nothing was deleted.
      console.log('Data ID was invalid. Nothing was deleted.');
    }
    else {
      console.log('Data ID: ' + id + ' was successfully deleted.')
    }
  })
}

//deleteData('employee', 17);