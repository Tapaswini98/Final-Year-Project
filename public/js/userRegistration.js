let dept, desg, role;
let deptNames;
async function getDepartments() {
  await fetch("http://localhost:3000/findDept")
    .then((response) => response.json())
    .then((data) => (dept =data))
    .then(function () {
      var select = document.getElementById("department");
      dept.forEach((val) => {
        var option = document.createElement("option");
        option.value =val.name;
        option.text =val.name;

        select.appendChild(option);
      });
    });
}
async function getDesignations() {
  var options = { method: "GET", headers: {} };
  await fetch("http://localhost:3000/findDesg", options)
    .then((response) => response.json())
    .then((data) => (desg = data))
    .then(function () {
      var select = document.getElementById("designation");
      desg.forEach((val) => {
        var option = document.createElement("option");
        option.value =val.name;
        option.text =val.name;
        select.appendChild(option);
      });
    });
}
async function getRoles() {
  var options = { method: "GET", headers: {} };
  await fetch("http://localhost:3000/findRole", options)
    .then((response) => response.json())
    .then((data) => (role =data))
    .then(function () {
      var select = document.getElementById("role");
      role.forEach((val) => {
        var option = document.createElement("option");
        option.value =val.name;
        option.text =val.name;
        select.appendChild(option);
      });
    });
}
getDepartments();
getRoles();
getDesignations();