
setupOptions();

function setupOptions() {
    // set up the select option tags
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
    const learnerName = document.getElementById('learner').value;
    const fname = learnerName.charAt(0).toUpperCase() + learnerName.slice(1);

    let comments = document.getElementById('comments').value;

    comments = comments.replace(/<name>/g, fname);
    console.log(comments);

    let learner = {
        'name': learnerName,
        'comments': comments
    };
    for (const attr of radioNames) {
        learner[attr] = getSelectValue(attr);
    }

    data.push(learner);
    restForm();
}

function generateReports() {
    let report = "Generate a report using the criteria below for each student." +
        "Insert te following at the begining of each student tutor report:\n" +
        "w/c " + document.getElementById("start_date").value + " - "  +
    document.getElementById("course_title").value + "\n";
    console.log(report + JSON.stringify(data));
}

function restForm() {
    const learnerName = document.getElementById('learner');
    learnerName.value = "";
    learnerName.focus();
    document.getElementById('comments').value = "";

    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.value = select.options[0].value;
    });
}

function getSelectValue(optionID) {
    const op = document.getElementById(optionID);
    return op.value;
}
