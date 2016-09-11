require('dotenv').config()
var oracledb = require('oracledb');
var dbConfig = require('./config/odb.conf');

///// Refer to https://github.com/oracle/node-oracledb/tree/master/examples

console.log(dbConfig.connectString)

/// Implement as function with callback
/*
oracledb.getConnection(
  {
    user: dbConfig.user,
    password: dbConfig.password,
    connectString: dbConfig.connectString
  },
  function (err, connection) {
    if (err) { console.error(err.message); return; }

    connection.execute(
      "SELECT department_id, department_name " +
      "FROM departments " +
      "WHERE manager_id >= :id",
      [110],  // bind value for :id
      function (err, result) {
        if (err) { console.error(err.message); return; }
        console.log(result.rows);
      });
  });
  */
  //// Implement as a Promise
  oracledb.getConnection(
  {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString
  })
  .then(function(connection) {
    return connection.execute(
      "SELECT department_id, department_name " +
        "FROM departments " +
        "WHERE manager_id >= :id",
      [110]
    )
      .then(function(result) {
        console.log(result.metaData);
        console.log(result.rows);

        return connection.release();
      })
      .catch(function(err) {
        console.log(err.message);

        return connection.release();
      });
  })
  .catch(function(err) {
    console.error(err.message);
  });
