var questions = [
    "Do you reuse old items?",
    "Do you have your own vegetable garden?",
    "Do you make compost?",
    "Do you sort waste?",
    "Do you spend your money wisely?",
    "Do you monitor your use electricity and water and try to reduce it?",
    "Do you donate old items to charity?",
    "Do you plan on/are you using solar panels at home?",
    "Do you use minimal and/or biodegradable packaging?",
    "Do you care about being sustainable?"
]
const question = document.getElementById('question');
const next = document.getElementById('next');
const back = document.getElementById('back');
const current = document.getElementById('question-id');
const progressBar = document.getElementById('progress-value')

var answer = null;
var score = 0;
var questionID = 0;
var dict = {};

// Changes question number
current.innerText = "Question " + (questionID + 1) + " of 10";

// Changes question
question.innerText = questions[questionID ];

document.getElementsByName("rad").forEach(radio => {
    if (radio.value == dict[questionID]) {
        radio.checked = true;
    };
});




question.innerText = questions[questionID];
function nextQuestion() {
    // gets answer
    document.getElementsByName("ans").forEach(radio => {
        if (radio.checked) {
            answer = radio.value
            radio.checked = false;
        }
    })

    // proceeds if answer is given
    if (answer != null) {
        // adds points accordingly
        switch (answer) {
            case "yes":
                score += 10;
                break;
            case "no":
                score += 0;
                break;
            case "sometimes":
                score += 5;
        }

        if (questionID < 9) {
                    // set record
        dict[questionID] = answer;

        // increases questionID
        questionID += 1;

        // Changes question number
        current.innerText = "Question " + (questionID + 1) + " of 10";

        // Changes question
        question.innerText = questions[questionID];

        progressBar.style.width = ('--progress-percent', ((questionID + 1) * 10) + "%");

        // resets answer variable
        answer = null;
        }else {
            sessionStorage.setItem("score", score);
            window.location.href = "/results";
        }
    };


};

function previousQuestion() {
    // goes back is id is greater than zero
    if (questionID > 0) {
        // decreases questionID
        questionID -= 1;

        // changes current question and question
        question.innerText = questions[questionID];
        current.innerText = "Question " + (questionID + 1) + " of 10";

        // sets radio value according to records
        document.getElementsByName("ans").forEach(radio => {
            if (radio.value == dict[questionID]) {
                radio.checked = true;
            };
        });
    };

};

next.addEventListener("click", nextQuestion);
back.addEventListener("click", previousQuestion);
