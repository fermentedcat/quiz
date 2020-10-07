class Quiz {
    constructor(num_of_questions, difficulty, category, name, parent) {
        this.num_of_questions = num_of_questions;
        this.difficulty = difficulty;
        this.category = category;
        this.questions;
        this.player = new Player(name, num_of_questions);
        // this.player_answers = new Array(this.num_of_questions).fill([null]); // spelarens svar sparas här
        this.is_answered = false;
        this.parent = parent;
        this.main_inner = document.getElementById("main_inner");
        this.header = document.getElementsByTagName("H1")[0];
        this.footer = document.querySelector("FOOTER");

        // console.log(this.header);
        
        
        this.startQuiz();
    }
    giveScore(num) {
        this.player.score += num;
        console.log("New score: " + this.player.score);
    }
    async startQuiz() { 
        await fetch("https://quizapi.io/api/v1/questions?apiKey=C8BWSol6V6TUpmrsb7Zz17pdZoQuzcB9enTsztNA&limit=" + this.num_of_questions + "&difficulty=" + this.difficulty + "&tags=" + this.category)

        .then(response => response.json())
        .then(data => {
            this.questions = new Questions(data, this); //// send random questions to Questions to start
            // this.answers = new Answers(this.fetched_questions, this);
            this.loadButtons("next");
            this.footer.style.display = "";
            this.questions.nextQuestion();
        });
        
    }

    loadButtons(type) {
        switch (type) {
            case "next":
                let status_bar = document.getElementById("status_bar");
                
                //// go to previous question
                let back_button = document.createElement("i");
                back_button.className = "fas fa-chevron-circle-left fa-3x";
                status_bar.appendChild(back_button);
                back_button.addEventListener("click", e => {
                    if (this.questions.counter > 1 ) {
                        this.questions.nextQuestion(2); 
                    }   // index counter -2 (är redan inställd på nästa fråga) 
                })
                //// show question number
                let show_number = document.createElement("p"); 
                show_number.id = "show_number";
                status_bar.appendChild(show_number);

                //// go to next question
                let fwd_button = document.createElement("i");
                fwd_button.className = "fas fa-chevron-circle-right fa-3x";
                status_bar.appendChild(fwd_button);
                fwd_button.addEventListener("click", e => {
                    if (this.questions.counter < this.num_of_questions) {
                        this.questions.nextQuestion(); 
                    }
                })
                break;
            case "submit":
                let button = document.createElement("button");
                document.getElementById("main_inner").appendChild(button);
                button.innerHTML = "SUBMIT ANSWERS";
                button.className = "sumbit_answers";
                button.addEventListener("click", (e) => {
                    let result = this.questions.checkCorrect(this.player.current_answers, this.questions.correct_answers); // omotiverad sista parameter.. kolla om nödvändigt kriterie
                    this.cleanWindow(false);
                    this.displayScore(result);
                    this.footer.style.display = "none";
                    e.target.remove();
                })
                break;
                case "new_game":
                    let restart_button = document.createElement("button");
                    document.getElementById("main_inner").appendChild(restart_button);
                    restart_button.innerHTML = "PLAY AGAIN";
                    restart_button.className = "submit_button play_again";
                    restart_button.addEventListener("click", (e) => {
                        this.cleanWindow(true);
                        e.target.remove();
                        this.parent.getPlayerInfo();
                })
                break;
            default:
        }
    }
    cleanWindow(all) {
        //// remove everything in main
        while (this.main_inner.firstChild) { 
            this.main_inner.removeChild(this.main_inner.lastChild);
        }
        if (all == true) {
            this.footer.style.display = "";
            let status_bar = document.getElementById("status_bar");

            while (status_bar.firstChild) { 
                status_bar.removeChild(status_bar.lastChild);
            }
            this.header.remove();
        }
    }
    
    handleScore(score, index) {
        let arr = this.player.current_answers[index]; // platsen för spelarens svar denna fråga
        
        if (arr.includes(null)) { //// if no score has been added - add score
            arr = [score];
        } else if (!arr.includes(score)) { //// does not include score - add score
            console.log("does not include score");
            arr.push(score);
        } else {
            let remove_index = arr.indexOf(score);
            console.log("splice");
            arr.splice(remove_index, 1);
        }
        
        this.player.current_answers[index] = arr;

        //TODO: funkar ej. läs på om async / timeout
        this.is_answered = true; // resets in case prev. answer get unclicked
        //check if all questions have been answered
        for (let answer of this.player.current_answers) {
                // console.log("new check");
                if (answer.includes(null)) {
                this.is_answered = false;
                // console.log("new check, some null");
            }
        }
        //TODO: funkar ej. läs på om async / timeout
        if (!this.is_answered && document.getElementById("main_inner").lastChild.tagName == "BUTTON") {
            console.log("should remove button");
            document.getElementById("main_inner").lastChild.remove();
        }
        //TODO: funkar inte...
        //check if all questions have been answered
        if (index == (this.num_of_questions.length - 1) && !this.is_answered) { // let player know of missing answers if on last question
            alert("There are questions unanswered still. Please go back and answer.")
        } else if (this.is_answered) {
            this.loadButtons("submit");
        }
    }

    
    displayScore(result) {
        let questions = this.questions.questions;
        let answers = this.questions.answers;
        let correct_answers = this.questions.correct_answers; // true false
        
        let player_correct_answers = result.correct_answers;
        let player_incorrects = result.incorrect_answers;
        let is_corrects = result.is_correct_answers;
        //// calculate total score
        let total_score = is_corrects.filter(val => val == true).length;
        let percent = Math.round(((100 * total_score) / questions.length) * 10) / 10;
        
        
        //// remove footer and replace header
        
        this.header.innerHTML = "Good job " + this.player.name + "!<br> This is your total score:";
        // document.getElementsByTagName("FOOTER")[0].style.display = "none";

        let total_div = document.createElement("div");
        let total_text = document.createElement("h2");
        let percent_text = document.createElement("h6");
        total_text.innerHTML = total_score + " out of " + questions.length;
        percent_text.innerHTML = percent + " %";
        total_text.className = "total";
        percent_text.className = "total";
        this.main_inner.appendChild(total_div);
        total_div.appendChild(total_text);
        total_div.appendChild(percent_text);

        //// Show all questions
        for (let i = 0; i < questions.length; i++) {
            let q_div = document.createElement("div");
            q_div.classList.add("collapsed");
            console.log(is_corrects);
            if (is_corrects[i] == false) {
                q_div.classList.add("incorrect");
            }
            this.main_inner.appendChild(q_div);

            let q_text = document.createElement("h4");
            let text = questions[i].question.replace(/\</g,"&lt;");
            q_text.innerHTML = text;
            q_div.appendChild(q_text);

            
            
            //// Click on question to see mistakes etc
            q_div.addEventListener("click", function(e) {
                if (this.classList.contains("collapsed")) {
                    let main_inner = document.getElementById("main_inner");

                    for (let i = 0; i < main_inner.childNodes.length; i++) { 
                        //// change className on all question divs
                        main_inner.childNodes[i].classList.remove("expanded");
                        main_inner.childNodes[i].classList.add("collapsed");
                    }
                    let main_children = this.parentNode.childNodes;
                    

                    for (let j = 0; j < main_children.length; j++) {  
                        ////main inner div childnodes length
                        while (main_children[j].lastChild.tagName == "P") {
                            main_children[j].removeChild(main_children[j].lastChild);
                        }   //// remove all answers showing
                    }
                    this.classList.add("expanded");
                    this.classList.remove("collapsed");
                    console.log("correct_answers[i]");
                    console.log(correct_answers[i]);


                    ////show answers
                    let answer_section = answers[i];
                    let corrects_section = correct_answers[i];
                    for (let k = 0; k < answer_section.length; k++) {
                        if (answer_section[k] != null) {
                            let p = document.createElement("p");

                            if (corrects_section[k] == "false") {
                                p.classList.add("incorrect");
                            } else {
                                p.classList.add("correct");
                            }

                            if (player_correct_answers[i].includes(answer_section[k])) {
                                p.classList.add("chosen");
                                p.classList.remove("correct");
                            } else if (player_incorrects[i].includes(answer_section[k])) {
                                p.classList.add("chosen_incorrect");
                            }
                            let text = answer_section[k].replace(/\</g,"&lt;");
                            p.innerHTML = text;
                            this.appendChild(p);
                        }
                    }
                } else {
                    this.classList.remove("expanded");
                    this.classList.add("collapsed");
                   
                    while (this.lastChild.tagName == "P") {
                        this.removeChild(this.lastChild);
                    }   //// remove answers showing
                    
                }

            })
        }
        this.loadButtons("new_game")
        // this.parent.getPlayerInfo(); //* start new game

        
        
    }

}