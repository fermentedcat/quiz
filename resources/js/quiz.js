class Quiz {
    constructor(num_of_questions, difficulty, category) {
        this.num_of_questions = num_of_questions;
        this.difficulty = difficulty;
        this.category = category;
        this.questions;
        this.player = new Player(this.input_name);
        this.fetched_questions;
        this.player_answers = new Array(this.num_of_questions).fill(null); // spelarens svar sparas här
        
        this.startQuiz();
    }
    giveScore(num) {
        this.player.score += num;
        console.log("New score: " + this.player.score);
    }
    async startQuiz() { 
        //// quiz api programming
        await fetch("https://quizapi.io/api/v1/questions?apiKey=C8BWSol6V6TUpmrsb7Zz17pdZoQuzcB9enTsztNA&limit=" + this.num_of_questions + "&difficulty=" + this.difficulty + "&tags=" + this.category)

        .then(response => response.json())
        .then(data => {
            this.fetched_questions = data;
            this.questions = new Questions(this.fetched_questions, this); //// send random questions to Questions to start
            // this.answers = new Answers(this.fetched_questions, this);
            this.loadButtons();
        });
        
    }
    
    loadButtons() {
//TODO: nåt sätt att göra detta snyggare ÄNDRA OM SEN
        let status_bar = document.getElementById("status_bar");
        let show_number = document.createElement("p");
        show_number.id = "show_number"
        
        let back_button = document.createElement("i");
        back_button.className = "fas fa-chevron-circle-left fa-2x";
        status_bar.appendChild(back_button);
        back_button.addEventListener("click", e => {
            if (this.questions.counter > 1 ) {
                this.questions.nextQuestion(2); // index counter -2 (är redan inställd på nästa fråga) 
            }
        })

        status_bar.appendChild(show_number);

        let button = document.createElement("i");
        button.className = "fas fa-chevron-circle-right fa-2x";
        status_bar.appendChild(button);
        button.addEventListener("click", e => {
            if (this.questions.counter < this.num_of_questions) {
                this.questions.nextQuestion(); //TODO: other parameter? true/false?
            }
        })

        this.questions.nextQuestion();
    }
    
    handleScore(score, index) {
        this.player_answers[index] = score;
        console.log(this.player_answers);
        
        //check if all questions have been answered
        if (index == 9 && this.player_answers.includes(null)) {
            alert("There are questions unanswered still. Please go back and answer.")
        } else if (!this.player_answers.includes(null)) {
            console.log("Finito");
        } else {
            setTimeout(() => {
                this.questions.nextQuestion();
            }, 150);
        }
    }
    checkCorrectAnswers() {

    }
}