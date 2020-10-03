class Questions {
    constructor(fetched_obj, parent) {
        this.questions = [];    // array of new question instances
        this.correct_answers = [];
        for (let question of fetched_obj) {
            this.questions.push(new Question(question));
            this.correct_answers.push(question.correct_answers)
        }
        console.log(this.questions);
        console.log(this.correct_answers);

        this.counter = 0; //// keeps track of which question to show
        this.parent = parent; // instance of class Quiz  //* behövs deklaration?
        this.answer_paths = ["answer_a", "answer_b", "answer_c", "answer_d", "answer_e", "answer_f"];
        this.is_correct_paths = this.answer_paths.map(function(path) {
            return path + "_correct";
        })
        this.player_choices = new Array(fetched_obj.length).fill(false); // rätt/fel svar sparas
        
        this.is_chosen = new Array(fetched_obj.length); //// kommer innehålla vilka knappval som gjorts
        
        
        let q_container = document.getElementById("question_container");
        this.currentQuestion = document.createElement("h1");
        q_container.appendChild(this.currentQuestion);
        
        let main = document.getElementById("main_inner");
        this.answers_container = document.createElement("ul");
        this.answers_container.className = "list";
        main.appendChild(this.answers_container);
    }
    checkCorrect(player_current_answers, correct) {

    }
    nextQuestion(direction = 0) {
        this.counter -= direction;
        while (this.answers_container.firstChild) { // ta bort alla svarsalt från förra frågan
            this.answers_container.removeChild(this.answers_container.lastChild);
        }        

        // console.log("First counter: " + this.counter);
        
        
        let question = this.questions[this.counter].question;
        question = question.replace(/\</g,"&lt;");
        this.currentQuestion.innerHTML = question;
        
        for (let i = 0; i < 6; i++) {
            let answer = this.questions[this.counter].answers[this.answer_paths[i]];
            if (answer != null) { // answers with value null should not be displayed
                let answer_button = document.createElement("li");
                let is_correct = this.questions[this.counter].correct_answers[this.is_correct_paths[i]]; // this answer_button is    true = correct || false = incorrect

                if (this.parent.player.current_answers[this.counter].includes(answer)) {
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
                    this.parent.handleScore(answer, (this.counter - 1));
                    // sparar val till array i Quiz. index counter redan +1. 
                })
                
            } 
        }
        this.counter++;
        document.getElementById("show_number").innerHTML = this.counter + " / " + this.questions.length;  //visar vilken fråga man är på
    }
    
}