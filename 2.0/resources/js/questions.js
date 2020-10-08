class Questions {
    constructor() {

        this.category;                                  //* TO USE AT DISPLAY
        this.difficulty;                                //*                  
        this.questions = [];       //  instances of class Question
        this.answers = [];         //  [    ["...", "...", null, null], ["...", "...", null]    ]
        this.correct_answers = []; //  [    [false, true, false, false], [true, false, true]    ]

    }

    //* ========== UPDATE ON QUIZ START ========= *//
    updateQuestions(fetched_obj) {
        let questions = [];
        let answers = [];
        let correct_answers = [];
        
        for (let question of fetched_obj) {
            this.category = question.tags[0];        //* TO USE AT DISPLAY
            this.difficulty = question.difficulty;   //*                  

            //// save Question instances
            questions.push(new Question(question));

            let correct_arr = []; 
            //// make true/false array of object "correct answers" values 
            Object.values(question.correct_answers).forEach(answer =>  {
                if (answer == "true") {
                    correct_arr.push(true);
                } else {
                    correct_arr.push(false);
                }
            });
            correct_answers.push(correct_arr);

            let answer_arr = []; 
            //// make array of strings of object "answers" values
            Object.values(question.answers).forEach(answer => answer_arr.push(answer));
            answers.push(answer_arr);
        }
        this.questions = questions;
        this.answers = answers;
        this.correct_answers = correct_answers;
    }

    //* =========== GET NEXT QUESTION =========== *//
    getNextQuestion(index) { 
        let question = this.questions[index].question;
        question = question.replace(/\</g,"&lt;");
        return question;
    }

    //* =========== GET NEXT ANSWERS ============ *//
    getNextAnswers(index) {
        let answers = this.answers[index];
        answers = answers.filter(answer => answer != null);
        answers = answers.map(answer => answer.replace(/\</g,"&lt;"));
        return answers;
    }
}



        