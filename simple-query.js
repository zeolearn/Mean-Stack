var oracledb = require('oracledb');

oracledb.getConnection(
  {
    user          : "hr",
    password      : "welcome",
    connectString : "141.144.35.212:1521/ORCL.atplabhi.oraclecloud.internal"
  },
  function(err, connection)
  {
    if (err) { console.error(err.message); return; }

    connection.execute(
      "SELECT department_id, department_name " +
        "FROM departments " +
        "WHERE manager_id >= :id",
      [110],  // bind value for :id
      function(err, result)
      {
        if (err) { console.error(err.message); return; }
        console.log(result.rows);
      });
  });