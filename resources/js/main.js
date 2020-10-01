document.addEventListener("DOMContentLoaded", function(e) {
    let main = document.getElementsByTagName("main")[0];
    
    
    


   /*  class Player {
        constructor() {
            this.name;
            this.score; //// eller två, right/wrong
            this.score_arr = new Array(10);
        }
        handleScore(is_correct, index) {
            this.score_arr[index] = is_correct;
            console.log(this.score_arr);
        }

    } */

    /* class Start {   //// steg 1 på sidan / håller i spelarens val
        constructor() {
            this.num_questions = 10;
            this.category = "programming";
            this.player = new Player()
        }
        newQuiz() {

        }
    } */

    class Quiz {
        constructor(length, difficulty, category) {
            this.length = length;
            this.difficulty = difficulty;
            this.category = category;
            this.questions;

            
            
        }
        startQuiz() { 
            //// quiz api programming
            fetch("https://quizapi.io/api/v1/questions?apiKey=C8BWSol6V6TUpmrsb7Zz17pdZoQuzcB9enTsztNA&limit=" + this.length + "&difficulty=" + this.difficulty + "&tags=" + this.category)
            .then(response => response.json())
            .then(data => {
                let questions = new Questions(data); //// send random questions to Questions to start
                let answers = new Answers(data);

                //TODO: nåt sätt att göra detta snyggare med sync/wait?
                let status_bar = document.getElementById("status_bar");
                
                let back_button = document.createElement("i");
                back_button.className = "fas fa-chevron-circle-left fa-2x";
                status_bar.appendChild(back_button);
                back_button.addEventListener("click", function(e) {
                    if (questions.counter > 1 ) {
                        questions.changeQuestion("back");
                        answers.changeAnswers("back");
                    }
                })
                let show_number = document.createElement("p");
                show_number.id = "show_number"
                show_number.innerHTML = questions.counter + " / " + this.length;
                status_bar.appendChild(show_number);

                let button = document.createElement("i");
                button.className = "fas fa-chevron-circle-right fa-2x";
                status_bar.appendChild(button);
                button.addEventListener("click", event => {
                    if (questions.counter < this.length) {
                        questions.changeQuestion("fwd");
                        answers.changeAnswers("fwd");
                    }

                })
            });
        }
    }

    class Questions {
        constructor(fetched_obj) {
            this.questions = fetched_obj;
            for (let question of this.questions) {
                console.log(question);
            }
            this.counter = 0; //// keeps track of which question to show

            let q_container = document.getElementById("question_container");
            this.currentQuestion = document.createElement("h1");
            q_container.appendChild(this.currentQuestion);
        }
        

        changeQuestion(step) {
            if (step == "back") {
                this.counter -= 2;
            }
            let question = this.questions[this.counter].question;
            question = question.replace(/\</g,"&lt;");
            this.currentQuestion.innerHTML = question;
            this.counter++;
            document.getElementById("show_number").innerHTML = this.counter + " / " + this.questions.length;
        }

    }

    class Answers {
        constructor(fetched_obj) {
            this.answers = fetched_obj;
            this.counter = 0;
            this.option_paths = ["answer_a", "answer_b", "answer_c", "answer_d", "answer_e", "answer_f"];
            this.is_correct_paths = this.option_paths.map(function(path) {
                return path + "_correct";
            })
            this.player_choices = new Array(fetched_obj.length).fill(false); // rätt/fel svar sparas
            
            this.answers_container = document.getElementById("list");
                
            
        }
        changeAnswers(step) { 
            while (this.answers_container.firstChild) { // ta bort alla svarsalt från förra frågan
                this.answers_container.removeChild(this.answers_container.lastChild);
            }
            if (step == "back") {
                this.counter -= 2;
            }
            for (let i = 0; i < 6; i++) {
                let answer = this.answers[this.counter].answers[this.option_paths[i]];
                if (answer != null) { // answers with value null should not be displayed
                    let option = document.createElement("li");
                    
                    let is_correct = this.answers[this.counter].correct_answers[this.is_correct_paths[i]]; // this option is    true = correct || false = incorrect
                    
                    let regex_answer = answer.replace(/\</g,"&lt;"); 
                    option.innerHTML = regex_answer;
                    this.answers_container.appendChild(option);
                    option.addEventListener("click", event => {
                        this.player_choices[this.counter - 1] = is_correct; 
                        // counter redan +1. sparar val till array i constructor
                    })
                    
                } 
            }
            this.counter++;
        }
        checkAnswer() {
            
        }
        
    }
    let quiz = new Quiz(10, "Easy", "JavaScript");
    quiz.startQuiz();
    /* let player = new Player(); */


    /* class Question {
        constructor() {
            this.question = question;
            this.correct_answer = correct_answer;
            this.alt_1 = alt_1;
            this.alt_2 = alt_2;
            this.alt_3 = alt_3;
            
        }
        
    } */
    /* let questions = new Questions();
    questions.changeQuestion("hello"); */
});