class Questions {
    constructor() {

        this.category;                                  //* eller på Quiz
        this.difficulty;                                //*              
        this.questions = [];       //  instances of class Question
        this.correct_answers = []; //  [    [false, true, false, false], [true, false, true]    ]
        this.answers = [];         //  [    ["...", "...", null, null], ["...", "...", null]    ]

    }

    updateQuestions(fetched_obj) {
        for (let question of fetched_obj) {
            this.category = question.tags[0];        //* eller på Quiz
            this.difficulty = question.difficulty;   //*              

            //// save Question instances
            this.questions.push(new Question(question));

            let correct_arr = []; 
            //// make true/false array of object "correct answers" values 
            Object.values(question.correct_answers).forEach(answer =>  {
                if (answer == "true") {
                    correct_arr.push(true);
                } else {
                    correct_arr.push(false);
                }
            });
            this.correct_answers.push(correct_arr);

            let answer_arr = []; 
            //// make array of strings of object "answers" values
            Object.values(question.answers).forEach(answer => answer_arr.push(answer));
            this.answers.push(answer_arr);
        }
        }

    getNextQuestion(index) { 
        let question = this.questions[index].question;
        question = question.replace(/\</g,"&lt;");
        return question;
    }

    getNextAnswers(index) {
        let answers = this.answers[index];
        answers = answers.filter(answer => answer != null);
        answers = answers.map(answer => answer.replace(/\</g,"&lt;"));
        return answers;
    }

    checkCorrect(player_answers, correct_answers) { //* var ska denna metod vara?

    }

}



        