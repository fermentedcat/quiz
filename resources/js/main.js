document.addEventListener("DOMContentLoaded", function(e) {
    let main = document.getElementsByTagName("main")[0];
    
    
    


class Player {
    constructor() {
        this.name;
        this.score; //// eller två, right/wrong
    }


}

class Start {   //// steg 1 på sidan / håller i spelarens val
    constructor() {
        this.num_questions = 10;
        this.category = "programming";
        this.player = new Player()
    }
    newQuiz() {

    }
}

class Quiz {
    constructor(length, difficulty) {
        this.length = length;
        this.difficulty = difficulty;
        this.questions;

        
        
    }
    startQuiz() { 
        //// quiz api programming
        fetch("https://quizapi.io/api/v1/questions?apiKey=C8BWSol6V6TUpmrsb7Zz17pdZoQuzcB9enTsztNA&limit=" + this.length + "&difficulty=" + this.difficulty)
        .then(response => response.json())
        .then(data => {
            let questions = new Questions(data); //// send random questions to Questions to start
            let answers = new Answers(data);

            //TODO: nåt sätt att göra detta snyggare med sync/wait?
            let answers_container = document.getElementById("answers_container");
            let button = document.createElement("button");
            button.innerHTML = "NEXT QUESTION";
            answers_container.appendChild(button);
            button.addEventListener("click", function(e) {

            questions.changeQuestion();
            answers.changeAnswers();
            })
        });
    }
    handleScore(score) {
        alert(score);
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
    

    changeQuestion() {
        console.log("change question!");
        this.currentQuestion.innerHTML = this.questions[this.counter].question;
        this.counter++;
    }

}

class Answers {
    constructor(fetched_obj) {
        this.answers = fetched_obj;
        this.counter = 0;
        this.path_array = ["answer_a", "answer_b", "answer_c", "answer_d", "answer_e", "answer_f"];
        this.is_correct_path_arr = this.path_array.map(function(path) {
            return path + "_correct";
        })
        this.options = [];

        this.answers_container = document.getElementById("list");
        for (let i = 0; i < 6; i++) {
            let option = document.createElement("li");
            this.options.push(option);
        }
        
    }
    changeAnswers() {
        console.log("change answers!");
        console.log(this.answers);
        for (let i = 0; i < 6; i++) {
            let answer = this.answers[this.counter].answers[this.path_array[i]];
            console.log(typeof answer);
            if (answer != null) {
                answer = answer.replace(/\</g,"&lt;");

                console.log("Answer:" + answer);
                this.options[i].innerHTML = answer;
                this.answers_container.appendChild(this.options[i]);
                this.options[i].style.display = "";
                this.options[i].addEventListener("click", function(e) {
                    // quiz.handleScore(this.answers[this.counter].correct_answers[i]);
                    console.log(this.answers[this.counter].correct_answers[this.is_correct_path_arr[i]]);
                })
            } else {
                this.options[i].style.display = "none";
            }
        }
        this.counter++;
    }
}

let quiz = new Quiz(10, "Easy");
    quiz.startQuiz();

})

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