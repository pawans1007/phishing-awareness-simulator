/* =========================================
   PhishGuard
   Phishing Awareness Simulator
========================================= */


/* =========================================
   Quiz Questions
========================================= */

const questions = [

    {
        question:
            "You receive an email saying: \"Your account will be permanently suspended today. Click here immediately to verify your account.\" What should you do?",

        options: [
            "Click the link immediately",
            "Reply with your password",
            "Verify the message through the organization's official website",
            "Forward the email to friends"
        ],

        answer: 2,

        explanation:
            "Urgent language and unexpected links are common phishing warning signs. Verify the request using an official website or a known contact method."
    },


    {
        question:
            "Which of these is a common warning sign of a phishing message?",

        options: [
            "Unexpected request for sensitive information",
            "A message you were expecting",
            "A normal calendar reminder",
            "A saved contact's phone number"
        ],

        answer: 0,

        explanation:
            "Unexpected requests for passwords, financial information, or other sensitive data can indicate phishing."
    },


    {
        question:
            "Before clicking a suspicious link, what should you check?",

        options: [
            "The screen brightness",
            "The actual destination of the link",
            "Your computer wallpaper",
            "The message font size"
        ],

        answer: 1,

        explanation:
            "Checking the actual destination can help you identify misleading or suspicious URLs."
    },


    {
        question:
            "An unknown sender asks you to open an attachment urgently. What is the safest action?",

        options: [
            "Open it immediately",
            "Download it and run it",
            "Verify the sender and request before opening it",
            "Send it to another person"
        ],

        answer: 2,

        explanation:
            "Unexpected attachments can be dangerous. Verify the sender and the request before opening anything."
    },


    {
        question:
            "What should you do if you believe a message is phishing?",

        options: [
            "Share it publicly",
            "Report it through the appropriate security or reporting channel",
            "Reply to the attacker",
            "Click every link to investigate"
        ],

        answer: 1,

        explanation:
            "Reporting suspected phishing helps security teams investigate and protect other users."
    }

];


let currentQuestion = 0;
let score = 0;

let emailInspected = false;


/* =========================================
   Start Simulator
========================================= */

function startSimulator() {

    document
        .getElementById("quiz")
        .scrollIntoView({
            behavior: "smooth"
        });

    currentQuestion = 0;
    score = 0;

    updateDashboard();

    showQuestion();
}


/* =========================================
   Show Quiz Question
========================================= */

function showQuestion() {

    const questionElement =
        document.getElementById("question");

    const optionsElement =
        document.getElementById("options");

    const resultElement =
        document.getElementById("result");


    resultElement.textContent = "";


    if (currentQuestion >= questions.length) {

        showFinalResult();

        return;
    }


    const question =
        questions[currentQuestion];


    questionElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}: ${question.question}`;


    optionsElement.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");


            button.className =
                "option";


            button.textContent =
                option;


            button.onclick =
                function () {

                    checkAnswer(index);

                };


            optionsElement.appendChild(button);

        }
    );
}


/* =========================================
   Check Quiz Answer
========================================= */

function checkAnswer(selectedAnswer) {

    const question =
        questions[currentQuestion];


    const resultElement =
        document.getElementById("result");


    const buttons =
        document.querySelectorAll(".option");


    buttons.forEach(
        button => {

            button.disabled = true;

        }
    );


    if (selectedAnswer === question.answer) {

        score++;


        resultElement.textContent =
            "✅ Correct! " +
            question.explanation;


        resultElement.style.color =
            "#15803d";

    }

    else {

        resultElement.textContent =
            "❌ Not quite. " +
            question.explanation;


        resultElement.style.color =
            "#b91c1c";
    }


    updateDashboard();


    setTimeout(
        () => {

            currentQuestion++;

            showQuestion();

        },

        2500
    );
}


/* =========================================
   Final Quiz Result
========================================= */

function showFinalResult() {

    const questionElement =
        document.getElementById("question");


    const optionsElement =
        document.getElementById("options");


    const resultElement =
        document.getElementById("result");


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    questionElement.textContent =
        "🎉 Simulation Complete!";


    optionsElement.innerHTML = "";


    resultElement.style.color =
        "#172554";


    resultElement.innerHTML = `

        <strong>
            Your Score:
            ${score}/${questions.length}
            (${percentage}%)
        </strong>

        <br><br>

        ${getMessage(percentage)}

        <br><br>

        <button onclick="startSimulator()">
            Take Quiz Again
        </button>

    `;


    updateDashboard();
}


/* =========================================
   Quiz Result Message
========================================= */

function getMessage(percentage) {

    if (percentage === 100) {

        return `
            Excellent! You identified all the
            phishing scenarios correctly. 🛡️
        `;

    }


    if (percentage >= 60) {

        return `
            Good job! You identified most of
            the phishing warning signs.
            Keep learning. 🔐
        `;

    }


    return `
        Keep practicing! Review the warning
        signs and try the simulation again. 🎯
    `;
}


/* =========================================
   Red Flag Detector
========================================= */

function analyzeRedFlags() {

    const checkboxes =
        document.querySelectorAll(
            '.flag-option input[type="checkbox"]'
        );


    const selectedFlags = [];


    checkboxes.forEach(
        checkbox => {

            if (checkbox.checked) {

                selectedFlags.push(
                    checkbox.value
                );

            }

        }
    );


    const analysis =
        document.getElementById("email-analysis");


    /* -------------------------
       No Selection
    ------------------------- */

    if (selectedFlags.length === 0) {

        analysis.innerHTML = `

            <div class="analysis-box">

                <h3>
                    ⚠️ Select at least one warning sign
                </h3>

                <p>
                    Look carefully at the sender,
                    message wording, and link before
                    submitting your analysis.
                </p>

            </div>

        `;

        return;
    }


    /* -------------------------
       Correct Warning Signs
    ------------------------- */

    const correctFlags = [
        "urgency",
        "sender",
        "verification",
        "link"
    ];


    const foundCorrect =
        selectedFlags.filter(
            flag =>
                correctFlags.includes(flag)
        );


    const selectedNormal =
        selectedFlags.includes("normal");


    let points = 0;


    foundCorrect.forEach(
        () => {

            points++;

        }
    );


    if (selectedNormal) {

        points = 0;

    }


    const percentage =
        Math.round(
            (points / correctFlags.length) * 100
        );


    /* -------------------------
       Update Progress
    ------------------------- */

    emailInspected = true;

    updateDashboard();


    /* -------------------------
       Result Message
    ------------------------- */

    let message = "";


    if (
        percentage === 100 &&
        !selectedNormal
    ) {

        message = `
            <span class="safe">
                🎉 Excellent! You identified all
                the major phishing warning signs.
            </span>
        `;

    }

    else if (percentage >= 50) {

        message = `
            <span class="warning">
                👍 Good observation!
            </span>

            You identified some important warning
            signs, but there are additional clues
            you should look for.
        `;

    }

    else {

        message = `
            <span class="warning">
                ⚠️ Keep practicing.
            </span>

            Review the sender, urgency, verification
            request, and link carefully.
        `;

    }


    /* -------------------------
       Display Analysis
    ------------------------- */

    analysis.innerHTML = `

        <div class="analysis-box">

            <h3>
                🔍 Your Phishing Analysis
            </h3>

            <p>
                Detection Score:
                <strong>
                    ${percentage}%
                </strong>
            </p>

            <br>

            ${message}

            <br><br>

            <h3>
                Correct Warning Signs
            </h3>

            <ul>

                <li>
                    🚨 Urgent account suspension threat
                </li>

                <li>
                    👤 Suspicious sender address
                </li>

                <li>
                    🔐 Unexpected verification request
                </li>

                <li>
                    🔗 Suspicious link
                </li>

            </ul>

            <br>

            <p>
                <strong>
                    Recommended action:
                </strong>

                Do not click the suspicious link.
                Verify the request using the
                organization's official website
                or another trusted contact method.
            </p>

        </div>

    `;


    analysis.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });
}


/* =========================================
   Update Dashboard
========================================= */

function updateDashboard() {

    const scoreElement =
        document.getElementById(
            "dashboard-score"
        );

    const analysisElement =
        document.getElementById(
            "dashboard-analysis"
        );

    const levelElement =
        document.getElementById(
            "dashboard-level"
        );

    const progressElement =
        document.getElementById(
            "progress-percent"
        );

    const progressFill =
        document.getElementById(
            "progress-fill"
        );


    if (!scoreElement) {

        return;

    }


    /* -------------------------
       Quiz Score
    ------------------------- */

    const quizPercentage =
        Math.round(
            (score / questions.length) * 100
        );


    scoreElement.textContent =
        `${quizPercentage}%`;


    /* -------------------------
       Email Analysis
    ------------------------- */

    if (emailInspected) {

        analysisElement.textContent =
            "Completed";

    }

    else {

        analysisElement.textContent =
            "Not Started";

    }


    /* -------------------------
       Awareness Level
    ------------------------- */

    let level =
        "Beginner";


    if (quizPercentage >= 80) {

        level =
            "Advanced";

    }

    else if (quizPercentage >= 60) {

        level =
            "Intermediate";

    }


    levelElement.textContent =
        level;


    /* -------------------------
       Overall Progress
    ------------------------- */

    let progress = 0;


    if (emailInspected) {

        progress += 50;

    }


    if (currentQuestion >= questions.length) {

        progress += 50;

    }


    progressElement.textContent =
        `${progress}%`;


    progressFill.style.width =
        `${progress}%`;
}


/* =========================================
   Initial Dashboard
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateDashboard();

    }
);