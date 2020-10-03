class Quiz {
    constructor(num_of_questions, difficulty, category, name) {
        this.num_of_questions = num_of_questions;
        this.difficulty = difficulty;
        this.category = category;
        this.questions;
        this.player = new Player(name, num_of_questions);
        // this.player_answers = new Array(this.num_of_questions).fill([null]); // spelarens svar sparas här
        this.is_answered = false;
        
        
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
            this.questions = new Questions(data, this); //// send random questions to Questions to start
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
                this.questions.nextQuestion(); 
            }
        })

        this.questions.nextQuestion();
    }
    
    handleScore(score, index) {
        let arr = this.player.current_answers[index]; // platsen för spelarens svar denna fråga
        
        if (arr.includes(null)) { //// if no score has been added - add score
            arr = [score];
        } else if (!arr.includes(score)) { //// does not include score - add score
            console.log("does not include score");
            arr.push(score);
        } else {
            let remove_index = arr.indexOf(score);
            console.log("splice");
            arr.splice(remove_index, 1);
        }
        
        this.player.current_answers[index] = arr;
        console.log(arr);
        console.log("index: " + index);
        console.log(this.player.current_answers);

        //TODO: funkar ej. läs på om async / timeout
        this.is_answered = true; // resets in case prev. answer get unclicked
        //check if all questions have been answered
        for (let answer of this.player.current_answers) {
                console.log("new check");
                if (answer.includes(null)) {
                this.is_answered = false;
                console.log("new check, some null");
            }
        }
        //TODO: funkar ej. läs på om async / timeout
        if (!this.is_answered && document.getElementById("main_inner").lastChild.tagName == "BUTTON") {
            console.log("should remove button");
            document.getElementById("main_inner").lastChild.remove();
        }
        console.log(this.is_answered);

        //check if all questions have been answered
        if (index == 9 && !this.is_answered) { // let player know of missing answers if on last question
            alert("There are questions unanswered still. Please go back and answer.")
        } else if (this.is_answered) {
            console.log("Finito");
            this.loadSubmitButton();
        }
    }
    loadSubmitButton() {
        /* if (document.getElementById("main_inner").lastChild.tagName == "BUTTON") {
            document.getElementById("main_inner").lastChild.remove();
        } */
        let submit = document.createElement("button");
        submit.innerHTML = "SUBMIT ANSWERS";
        submit.className = "sumbit_answers";
        document.getElementById("main_inner").appendChild(submit);
        submit.addEventListener("click", (e) => {
            this.questions.checkCorrect(this.player.current_answers, this.questions.correct_answers); 
        })

    }
}