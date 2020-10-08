class Player {
    constructor() {
        this.name;
        this.score = 0; // eller två, right/wrong     //! ! not using
        this.current_answers; // indexes of chosen answers

    }
    updatePlayer(name, num_of_questions) { ////varje nytt spel
        this.name = name;
        this.current_answers = new Array(num_of_questions).fill([null]);
    }

    //* save answers on click event (class Quiz)
    handleAnswers(index, option) { // option = index of answer option
        let chosen = this.current_answers[index];
        
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

    //* notify if all questions have been answered
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
    


    //! not using yet
    updateScore(point) { //// varje svar
        this.score += point;
    }
    updateAnswers(answers, index) { //// varje svar
        this.current_answers[index].push(answers);
    }
}