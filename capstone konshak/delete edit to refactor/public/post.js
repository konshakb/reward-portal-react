document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons() {
  document
    .getElementById("submitPOST")
    .addEventListener("click", function(event) {
      var userInput = {};
      userInput.firstname = document.getElementById("firstname").value;
      userInput.lastname = document.getElementById("lastname").value;
      userInput.region = document.getElementById("region").value;
      userInput.email = document.getElementById("email").value;
      userInput.password = document.getElementById("password").value;

      //open request and post data
      var req = new XMLHttpRequest();

      //strcat data to be sent by get request
      var comp =
        "?firstname=" +
        userInput.firstname +
        "&" +
        "lastname=" +
        userInput.lastname +
        "&" +
        "region=" +
        userInput.region +
        "&" +
        "email=" +
        userInput.email +
        "&" +
        "password=" +
        userInput.password;

      req.open("GET", "/insert" + comp, true);
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      //check if request is valiid and get response data
      req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
          var response = JSON.parse(req.responseText);

          var tr = document.createElement("tr"); //create tr, and in inner loop will now be filled with tds

          for (var val in response.results) {
            var tr = document.createElement("tr"); //create tr, and in inner loop will now be filled with tds
            var obj = response.results[val];

            //build table cells for each type of data
            for (var prop in obj) {
              if (prop !== "id") {
                var td = document.createElement("td"); //create td
                tr.appendChild(td); //put td into tr
                td.innerHTML = obj[prop];
                td.style.border = "1px solid black";
                //td.style.padding = "10px";
              }
            }
            //create delete button
            var td = document.createElement("td");
            tr.appendChild(td);
            var deleteBtn = document.createElement("button");
            var deleteBtnTitle = document.createTextNode("Delete");
            deleteBtn.appendChild(deleteBtnTitle);
            td.appendChild(deleteBtn);
            deleteBtn.id = obj.id;
            deleteBtn.onclick = function() {
              deleteRow("dataTable", this, obj.id);
            };
            td.style.border = "1px solid black";

            //create edit button
            var td = document.createElement("td");
            tr.appendChild(td);
            var editBtn = document.createElement("button");
            var editBtnTitle = document.createTextNode("Edit");
            editBtn.appendChild(editBtnTitle);
            td.appendChild(editBtn);
            editBtn.id = obj.id;
            editBtn.onclick = function visitPage() {
              window.location = "/edit?id=" + obj.id;
            };
            td.style.border = "1px solid black";

            document.getElementById("data").appendChild(tr); //put tr into tbody
          }
        } else {
          console.log("Error in network request: " + req.statusText);
        }
      });
      req.send(null);
      event.preventDefault();
    });
}

//Delete row referenced from jsfiddle post by instructor
function deleteRow(tableID, currentRow, id) {
  try {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    for (var i = 0; i < rowCount; i++) {
      var row = table.rows[i];

      if (row == currentRow.parentNode.parentNode) {
        if (rowCount <= 1) {
          alert("Cannot delete all the rows.");
          break;
        }
        table.deleteRow(i);
        rowCount--;
        i--;
      }
    }

    //open request to delete row from database
    var req = new XMLHttpRequest();
    req.open("GET", "/delete?id=" + id, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    req.addEventListener("load", function() {
      if (req.status >= 200 && req.status < 400) {
        //var response = JSON.parse(req.responseText);
        //alert(response);
      } else {
        //var err = "Error in network request: " + req.statusText;
        alert("error");
      }
    });
    req.send(null);
  } catch (e) {
    alert(e);
  }
}
