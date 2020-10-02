class Quiz {
    constructor(length, difficulty, category) {
        this.length = length;
        this.difficulty = difficulty;
        this.category = category;
        this.questions;
        this.player;
        this.save_questions;
        
        this.startQuiz();
    }
    async startQuiz() { 
        //// quiz api programming
        await fetch("https://quizapi.io/api/v1/questions?apiKey=C8BWSol6V6TUpmrsb7Zz17pdZoQuzcB9enTsztNA&limit=" + this.length + "&difficulty=" + this.difficulty + "&tags=" + this.category)

        .then(response => response.json())
        .then(data => {
            this.save_questions = data;
        });
        this.questions = new Questions(this.save_questions); //// send random questions to Questions to start
        this.answers = new Answers(this.save_questions, this);
        this.loadButtons();
        
    }
    
    loadButtons() {
//TODO: nåt sätt att göra detta snyggare ÄNDRA OM SEN
        let status_bar = document.getElementById("status_bar");
        
        let back_button = document.createElement("i");
        back_button.className = "fas fa-chevron-circle-left fa-2x";
        status_bar.appendChild(back_button);
        back_button.addEventListener("click", e => {
            if (this.questions.counter > 1 ) {
                this.changeQuestion(2); // index counter -2 (är redan inställd på nästa fråga) 
            }
        })

        let show_number = document.createElement("p");
        show_number.id = "show_number"
        status_bar.appendChild(show_number);

        let button = document.createElement("i");
        button.className = "fas fa-chevron-circle-right fa-2x";
        status_bar.appendChild(button);
        button.addEventListener("click", e => {
            if (this.questions.counter < this.length) {
                this.changeQuestion(); //TODO: other parameter? true/false?
            }
        })

        this.changeQuestion();
    }
    changeQuestion(direction = 0) {
        this.questions.changeQuestion(direction);
        this.answers.changeAnswers(direction);
    }
    handleScore(scores) {

    }
}