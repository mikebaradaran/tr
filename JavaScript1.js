
let data = getCourseData();
setupOptions();
showRegisteredStudents();

function showRegisteredStudents() {
    let theList = document.getElementById("registeredStudents")
    theList.innerHTML = "";
    let data = getCourseData();
    for (let stu of data) {
        let op = document.createElement("option");
        op.innerText = stu.name;
        theList.appendChild(op);
    }
}

function isRegistered(newStuName) {
    let data = getCourseData();
    for (let stu of data) {
        if (stu.name.toLowerCase() == newStuName.toLowerCase()) return true;
    }
    return false;
}

function savedClick() {
    const learnerName = getValue('learner').trim();
    if (learnerName.length == 0) {
        alert("Please enter the student's name")
        return;
    }
    if (isRegistered(learnerName)) {
        alert("Student name already registered!")
        return;
    }
    const fname = learnerName.charAt(0).toUpperCase() + learnerName.slice(1);

    let comments = getValue('comments').replace(/<name>/g, fname);

    let learner = {
        'name': learnerName,
        'comments': comments
    };
    for (const attr of radioNames) {
        learner[attr] = getValue(attr);
    }
    data.push(learner);
    setCourseData();
    restForm();
    showRegisteredStudents();
}
//-------------------------------------------------------
function restForm() {
    setValue('learner', '').focus();
    setValue('comments', '');

    document.querySelectorAll('select').forEach(item => {
        item.selectedIndex = 0;
    });
}

// set up the select option tags --------------------------
function setupOptions() {
    let options = document.getElementById("options");
    options.innerHTML = "";
    radioNames = document.getElementById("radioNames").value.split(",");
    states = document.getElementById("states").value.split(",");

    for (let i = 0; i < radioNames.length; i++) {
        let selectLabel = makeTag("span", radioNames[i] + ": ", options);
        let select = makeTag("select", "", options)
        let optionString = states.map(opt => `<option>${opt}</option>`).join('');
        select.innerHTML = optionString;
        select.id = radioNames[i];
        if ((i + 1) % 3 === 0)
            makeTag("hr", "", options);
    }
    setValue("start_date", new Date().toISOString().split('T')[0]);
}
//-------------------------------------------------------------------
function generateReports() {
    let report = `Generate an end of course detailed but short report, using the criteria below for each student.
Insert "w/c ${getValue("start_date")} - ${getValue("course_title")}" at the start of each student report:${JSON.stringify(data)}
${JSON.stringify(data)}`;

    navigator.clipboard.writeText(report)
        .then(() => alert("Copied to clipboard!"))
        .catch(err => alert("Failed to copy: " + err));
}

//-------------------------------- Utils ---------------
function getValue(optionID) {
    const op = document.getElementById(optionID);
    return op.value;
}
function setValue(optionID, txt) {
    const x = document.getElementById(optionID);
    x.value = txt;
    return x;
}
function makeTag(tagName, tagText, tagContainer, tagClass = "roundEdge") {
    let newTag = document.createElement(tagName);
    newTag.innerText = tagText;
    newTag.classList.add(tagClass);
    tagContainer.appendChild(newTag);
    return newTag;
}

function getCourseData() {
    let x = localStorage.getItem('courseData');
    if (x === null)
        return [];
    else
        return JSON.parse(x);
}

function setCourseData() {
    localStorage.setItem('courseData', JSON.stringify(data));
}

function deleteCourseData() {
    if (confirm('Delete all Course data?')) {
        localStorage.removeItem('courseData');
        data=[];
        showRegisteredStudents();
    }
}

