const api = 'http://localhost:3000/benefits';
var row = null;

function submitform() {
    if (!validateform()) {
        return;
    }
    var enteredData = retrievedData();
    if (enteredData === false) {
        alert('Some details are not entered');
    } else 
    {
        if (row == null) {
            insert(enteredData);
        } 
        else {
            updateData(enteredData);
            row = null;
        }
    }
}

function validateform() {
    var name = document.getElementById('name').value;
    var descrip = document.getElementById('description').value;
    var eligibility = document.getElementById('eligibility_cri').value;
    var coverage = document.getElementById('coverage_amt').value;
    var start = document.getElementById('start_date').value;
    var end = document.getElementById('end_date').value;

    var nameRegex = /^[A-Za-z\s]+$/;
    var descriptionRegex = /^.{10,}$/;
    var eligibilityRegex = /^.{5,}$/;
    var coverageRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

    if (!nameRegex.test(name)) {
        alert('Benefit name must only contain letters and spaces');
        return false;
    }
    if (!descriptionRegex.test(descrip)) {
        alert('Description must be at least 10 characters long');
        return false;
    }
    if (!eligibilityRegex.test(eligibility)) {
        alert('Eligibility criteria must be atleast 5 characters long');
        return false;
    }
    if (!coverageRegex.test(coverage)) {
        alert('Coverage amount must be a valid number');
        return false;
    }
    if (new Date(start) > new Date(end)) {
        alert('End date must be after start date');
        return false;
    }
    return true;
}

function retrievedData() {
    var name = document.getElementById('name').value;
    var descrip = document.getElementById('description').value;
    var eligibility = document.getElementById('eligibility_cri').value;
    var coverage = document.getElementById('coverage_amt').value;
    var start = document.getElementById('start_date').value;
    var end = document.getElementById('end_date').value;
    var dataa = {benefit_name: name, description: descrip, eligibility_criteria: eligibility, coverage_amount: coverage, start_date: start, end_date: end};
    if (Object.values(dataa).includes("")) {
        return false;
    }
    return dataa;
}

function insert(enteredData) {
    fetch(api, {
        method:'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(enteredData)
    })
    .then(response => {
        if (response.ok) {
            loadTableData();
        } 
        else {
            alert('Error adding benefit');
        }
    })
}

function loadTableData() {
    fetch(api)
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.error('Error fetching data:',error));
}

function renderTable(benefits) {
    var table = document.getElementById("table");
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Eligibility-Criteria</th>
            <th>Coverage-Amount</th>
            <th>Start-Date</th>
            <th>End-Date</th>
            <th>Edit/Delete</th>
        </tr>
    `;

    benefits.forEach((benefit) => {
        var row = table.insertRow();
        row.setAttribute('dataid', benefit.id);
        row.insertCell(0).innerHTML = benefit.benefit_name;
        row.insertCell(1).innerHTML = benefit.description;
        row.insertCell(2).innerHTML = benefit.eligibility_criteria;
        row.insertCell(3).innerHTML = benefit.coverage_amount;
        row.insertCell(4).innerHTML = benefit.start_date;
        row.insertCell(5).innerHTML = benefit.end_date;
        row.insertCell(6).innerHTML = `
            <button id="edit" onclick="editData(this)">Edit</button> 
            <button id="delete" onclick="deleteData(this)">Delete</button>`;
    });
}

function deleteData(td) {
    if (confirm('Are you sure you want to delete this data?')) {
        row = td.parentElement.parentElement;
        var benefitId = row.getAttribute('dataid');
        fetch(`${api}/${benefitId}`, { method:'DELETE' })
        .then(response => {
            if (response.ok) {
                loadTableData();
            } 
            else {
                alert('Error deleting benefit');
            }
        });
    }
}

function editData(td) {
    row = td.parentElement.parentElement;
    document.getElementById('name').value = row.cells[0].innerHTML;
    document.getElementById('description').value = row.cells[1].innerHTML;
    document.getElementById('eligibility_cri').value = row.cells[2].innerHTML;
    document.getElementById('coverage_amt').value = row.cells[3].innerHTML;
    document.getElementById('start_date').value = row.cells[4].innerHTML;
    document.getElementById('end_date').value = row.cells[5].innerHTML;
    opendisplayform();
}

function updateData(enteredData) {
    var benefitId = row.getAttribute('dataid');
    fetch(`${api}/${benefitId}`, {
        method: 'PUT',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(enteredData)
    })
    .then(response => {
        if (response.ok) {
            loadTableData();
        } 
        else {
            alert('Error updating benefit');
        }
    });
}

window.onload = loadTableData;
