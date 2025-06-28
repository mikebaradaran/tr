
setupOptions();

// set up the select option tags
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
}

let data = [];
function savedClick() {
    const learnerName = getValue('learner');
    const fname = learnerName.charAt(0).toUpperCase() + learnerName.slice(1);

    let comments = getValue('comments');

    comments = comments.replace(/<name>/g, fname);

    let learner = {
        'name': learnerName,
        'comments': comments
    };
    for (const attr of radioNames) {
        learner[attr] = getValue(attr);
    }
    data.push(learner);
    restForm();
}

function generateReports() {
    let report = "Generate a report using the criteria below for each student." +
        "Insert te following at the begining of each student tutor report:\n" +
        "w/c " + getValue("start_date") + " - "  +
        getValue("course_title") + "\n";
    console.log(report + JSON.stringify(data));
}

function restForm() {
    setValue('learner', '').focus();
    setValue('comments', '');

    document.querySelectorAll('select').forEach(item => {
        item.selectedIndex = 0;
    });
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

