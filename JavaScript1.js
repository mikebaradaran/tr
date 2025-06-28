
setupOptions();

function makeTag(tagName, tagText, tagContainer, tagClass) {
    let newTag = document.createElement(tagName);
    newTag.innerText = tagText;
    newTag.classList.add(tagClass);
    tagContainer.appendChild(newTag);
}

// set up the select option tags
function setupOptions() {
    let options = document.getElementById("options");
    for (let i = 0; i < radioNames.length; i++) {
        let span = document.createElement("span");
        span.innerText = radioNames[i];
        span.classList.add("feedback-area");
        options.appendChild(span);
        let selectTag = document.createElement("select");
        selectTag.id = radioNames[i];
        options.appendChild(selectTag);
        if ((i+1) % 3 === 0) {
            options.appendChild(document.createElement('hr'));
        }
    }

    const selects = document.getElementsByTagName("select");
    for (const select of selects) {
        for (const state of states) {
            const option = document.createElement("option");
            option.innerText = state;
            select.appendChild(option);
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

    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.value = select.options[0].value;
    });
}

function getValue(optionID) {
    const op = document.getElementById(optionID);
    return op.value;
}
function setValue(optionID, txt) {
    const x = document.getElementById(optionID);
    x.value = txt;
    return x;
}
