class Player {
    constructor() {
        this.name;
        this.score = 0; 
        this.all_time_score = 0;
        this.percent_average = 0;
        this.times_played = 0;
        this.current_answers; // indexes of chosen answers
    }

    //* update player every round
    updatePlayer(name, num_of_questions) { ////varje nytt spel
        let parsed = this.retrievePlayer(name);
        if (parsed != false) {
            this.name = name;
            this.percent_average = parsed.percent_average;
            this.all_time_score = parsed.all_time_score;
            this.times_played = (parsed.times_played + 1);
        } else {    
            this.name = name;   
            this.percent_average = 0;
            this.times_played = 1; //// if new player
        }
        this.score = 0;   
        this.current_answers = new Array(num_of_questions).fill([null]);
    }
    //* add/update player to locaö storage
    storePlayer() {
        let info = {
            all_time_score: this.all_time_score,
            percent_average: this.percent_average,
            times_played: this.times_played
        };

        let info_string = JSON.stringify(info);
        localStorage.setItem(this.name, info_string);
    }
    //* retrieve player from local storage
    retrievePlayer(name) {
        if (localStorage.getItem(name) == null) {
            return false;
        } else {
            return JSON.parse(localStorage.getItem(name));
        }        
    }


    //* save answers on click event (class Quiz)
    handleAnswers(index, option) { // option = index of answer option
        let chosen = this.current_answers[index]; // array of answers currently chosen
        
        //// if nothing has been added - add chosen
        if (chosen.includes(null)) { 
            chosen = [option];

        //// does not include option - add to chosen
        } else if (!chosen.includes(option)) { 
            chosen.push(option);
        } else {
        //// DOES include option - remove from chosen
            let remove_index = chosen.indexOf(option);
            chosen.splice(remove_index, 1);
        }
        //// update current answers
        this.current_answers[index] = chosen;
    }

    //* check if all questions have been answered
    checkIsAnswered() {
        let is_answered = true;
        ////check inner array if empty or includes null = not answered
        for (let answer of this.current_answers) {
            if (answer.includes(null) || answer.length < 1) {
                is_answered = false;
            }
        }
        return is_answered; 
    }
    


    //* UPDATE SCORE
    updateScore(point) { //// varje svar
        this.score = point;
        this.updateAllTimeScore();
    }

    updateAllTimeScore() {
        this.all_time_score = Math.max(this.all_time_score, this.score);
    }

    //* UPDATE AVERAGE PERCENT
    updatePercent(percent) { //// varje svar
        let num = (this.percent_average + percent) /  this.times_played;
        this.percent_average = Math.round(num * 10) / 10;
        this.storePlayer();
    }
}