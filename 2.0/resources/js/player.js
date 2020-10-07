class Player {
    constructor() {
        this.name;
        this.score = 0; //// eller två, right/wrong
        this.current_answers; // spelarens svar sparas här 

    }
    updatePlayer(name, num_of_questions) { ////varje nytt spel
        this.name = name;
        this.current_answers = new Array(num_of_questions).fill([null]);
    }
    updateScore(point) { //// varje svar
        this.score += point;
    }
    updateAnswers(answers, index) { //// varje svar
        this.current_answers[index].push(answers);
        console.log(this.current_answers[index]);
    }

}