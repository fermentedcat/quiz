class Quiz {
    constructor(length, difficulty, category) {
        this.length = length;
        this.difficulty = difficulty;
        this.category = category;
        this.questions;
        this.player;

        
        
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
        this.player = new Player("Maja");
    }
}