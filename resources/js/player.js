class Player {
    constructor(name) {
        this.name = name;
        this.score; //// eller två, right/wrong
        this.score_arr = new Array(10);
    }
    handleScore(is_correct, index) {
        this.score_arr[index] = is_correct;
        console.log(this.score_arr);
    }

}