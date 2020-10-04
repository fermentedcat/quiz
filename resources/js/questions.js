class Questions {
    constructor(fetched_obj, parent) {
        this.questions = [];    // array of new question instances
        this.correct_answers = []; //  [    [false, true, false, false], [true, false, true]    ]
        this.answers = [];         //  [    ["...", "...", null, null], ["...", "...", null]    ]
        
        for (let question of fetched_obj) {
            this.questions.push(new Question(question));

            let correct_arr = []; // gör array av objekt values
            Object.values(question.correct_answers).forEach(answer => correct_arr.push(answer));
            this.correct_answers.push(correct_arr);

            let answer_arr = []; // gör array av objekt values
            Object.values(question.answers).forEach(answer => answer_arr.push(answer));
            this.answers.push(answer_arr);
        }


        this.counter = 0; //// keeps track of which question to show
        this.parent = parent; // instance of class Quiz  //* behövs deklaration?
        this.answer_paths = ["answer_a", "answer_b", "answer_c", "answer_d", "answer_e", "answer_f"];
        this.is_correct_paths = this.answer_paths.map(function(path) {
            return path + "_correct";
        })
        this.player_choices = new Array(fetched_obj.length).fill(false); // rätt/fel svar sparas
        
        this.is_chosen = new Array(fetched_obj.length); // vilka val som gjorts
        
        
        let q_container = document.getElementById("question_container");
        this.currentQuestion = document.createElement("h1");
        q_container.appendChild(this.currentQuestion);
        
        let main = document.getElementById("main_inner");
        this.answers_container = document.createElement("ul");
        this.answers_container.className = "list";
        main.appendChild(this.answers_container);
    }
    checkCorrect(player_answers, correct) {
        console.log(player_answers); // ex: [    [1,    0],                [0]          ]
        console.log(correct);       // ex: [    [true, true, false],    [true, false]   ]
        let is_correct_answers = []; // send in booleans
        let correct_answers = []
        let incorrect_answers = [];

        for (let i = 0; i < player_answers.length; i++) { // checking each question section
            // let corrects_section = correct[i];  // [true, true, false]
            let corrects_section = ["true", "true", "false", "false"]
            let correct_filtered = corrects_section.filter(value => value == "true");// [true, true]
            let correct_index = corrects_section.indexOf("true"); // 0
            let section_answers = player_answers[i];
            let section_options = this.answers[i];
            let is_correct = true;
            let correct_arr = [];
            let incorrect_arr = [];

            if (correct_filtered.length <= 1) { // if one correct answer
                for (let answer_index of player_answers[i]) { // svarets orginalindex matchas mot correct
                    // console.log(answer_index);
                    // console.log(correct_index);
                    if (answer_index == correct_index) {
                        console.log("correct!");    // rätt svar sparas
                        correct_arr.push(section_options[answer_index]);
                    } else {
                        console.log("incorrect!");
                        is_correct = false;         // fel svar sparas
                        incorrect_arr.push(section_options[answer_index]);
                    }
                }
            } else if (correct_filtered.length > 1) { // if more than one correct answer
                for (let j = 0; j < corrects_section.length; j++) {
                    if (corrects_section[j] == "true") {
                        if (!section_answers.includes(j)) { // ex: om man valt bland annat index 0
                            is_correct = false;
                        } else {                // rätt/fel svar sparas
                            correct_arr.push(section_options[j]);
                        }
                        if (section_answers.length > correct_filtered.length) {
                            is_correct = false; // om inte alla rätt svar valda = totalt fel svar.
                        }
                    } 
                }
                for (let answer of player_answers[i]) {
                    incorrect_arr.push(section_options[answer]);
                }
                
            } 
            correct_answers.push(correct_arr);
            is_correct_answers.push(is_correct);
            incorrect_answers.push(incorrect_arr);

        }
        return {
            correct_answers,
            incorrect_answers,
            is_correct_answers
        };


    }
    removeQuestions() {
        while (this.answers_container.firstChild) { // ta bort alla svarsalt från förra frågan
            this.answers_container.removeChild(this.answers_container.lastChild);
        }
    }
    nextQuestion(direction = 0) {
        this.counter -= direction;
        this.removeQuestions();
        
        let question = this.questions[this.counter].question;
        question = question.replace(/\</g,"&lt;");
        this.currentQuestion.innerHTML = question;
        
        for (let i = 0; i < 6; i++) {
            let answers = this.answers[this.counter];
            let answer = answers[i];
            if (answer != null) { // answers with value null should not be displayed
                let answer_button = document.createElement("li");
                //let is_correct = this.questions[this.counter].correct_answers[this.is_correct_paths[i]]; // this answer_button is    true = correct || false = incorrect

                if (this.parent.player.current_answers[this.counter].includes(i)) {
                    answer_button.className = "chosen"; //// change styling of already chosen
                }
                
                let regex_answer = answer.replace(/\</g,"&lt;"); 
                answer_button.innerHTML = regex_answer;
                this.answers_container.appendChild(answer_button);
                answer_button.addEventListener("click", event => {
                    if (event.target.className == "chosen") {
                        event.target.className = "";
                    } else {
                        event.target.className = "chosen";
                    }
                    
                    
                    // this.player_choices[this.counter] = is_correct; 
                    // counter redan +1. sparar val till array i constructor
                    // console.log(is_correct);
                    
                    // console.log("sending counter/answer: " + (this.counter - 1) + answer);
                    this.parent.handleScore(i, (this.counter - 1));
                    // sparar val till array i Quiz. index counter redan +1. 
                })
                
            } 
        }
        this.counter++;
        document.getElementById("show_number").innerHTML = this.counter + " / " + this.questions.length;  //visar vilken fråga man är på
    }
    
}