document.addEventListener("DOMContentLoaded", function(e) {
    new Quiz();
});

class Quiz {
    constructor() {
        this.questions = new Questions();
        this.player = new Player();
        this.interface = new Interface();

        this.current_index = 0; // what question should be displayed next

        let form_content = this.interface.setupForm();
        this.playerInfoSubmitEvent(form_content); //// listen for submit form
    }

    //* START QUIZ called from submit form
    startQuiz(info) {
        this.player.updatePlayer(info.name, info.num_of_questions);
        this.getQuestions(info.num_of_questions, info.difficulty, info.category);

        this.interface.loadButtons("next");
        this.interface.setupAnswers();
        
        // this.questions.nextQuestion();
    }

    //* fetch new questions
    async getQuestions(number, difficulty, category) {
        await fetch("https://quizapi.io/api/v1/questions?apiKey=C8BWSol6V6TUpmrsb7Zz17pdZoQuzcB9enTsztNA&limit=" + number + "&difficulty=" + difficulty + "&tags=" + category)
        .then(response => response.json())
        .then(data => {
            this.questions.updateQuestions(data); //// send random questions to Questions 
            console.log("loaded questions");
            console.log(this.questions);
            
        });
    }

    //* load next question
    nextQuestion(index) { // current index -2 if called from back_btn
        let question = this.questions.getNextQuestion(index);
        let answers = this.questions.getNextAnswers(index);
        this.interface.displayQuestion(question);
        this.interface.displayAnswers(answers);
    }





    addEventListener(element, type) {
        
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
                    num_of_questions: Number(number.value),
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
}