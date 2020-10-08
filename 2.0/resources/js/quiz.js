document.addEventListener("DOMContentLoaded", function(e) {
    new Quiz();
});

class Quiz {
    constructor() {
        this.questions = new Questions();
        this.player = new Player();
        this.interface = new Interface();

        this.quiz_length;
        this.current_index = 0; // what question should be displayed next

        let form_content = this.interface.setupForm();
        this.playerInfoSubmitEvent(form_content); //// listen for submit form
    }

    //* START QUIZ called from submit form
    startQuiz(info) {
        //// update player info
        this.quiz_length = info.quiz_length;
        this.player.updatePlayer(info.name, info.quiz_length);
        
        //// get questions from api
        this.getQuestions(info.quiz_length, info.difficulty, info.category);
        
        //// load footer buttons
        this.interface.loadButtons("next");
        this.interfaceEvents(this.interface.fwd_btn, "fwd");
        this.interfaceEvents(this.interface.back_btn, "back");

        //// remove existing form & setup answers container
        this.interface.setupAnswers();
    }

    //* fetch new questions
    async getQuestions(number, difficulty, category) {
        await fetch("https://quizapi.io/api/v1/questions?apiKey=C8BWSol6V6TUpmrsb7Zz17pdZoQuzcB9enTsztNA&limit=" + number + "&difficulty=" + difficulty + "&tags=" + category)
        .then(response => response.json())
        .then(data => {
            //// send data to set values to questions keys
            this.questions.updateQuestions(data);
            //// load first question
            this.nextQuestion(this.current_index); // wait until data is loaded
        });
    }

    //* load next question
    nextQuestion(index) {
        let question = this.questions.getNextQuestion(index);
        let answers = this.questions.getNextAnswers(index);
        this.interface.displayQuestion(question, index, this.quiz_length);
        this.interface.displayAnswers(answers);
        this.current_index++;

        //// eventlisteners on new answers
        this.interfaceEvents(this.interface.answers_on_display, "li"); 
    }

    //* eventListeners
    interfaceEvents(element, type) {
        switch (type) {
            //// back & forward buttons
            case "fwd":
                element.addEventListener("click", e => {
                    if (this.current_index < this.quiz_length) {
                        this.nextQuestion(this.current_index);
                    }
                });
                break;
            case "back":
                element.addEventListener("click", e => {
                    if (this.current_index > 1 ) {
                        this.current_index -= 2; // index already setup for next question
                        this.nextQuestion(this.current_index);
                    }    
                })
                break;
            
            //// Answer options
            case "li":
                let index = this.current_index - 1;
                for (let i = 0; i < element.length; i++) {
                    if (this.player.current_answers[index].includes(i)) { 
                        element[i].className = "chosen"; //// change styling of already chosen
                    }
                    element[i].addEventListener("click", event => {
                        event.target.classList.toggle("chosen");
                        this.player.handleAnswers(index, i); 
                        // current index + index of the chosen answer

                        let is_answered = this.player.checkIsAnswered();

                        //// let player know of missing answers if on last question
                        if (index == (this.quiz_length - 1) && !is_answered) { 
                            alert("There are questions unanswered still. Please go back and answer.")
                        } else if (is_answered) {
                            this.interface.loadButtons("submit");
                            this.interfaceEvents(this.interface.button, "submit");
                        }   // if all questions are answered - button to submit answers
                    });
                }
                break;
            //// submit answers -> show result
            case "submit":
                element.addEventListener("click", event => {

                    if (this.player.checkIsAnswered()) { // check just in case chosen gets unchosen
                        this.interface.cleanWindow();
                        event.target.remove();

                        let result = this.checkCorrect(this.player.current_answers, this.questions.correct_answers);
                        this.interface.displayScore(result, this.player.name);

                        //// click event on all displaying questions on final score display
                        let main_children = document.getElementById("main_inner").childNodes;
                        for (let i = 1; i < main_children.length; i++) { // (index 0 =the top score)
                            this.interfaceEvents(main_children[i], "check");
                        } 

                        this.interface.loadButtons("new_quiz");
                        this.interfaceEvents(this.interface.button, "new_quiz");
                    }
                });

                break;
            //// Open/close question divs to show answers at result display
            case "check":
                element.addEventListener("click", event => {
                    let result = this.checkCorrect(this.player.current_answers, this.questions.correct_answers);
                    this.interface.displayCorrectAnswers(result, event.target);
                });
                break;
            //// Start new quiz
            case "new_quiz":
                element.addEventListener("click", event => {
                    ////clean up
                    this.interface.cleanWindow();
                    this.current_index = 0;
                    event.target.remove();
                    //// start
                    let form_content = this.interface.setupForm(); // ask new player info
                    this.playerInfoSubmitEvent(form_content);   // listen for submit form
                })
                break;

                default:
                console.log("No type specified");
            
        }
    }

    //* submit form eventListener
    playerInfoSubmitEvent(content) {
        let form = this.interface.form;
        let name = content.name;
        let category = content.category;
        let difficulty = content.difficulty;
        let number = content.number;
        
        form.onsubmit = (e) => {
            e.preventDefault();
            //// check that name is not only spaces 
            let trimmed = name.value.trim();
            if (trimmed.length > 0) { 
                let info = {
                    name: name.value,
                    quiz_length: Number(number.value),
                    difficulty: difficulty.value,
                    category: category.value
                };

                //// store values 
                localStorage.setItem("name", name.value);
                localStorage.setItem("number", number.value);
                localStorage.setItem("difficulty", difficulty.value);
                localStorage.setItem("category", category.value);

                this.startQuiz(info); //// START QUIZ 
            } else {
                alert("Please enter your name.")
            }
        }
    }


    //* ====== CHECK FINAL SCORE RESULTS ======= */
    checkCorrect(player_chosen, quiz_corrects) {
        let player_is_corrects = [];   // send in booleans
        let player_corrects    = [];   // correctly answered strings
        let player_incorrects  = [];   // incorrectly answered strings
        let correct_answers    = quiz_corrects;
        let questions          = this.questions;

        //// checking each section (each question) 
        for (let i = 0; i < player_chosen.length; i++) { 
            let corrects_section = correct_answers[i];  //[true, true, false] quiz's correct answers
            
            //// filter to see if more than one correct answer for question
            let correct_filtered = corrects_section.filter(value => value == true);// [true, true]
            let correct_index = corrects_section.indexOf(true); // ex: 2,  use if only one correct

            let section_answers = player_chosen[i];
            let section_options = this.questions.answers[i];
            let is_correct      = true;

            let correct_arr     = []; // to send to player_corrects
            let incorrect_arr   = []; // to send to player_incorrects


            //// if one correct answer                                    
            //// match index of chosen answer to question's correct answer
            if (correct_filtered.length <= 1) {
                for (let chosen_index of player_chosen[i]) {

                    if (chosen_index == correct_index) {
                        correct_arr.push(section_options[chosen_index]);
                    } else {
                        is_correct = false;         // fel svar sparas
                        incorrect_arr.push(section_options[chosen_index]);
                    }
                }
            //// if more than one correct answer                          
            //// match index of chosen answer to question's correct answer
            } else if (correct_filtered.length > 1) {
                for (let j = 0; j < corrects_section.length; j++) {
                    if (corrects_section[j] == true) {
                        if (!section_answers.includes(j)) { 
                            is_correct = false;     
                        } else {   // if "true" index exists among chosen, save answer string
                            correct_arr.push(section_options[j]);
                        }
                        if (section_answers.length > correct_filtered.length) {
                            is_correct = false; 
                            //// not all correct options chosen = incorrectly answered.
                        }
                    } 
                }
                for (let answer of player_chosen[i]) {  
                    //! kolla om detta stämmer och ta reda på varför
                    /* if (!correct_arr.includes(section_options[answer])) {
                        // lägg in här?
                    } */
                    incorrect_arr.push(section_options[answer]);
                }
                
            } 
            player_is_corrects.push(is_correct);
            player_corrects.push(correct_arr);
            player_incorrects.push(incorrect_arr);

        }

        //// calculate percentage of correctly answered
        let total_score = player_is_corrects.filter(val => val == true).length;
        let percent = Math.round(((100 * total_score) / this.questions.questions.length) * 10) / 10;
        this.player.updateScore(total_score);
        this.player.updatePercent(percent);

        return {
            total_score,
            percent,
            times_played: this.player.times_played,
            all_time_score: this.player.all_time_score,
            percent_average: this.player.percent_average,
            player_corrects,
            player_incorrects,
            player_is_corrects,
            correct_answers,
            questions
        }
    }//* end of checkCorrect
    


    
}