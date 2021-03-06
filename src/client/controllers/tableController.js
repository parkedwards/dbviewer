angular
  .module('Dbview.TableController', ['ui.router'])
  .controller('TableController', ['$scope', 'tableService', '$stateParams', 'dbService', '$http', '$state', '$timeout', tableController])

function tableController($scope, tableService, $stateParams, dbService, $http, $state, $timeout) {
  //scope.name is the name of the table currently on display
  $scope.name = tableService.currentTable;
  $scope.displayName = tableService.currentTable;
  $scope.dataToDisplay = tableService.getData($scope.name);
  var csvContent = "data:text/csv;charset=utf-8,";
  $scope.dataToDisplay.forEach(row => {
    let rowArray = [];
    for (let key in row) {rowArray.push(key, row[key])};
    csvContent += rowArray.join(",") + "\n";
  });
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.innerHTML = 'Download Data';
  link.id = 'dataAnchor';
  link.setAttribute("download", "my_data.csv");
  document.getElementById("download").appendChild(link);
  $scope.secondquery = '';

  // reference the data that will be rendered to a table format
  $scope.gridData = {
    data: $scope.dataToDisplay,
    enableFiltering: true,
  }
  $scope.queryOptions = ['Search Query', 'SQL Query', 'Create Table', 'Insert Rows', 'Update Rows',
  'Delete Rows', 'Drop Table', 'Count', 'Sum', 'Average', 'Chart', 'Divide', 'Log', 'Multiply'];
  $scope.dataTypes = ['Integer', 'Varchar', 'Serial', 'Date', 'Time'];
  $scope.chartTypes = ['bar', 'pie', 'donut', 'line', 'spline', 'step', 'area', 'area-spline','area-step', 'scatter', 'gauge'];
  $scope.rowsToAdd = {};

  $scope.saveEntry = (column, value) => {
    $scope.rowsToAdd[column] = value;
    $scope.column = null;
    $scope.entryValue = '';
  }
  $scope.removeEntry = (column) => delete $scope.rowsToAdd[column];
  // $scope.query = '';
  $scope.queryData = {};

  // execute a raw query and update displayed table
  $scope.executeQuery = function (query, secondquery) {
    console.log(query)
    if(secondquery !== '') query = [query, secondquery];
    let route;
    let tableName = $scope.name;
    switch($scope.queryType) {
      case 'Create Table': route = '/createTable'; break;
      case 'Insert Rows': route = '/insert'; break;
      case 'Update Rows': route = '/update'; break;
      case 'Delete Rows': route = '/delete'; break;
      case 'Drop Table': route = '/dropTable'; break;
      case 'SQL Query': route = '/query'; break;
      case 'Search Query': route = '/search'; break;
      case 'Count': route = '/count'; break;
      case 'Sum': route = '/sum'; break;
      case 'Average': route = '/average'; break;
      case 'Chart': route = '/chart'; break;
      case 'Divide' : route = '/divide'; break;
      case 'Log' : route = '/log'; break;
      case 'Multiply': route = '/multiply'; break; 
      default: return;
    }
    $http({
      method: 'POST',
      url: route,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { creds: dbService.creds, where: query, valuesToInsert: $scope.rowsToAdd, table: tableName, rowData: $scope.gridData.data }
    })
      .then((response) => {
        if (response.data[0] === 'chart') {
          let numberMaker = (ele) => {
            return Number(ele.replace(/[^0-9]/g, ''));
          };
          let columnData = response.data.slice(3).reduce((acc, arrEle) => {
            let arr = [];
            arrEle.forEach((ele,ind) => {
              if(ind === 0) {
                arr.push(ele);
                return
              };
              arr.push(numberMaker(ele))
            });
            acc.push(arr);
            return acc;
          },[]);
          console.log(response);
                    var chart = c3.generate({
            bindto: '#chart',
            data: {
              columns: columnData,
              type: response.data[1]
            },
            axis: {
              x: {
                type: 'category',
                categories: response.data[2].slice(1)///add array
              }
            }
          });
        return;
        }
        const columns = Object.keys(response.data[0]).map( (colname) => {
          return { field: colname };
        });
        // save the data in table service and update grid data
        tableService.addTableData($scope.name, response.data)
        $scope.dataToDisplay  = tableService.getData($scope.name);
        console.log('this is $scope.dataToDisplay: ', $scope.dataToDisplay);
        $scope.gridData = {
          columnDefs: columns,
          data: $scope.dataToDisplay,
          enableFiltering: true,
        }
        var csvContent = "data:text/csv;charset=utf-8,";
        $scope.dataToDisplay.forEach(row => {
          let rowArray = [];
          for (let key in row) {rowArray.push(key, row[key])};
          csvContent += rowArray.join(",") + "\n";
        });
        var encodedUri = encodeURI(csvContent);
        document.getElementById("dataAnchor").setAttribute("href", encodedUri);
        $scope.displayName = 'Query Result';
      })
  };
}
