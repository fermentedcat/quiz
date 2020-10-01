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