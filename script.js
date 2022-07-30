const fetchData = async () => (await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/Honda?format=json')).json();

var results;

fetchData()
  .then(data => {
    results = data.Results;
    console.log(results)
  });



function convertJsonToHtmlTable() {
  //Get the headers from JSON data
  var headers = Object.keys(results[0]);
  console.log(headers);
  //Prepare html header
  var headerRowHTML = '<tr>';
  for (var i = 0; i < headers.length; i++) {
    headerRowHTML += '<th>' + headers[i] + '</th>';
  }
  headerRowHTML += '</tr>';

  //Prepare all the employee records as HTML
  var allRecordsHTML = '';
  for (var i = 0; i < results.length; i++) {

    //Prepare html row
    allRecordsHTML += '<tr>';
    for (var j = 0; j < headers.length; j++) {
      var header = headers[j];
      allRecordsHTML += '<td>' + results[i][header] + '</td>';
    }
    allRecordsHTML += '</tr>';

  }

  //Append the table header and all records
  var table = document.getElementById("display_json_data");
  table.innerHTML = headerRowHTML + allRecordsHTML;
}

function clearTable() {
  const parent = document.getElementById("display_json_data");

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}