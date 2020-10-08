class Player {
    constructor(name, num_of_questions) {
        this.name = name;
        this.score = 0; //// eller två, right/wrong
        this.score_arr = new Array(10);
        this.current_answers = new Array(num_of_questions).fill([null]); // spelarens svar sparas här 
        //TODO: flytta player answers hit

    }
    updatePlayer(is_correct, index) {
        //TODO: kanske för att starta nytt spel?
    }

}