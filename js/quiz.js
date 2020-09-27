class Quiz {
    constructor(length) {
        this.length = length;
        this.questions = [];
        for (let i = 0; i < 5; i++) {
            this.questions.push(new Question());
        }

        console.log(this.questions);
    }
    getNextQuestion() {
        
    }
}