const dbCtrl = require('./dbCtrl');

const userCtrl = {};

userCtrl.sendTableList = (req, res) => {
  dbCtrl.showTables(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end('error')
    });
}

userCtrl.sendTable = (req, res) => {
  dbCtrl.getTable(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end('error')
    });
}

userCtrl.createTable = (req, res) => {
  console.log(req.body);
  dbCtrl.createTable(req.body)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end('error')
    });
}

userCtrl.insertEntry = (req, res) => {
  dbCtrl.insertRow(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end('error')
    });
}

userCtrl.updateEntry = (req, res) => {
  dbCtrl.updateRow(req.body)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end('error')
    });
}

userCtrl.deleteEntry = (req, res) => {
  dbCtrl.deleteRow(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end('error')
    });
}

userCtrl.rawQuery = (req, res) => {
  dbCtrl.commandLine(req.body)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end('error')
    });
}
userCtrl.dropTable = (req, res) => {
  dbCtrl.dropTable(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end('error')
    });
}
userCtrl.count = (req, res) => {
  dbCtrl.count(req.body)
    .then(result => {
      console.log('user controller', result);
      res.json(result);
    })
    .catch(err => {
      console.log(err)
      res.end('error')
    })
}
userCtrl.sum = (req, res) => {
  dbCtrl.sum(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.end('error')
    })
}
userCtrl.average = (req, res) => {
  dbCtrl.average(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.end('error')
    })
}

userCtrl.divide = (req, res) => {
  dbCtrl.divide(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.send('error')
    })
}

userCtrl.multiply = (req, res) => {
  dbCtrl.multiply(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.send('error')
    })
}

userCtrl.searchTable = (req, res) => {
  dbCtrl.searchTable(req.body)
    .then((result) => {
      console.log(result);
      res.json(result);
    }).catch((err) => {
      console.log(err);
      res.end('error')
    })
}

///////////////////////////////////

userCtrl.sendJoinTable = (req, res) => {
  dbCtrl.getJoinTable(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end('error');
    });
}

userCtrl.sendTableFields = (req, res) => {
  dbCtrl.getTableFields(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end('error')
    });
}

// Send New CSV to Upload
userCtrl.sendUploadTable = (req, res, next) => {
  dbCtrl.createUploadTable(req.body)
    .then((result) => {
      next();
      // res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.end('error')
    });
}

userCtrl.insertUploadEntries = (req, res) => {
  dbCtrl.insertUploadRows(req.body);
  res.status(200).end();
}

userCtrl.renderChart = (req, res) => {
  res.json(dbCtrl.renderChart(req.body));
}

userCtrl.log = (req, res) => {
  dbCtrl.log(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.end('error')
    })
}

module.exports = userCtrl;
