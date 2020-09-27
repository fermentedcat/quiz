class Quiz {
    constructor(length) {
        // this.length = length;
        this.questions = new Questions();
        this.rnd_questions = [] 
        this.questions.getRndQuestion(length);
    }
}