// Load Test Data
function getData() {
  data = [
    {
      planYear: 2016,
      desc: "In-Network Deductible",
      type: "Individual",
      current: 469.62,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Out-of-Pocket",
      type: "Individual",
      current: 834.98,
      max: 1500,
    },
    {
      planYear: 2016,
      desc: "Out-of-Network Deductible",
      type: "Family",
      current: 203.41,
      max: 3000,
    },
    {
      planYear: 2017,
      desc: "In-Network Deductible",
      type: "Individual",
      current: 568.91,
      max: 3000,
    },
    {
      planYear: 2017,
      desc: "In-Network Out-of-Pocket",
      type: "Family",
      current: 34.48,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Deductible",
      type: "Family",
      current: 334.58,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Out-of-Pocket",
      type: "Family",
      current: 792.09,
      max: 1500,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Deductible",
      type: "Individual",
      current: 269.64,
      max: 3000,
    },
    {
      planYear: 2016,
      desc: "Out-of-Network Deductible",
      type: "Family",
      current: 321.46,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Deductible",
      type: "Individual",
      current: 393.79,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Out-of-Pocket",
      type: "Individual",
      current: 284.33,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Out-of-Pocket",
      type: "Individual",
      current: 504.29,
      max: 1500,
    },
    {
      planYear: 2016,
      desc: "In-Network Out-of-Pocket",
      type: "Individual",
      current: 554.94,
      max: 3000,
    },
    {
      planYear: 2016,
      desc: "In-Network Deductible",
      type: "Family",
      current: 255.86,
      max: 1000,
    },
    {
      planYear: 2016,
      desc: "In-Network Deductible",
      type: "Individual",
      current: 254.34,
      max: 1500,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Deductible",
      type: "Individual",
      current: 693.35,
      max: 1000,
    },
    {
      planYear: 2017,
      desc: "In-Network Out-of-Pocket",
      type: "Family",
      current: 674.62,
      max: 3000,
    },
    {
      planYear: 2016,
      desc: "In-Network Deductible",
      type: "Individual",
      current: 803.1,
      max: 3000,
    },
    {
      planYear: 2016,
      desc: "In-Network Out-of-Pocket",
      type: "Family",
      current: 181.98,
      max: 1500,
    },
    {
      planYear: 2017,
      desc: "Out-of-Network Deductible",
      type: "Individual",
      current: 871.33,
      max: 3000,
    },
  ];
  return data;
}
// End Test Data

// *************************
//     Table Settings
// *************************

var sortBy = "planYear"; // Sort by specified data field key
var direction = "DESC"; // Descending or ascending sorting. DESC or ASC.
// Set as many table filters as you like. New table will be created when there is a value.
//  filterKey = ['cond1', 'cond2'... ];
var filterKey = ["type", "desc", "planYear"]; // database field name
var filterKey2 = ["desc"]; // second filter condition. Leave blank for only one filter.
var filterType = ["Family", "In-Network Deductible", 2016]; // what to filter - Must be equal length to filterKey
var filterType2 = ["Out-of-Network Deductible"];
var filterTitle = [
  "Family Table & OOO Deductible Table",
  "In-Network Deductible Table",
  "Only 2016 Table",
]; // Optional table header - this can be blank

// *************************
//    End Table Settings
// *************************

// Sort the data
function SortData(newData) {
  this.newData = newData;
  newData = newData.sort(function (a, b) {
    if (typeof a[sortBy] == "number") {
      if (direction === "DESC") {
        return b[sortBy] - a[sortBy];
      } else if (direction === "ASC") {
        return a[sortBy] - b[sortBy];
      }
    } else {
      var nameA = a[sortBy].toUpperCase();
      var nameB = b[sortBy].toUpperCase();
      if (direction === "DESC") {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
      if (direction === "ASC") {
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      }
    }
  });
}
//End Sorting

//Build the table
function ConstructData(sortedData) {
  this.data = sortedData;
  //Set Table Variables
  var tableGen = function (spec) {
    console.log({ spec });
    this.spec = spec;
    var planYear = data[i].planYear;
    var desc = data[i].desc;
    var type = data[i].type;
    var current = data[i].current.toFixed(2);
    var max = data[i].max.toFixed(2);
    var percent = Math.round((current / max) * 100);
    var row = "";
    row += "<tr><td>" + planYear + "</td>";
    row += "<td>" + desc + "</td>";
    row += "<td>" + type + "</td>";
    row += "<td>$" + current + "</td>";
    row += "<td>$" + max + "</td>";
    row +=
      "<td><div class='balance' style='background:linear-gradient(to right, #5dd38e  " +
      percent +
      "%, #f2f2f2 " +
      percent +
      "%)'>" +
      percent +
      "%</div></td></tr>";
    var spec = row;
    return spec;
  };

  //Generate the Table
  var accumTablePar = document.getElementById("balanceTable0");
  for (let t = 0; t < filterKey.length; t++) {
    console.log(filterKey[t]);
    if (filterKey[t]) {
      if (t != 0) {
        var prev = t - 1;
        var accumTablePar = document.getElementById("balanceTable" + prev);
        var accumTable = accumTablePar.cloneNode(true);
        accumTable.id = "balanceTable" + t;
        accumTablePar.parentNode.insertBefore(
          accumTable,
          accumTablePar.nextSibling
        );
      }
      var balanceTable = "#balanceTable" + t + " #accumTable";
      var table = document.querySelector(balanceTable);
      table.innerHTML = "";
      for (var i = 0; i < data.length; i++) {
        var splitData = data[i];
        if (filterKey2[t]) {
          if (
            splitData[filterKey[t]] === filterType[t] &&
            splitData[filterKey2[t]] === filterType2[t]
          ) {
            var newTableGen = tableGen(t);
            table.innerHTML += newTableGen;
          }
        } else {
          if (splitData[filterKey[t]] === filterType[t]) {
            var newTableGen = tableGen(t);
            table.innerHTML += newTableGen;
          }
        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      }
      if (filterTitle[t]) {
        var tabHeader = document.createElement("H4");
        var accumTableID = document.getElementById("balanceTable" + t);
        accumTableID.parentNode.insertBefore(tabHeader, accumTableID);
        tabHeader.innerHTML = filterTitle[t];
      }
    }
  }
}
//End Table build

// Assign column names from TH fields to table cells
function respTable() {
  // Cycle each table with class respTable
  var respTable = document.getElementsByClassName("respTable");
  for (var i = 0; i < respTable.length; i++) {
    // Each Heading in row
    var tableHeader = respTable[i].getElementsByTagName("TH");
    for (var h = 0; h < tableHeader.length; h++) {
      // Each row in header column
      var header = tableHeader[h].innerHTML.trim();
      var tableRow = respTable[i].getElementsByTagName("TR");
      for (var r = 0; r < tableRow.length; r++) {
        // Same column as header column
        var tableCol = tableRow[r].getElementsByTagName("TD");
        for (var c = 0; c < tableCol.length; c++) {
          var skip = false;
          if (c == h) {
            if (skip) continue;
            var cellInner = tableCol[h].innerHTML;
            var respCell = "";
            respCell += "<b>" + header + "</b>";
            respCell += cellInner;
            tableCol[h].innerHTML = respCell;
            skip = true;
          }
        }
      }
    }
  }
}

var dataSource = new getData();
var sortedSource = new SortData(dataSource);
// console.log(sortedSource);
new ConstructData(sortedSource);
// respTable();
