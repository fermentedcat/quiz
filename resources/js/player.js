class Player {
    constructor(name, current_num_of_questions) {
        this.name = name;
        this.score = 0; //// eller två, right/wrong
        this.score_arr = new Array(10);
        this.current_answers = new Array(current_num_of_questions).fill([null]); // spelarens svar sparas här 
        //TODO: flytta player answers hit

    }
    handleScore(is_correct, index) {
        this.score_arr[index] = is_correct;
        console.log(this.score_arr);
    }

}