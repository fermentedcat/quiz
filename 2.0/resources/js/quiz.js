document.addEventListener("DOMContentLoaded", function(e) {
    new Quiz();
});

class Quiz {
    constructor() {
        this.questions = new Questions();
        this.player = new Player();
        this.interface = new Interface();

        this.quiz_length;
        this.current_index = 0; // what question should be displayed next

        let form_content = this.interface.setupForm();
        this.playerInfoSubmitEvent(form_content); //// listen for submit form
    }

    //* START QUIZ called from submit form
    startQuiz(info) {
        this.quiz_length = info.quiz_length;
        this.player.updatePlayer(info.name, info.quiz_length);
        
        this.getQuestions(info.quiz_length, info.difficulty, info.category);
        
        this.interface.loadButtons("next");
        this.interfaceEvents(this.interface.fwd_btn, "fwd");
        this.interfaceEvents(this.interface.back_btn, "back");

        this.interface.setupAnswers();
    }

    //* fetch new questions
    async getQuestions(number, difficulty, category) {
        await fetch("https://quizapi.io/api/v1/questions?apiKey=C8BWSol6V6TUpmrsb7Zz17pdZoQuzcB9enTsztNA&limit=" + number + "&difficulty=" + difficulty + "&tags=" + category)
        .then(response => response.json())
        .then(data => {
            //// send data to set values to questions keys
            this.questions.updateQuestions(data);
            //// load first question
            this.nextQuestion(this.current_index); // wait until data is loaded
        });
    }

    //* load next question
    nextQuestion(index) {
        let question = this.questions.getNextQuestion(index);
        let answers = this.questions.getNextAnswers(index);
        this.interface.displayQuestion(question, index, this.quiz_length);
        this.interface.displayAnswers(answers);
        this.current_index++;

        //// eventlisteners on new answers
        this.interfaceEvents(this.interface.answers_on_display, "li"); 
    }





    interfaceEvents(element, type) {
        switch (type) {
            case "fwd":
                element.addEventListener("click", e => {
                    if (this.current_index < this.quiz_length) {
                        this.nextQuestion(this.current_index);
                    }
                });
                break;
            case "back":
                element.addEventListener("click", e => {
                    if (this.current_index > 1 ) {
                        this.current_index -= 2; // index already setup for next question
                        this.nextQuestion(this.current_index);
                    }    
                })
                break;

            default:
                console.log("No type specified");
            case "li":
                // console.log(element);
                let index = this.current_index - 1;
                for (let i = 0; i < element.length; i++) {//! save what to player.current answers?
                    if (this.player.current_answers[index].includes(i)) { 
                        element[i].className = "chosen"; //// change styling of already chosen
                    }
                    element[i].addEventListener("click", event => {
                        event.target.classList.toggle("chosen");
                        this.player.handleAnswers(index, i);
                        let is_answered = this.player.checkIsAnswered();
                    });
                }
                break;
            
        }
    }

    

    //* submit form event
    playerInfoSubmitEvent(content) {
        let form = this.interface.form;
        let name = content.name;
        let category = content.category;
        let difficulty = content.difficulty;
        let number = content.number;
        
        form.onsubmit = (e) => {
            e.preventDefault();
            //// check that name is not only spaces 
            let trimmed = name.value.trim();
            if (trimmed.length > 0) { 
                let info = {
                    name: name.value,
                    quiz_length: Number(number.value),
                    difficulty: difficulty.value,
                    category: category.value
                };

                //// store values 
                localStorage.setItem("name", name.value);
                localStorage.setItem("number", number.value);
                localStorage.setItem("difficulty", difficulty.value);
                localStorage.setItem("category", category.value);

                this.startQuiz(info); //// START QUIZ 
            } else {
                alert("Please enter your name.")
            }
        }
    }

    //* 
}