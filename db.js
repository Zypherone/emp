var mysql = require("mysql");

class DB {
  constructor() {
    this.mysql = mysql;
    this.db = mysql.createConnection({
      host: "localhost",
    
      // Your port; if not 3306
      port: 3306,
    
      // Your username
      user: "root",
    
      // Your password
      password: "root",
      database: "employee_db"
    });
  }

  con = () => {
    

    // Initiate MySQL Connection.
    this.db.connect(function(err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        //return;
      }
      console.log("connected as id " + this.db.threadId);
    });

    this.db.query('SELECT * FROM employee', function(err, result) {
      if (err) throw err;
      
      return result;

    })
    //return this.db;
  }
  
  query = (test) => {

    let query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, m.last_name) AS manager FROM employee AS e
    INNER JOIN role AS r ON (e.role_id = r.id)
    INNER JOIN department AS d ON (r.department_id = d.id)
    INNER JOIN employee AS m ON (e.manager_id = m.id)
    WHERE e.id != -1`;

    //console.log(this.db);
    //return;

    //return query;

    this.db.query('SELECT * FROM employee', function(err, result) {
      if (err) throw err;
      
      return result;

    })

  }

  insert = () => {

  }

  update = () => {

  }

  delete = () => {

  }

  close = () => {

  }
}

module.exports = DB;