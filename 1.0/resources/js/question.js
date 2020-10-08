class Question {
    constructor(question) {
        this.question = question.question;
        this.answers = question.answers;
        this.correct_answers = question.correct_answers; 
        this.category = question.tags[0];
        this.difficulty = question.difficulty;
    }
}