
let data = getCourseData();
setupOptions();

function savedClick() {
    const learnerName = getValue('learner');
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
    for (let i = 0; i < radioNames.length; i++) {
        makeTag("span", radioNames[i], options, "feedback-area");
        makeTag("select", "", options, "nullClass").id = radioNames[i];
        if ((i + 1) % 3 === 0) {
            makeTag("hr", "", options, "nullClass");
        }
    }
    const selects = document.getElementsByTagName("select");
    for (const select of selects) {
        for (const state of states) {
            makeTag("option", state, select, "nullClass");
        }
    }

    setValue("start_date", new Date().toISOString().split('T')[0]);
}
//-------------------------------------------------------------------
function generateReports() {
    let report = `Generate a report using the criteria below for each student.
Insert the following at the begining of each student tutor report:
w/c ${getValue("start_date")} - ${getValue("course_title")} 
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
function makeTag(tagName, tagText, tagContainer, tagClass) {
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
    localStorage.removeItem('courseData');
    alert('Course data deleted.');
}

