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

const tracker = {
  viewData: (view, id) => {

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
    
    return new Promise((resolve, reject) => {
      connection.query(query, [table], (err, result) => {
        if (err) throw err;

        console.table(result);

        return resolve(result);
       
      });
    });

  },
  createData: (firstName, lastName, roleId, managerId) => {

    let data = { 
      first_name: connection.escape(firstName),
      last_name: connection.escape(lastName),
        role_id: connection.escape(roleId),
      manager_id: connection.escape(managerId)
    }
    
    let query = `INSERT INTO employee SET ?`;
    
    return new Promise((resolve, reject) => {
      connection.query(query, data, (err, result) => {
        if(err) throw err;

        console.log(result.insertId)

        return resolve(result);
      });
    });
  },
  updateData: (table, dataObj, id) => {

    let data = [];

    Object.entries(dataObj).forEach(key => data.push(key.join('=')));

    let query = `UPDATE ? SET ${data} WHERE id = ?`;
    //let query = `UPDATE employee SET ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [table, id], (err, result) => {
        if(err) throw err;

        if (result.affectedRows == 0) {
          // ID does not exists, therefore nothing was deleted.
          console.log('Data ID was invalid. Nothing was updated.');
        }
        else {
          console.log('Data ID: ' + id + ' was successfully updated.')
        }

        return resolve(result);
      });
    });

  },
  deleteData: (table, id) => {

    let query = `DELETE FROM ?? WHERE id = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [table, id], (err, result) => {
        if (err) throw err;

        if (result.affectedRows == 0) {
          // ID does not exists, therefore nothing was deleted.
          console.log('Data ID was invalid. Nothing was deleted.');
        }
        else {
          console.log('Data ID: ' + id + ' was successfully deleted.')
        }
        return resolve(result);
      });
    });
  }
}

module.exports = tracker;