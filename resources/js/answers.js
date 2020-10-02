class Answers {
    constructor(fetched_obj, parent) {
        this.answers = fetched_obj;
        this.counter = 0;
        this.option_paths = ["answer_a", "answer_b", "answer_c", "answer_d", "answer_e", "answer_f"];
        this.is_correct_paths = this.option_paths.map(function(path) {
            return path + "_correct";
        })
        this.player_choices = new Array(fetched_obj.length).fill(false); // rätt/fel svar sparas
        
        let main = document.getElementById("main_inner");
        this.answers_container = document.createElement("ul");
        this.answers_container.className = "list";
        main.appendChild(this.answers_container);
            
        
    }
    changeAnswers(direction) { 
        while (this.answers_container.firstChild) { // ta bort alla svarsalt från förra frågan
            this.answers_container.removeChild(this.answers_container.lastChild);
        }
        this.counter -= direction;

        for (let i = 0; i < 6; i++) {
            let answer = this.answers[this.counter].answers[this.option_paths[i]];
            if (answer != null) { // answers with value null should not be displayed
                let option = document.createElement("li");
                
                let is_correct = this.answers[this.counter].correct_answers[this.is_correct_paths[i]]; // this option is    true = correct || false = incorrect
                
                let regex_answer = answer.replace(/\</g,"&lt;"); 
                option.innerHTML = regex_answer;
                this.answers_container.appendChild(option);
                option.addEventListener("click", event => {
                    this.player_choices[this.counter - 1] = is_correct; 
                    // counter redan +1. sparar val till array i constructor
                })
                
            } 
        }
        this.counter++;
    }
    
}