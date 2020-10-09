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
        if (this.name != name) {    
            this.name = name;   
            this.percent = 0;
            this.times_played = 1; //// if new player
        } else {
            this.times_played++;
        }
        this.score = 0;   
        this.current_answers = new Array(num_of_questions).fill([null]);
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
        this.percent_average = (this.percent_average + percent) /  this.times_played;
    }
}