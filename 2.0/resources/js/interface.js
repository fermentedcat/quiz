class Interface {
    constructor() {
        this.header_container = document.getElementById("question_container");
        this.header = document.createElement("H1");
        this.header_container.appendChild(this.header);

        this.main = document.getElementById("main_inner");
        this.answers_container;

        this.footer = document.querySelector("FOOTER");

        this.form;
        this.answers;
        this.scoreBoard;

        this.status_bar;
        this.current_q_number;
        this.fwd_btn;
        this.back_btn;
        this.button; // any other current button


        this.answers_on_display; // currently displaying answer options

    }
    //* =================== FORM ==================== *//
    setupForm() {
        this.header.innerHTML = "QUIZ TIME!";
        //// form to get player info, category etc
        this.form = document.createElement("form");
        this.main.appendChild(this.form);

        let name = document.createElement("input");
        name.className = "player_info";
        name.placeholder = "Enter your name here";
        name.required = true;
        this.form.appendChild(name);
        name.focus();

        //// category
        let category = document.createElement("select");
        category.className = "player_info";
        category.required = true;
        this.form.appendChild(category);

        let cat_descr = document.createElement("option");
        let cat_opt1 = document.createElement("option");
        let cat_opt2 = document.createElement("option");
        let cat_opt3 = document.createElement("option");

        cat_descr.disabled = true;
        cat_descr.selected = true;
        cat_descr.hidden = true;
        
        cat_descr.value = "";
        cat_opt1.value = "JavaScript";
        cat_opt2.value = "Linux";
        cat_opt3.value = "HTML";

        cat_descr.innerHTML = "Choose a category";
        cat_opt1.innerHTML = "JavaScript";
        cat_opt2.innerHTML = "Linux / BASH";
        cat_opt3.innerHTML = "HTML";

        category.appendChild(cat_descr);
        category.appendChild(cat_opt1);
        category.appendChild(cat_opt2);
        category.appendChild(cat_opt3);

        //// difficulty
        let difficulty = document.createElement("select");
        difficulty.className = "player_info";
        difficulty.required = true;
        this.form.appendChild(difficulty);

        let dif_descr = document.createElement("option");
        let dif_opt1 = document.createElement("option");
        let dif_opt2 = document.createElement("option");
        let dif_opt3 = document.createElement("option");

        dif_descr.disabled = true;
        dif_descr.selected = true;
        dif_descr.hidden = true;

        dif_descr.value = "";
        dif_opt1.value = "Easy";
        dif_opt2.value = "Medium";
        dif_opt3.value = "Hard";

        dif_descr.innerHTML = "Choose difficulty";
        dif_opt1.innerHTML = "Easy";
        dif_opt2.innerHTML = "Medium";
        dif_opt3.innerHTML = "Hard";

        difficulty.appendChild(dif_descr);
        difficulty.appendChild(dif_opt1);
        difficulty.appendChild(dif_opt2);
        difficulty.appendChild(dif_opt3);

        //// number of questions
        let number = document.createElement("input");
        number.type = "number";
        number.min = 5;
        number.max = 10;
        number.placeholder = "Number of questions";
        number.className = "player_info";
        number.required = true;
        this.form.appendChild(number);

        //// sumbit button
        this.loadButtons("form");

        //// change difficulty if JavaScript is chosen
        category.addEventListener("change", e => {
            if (category.value == "JavaScript") {
                dif_opt1.selected = true;
                dif_opt2.disabled = true; // medium
                dif_opt3.disabled = true; // hard
            } else {
                let dif_options = Array.from(difficulty.childNodes);
                dif_options.shift(); // ligger en hemlig på index 0
                dif_options.forEach(option => {
                    option.disabled = false;
                });
            }});

        //// if - annars tomma fält (inga placeholders/"förval")
        if (localStorage.getItem("name")) {
            name.value = localStorage.getItem("name");
        }
        if (localStorage.getItem("number")) {
            number.value = localStorage.getItem("number");
        }
        if (localStorage.getItem("number")) {
            difficulty.value = localStorage.getItem("difficulty");
        }
        if (localStorage.getItem("number")) {
            category.value = localStorage.getItem("category");
        }

        return {
            name,
            category,
            difficulty,
            number
        }
    } //// end of form 

    //* ============= QUESTION DISPLAY ============== *//
    setupAnswers() {
        this.form.remove();
        //// set up list in main for answers
        this.answers_container = document.createElement("ul");
        this.answers_container.className = "list";
        this.main.appendChild(this.answers_container);
    }
    //// display question in quiz
    displayQuestion(question, index, quiz_length) {
        this.header.innerHTML = question;
        this.current_q_number.innerHTML = (index + 1) + " / " + quiz_length;
    }
    //// display answers in quiz
    displayAnswers(answers) {  // contains one set of answers (for one question)        
        //// clean up ul
        while (this.answers_container.firstChild) { // ta bort alla svarsalt från förra frågan
            this.answers_container.removeChild(this.answers_container.lastChild);
        }  
               
        let these_answers = []; //// to use in class Quiz when clicking on answers
        for (let answer of answers) {
            let answer_button = document.createElement("li");
            answer_button.innerHTML = answer;
            this.answers_container.appendChild(answer_button);
            these_answers.push(answer_button);
        }
        this.answers_on_display = these_answers;
    }


    //* =============== FINAL SCORE ================= *//
    //// finished quiz score board
    displayScore(name, score) {
    this.header.innerHTML = "Good job " + name + "!<br> This is your total score:";
    

    }


    //* ================== BUTTONS ================== *//
    loadButtons(type) {
        switch (type) {
            ////   send form    
            case "form":
                this.button = document.createElement("button");
                this.button.className = "submit_button"
                this.button.innerHTML = "START QUIZ";
                this.button.type = "submit"
                this.form.appendChild(this.button);
                break;

            ////  back/forward  
            case "next": 
                this.status_bar = document.getElementById("status_bar");
                this.footer.style.display = ""; //* useful??

                //// go to previous question
                this.back_btn = document.createElement("i");
                this.back_btn.className = "fas fa-chevron-circle-left fa-3x";
                this.status_bar.appendChild(this.back_btn);
        
                //// show question number
                this.current_q_number = document.createElement("p"); 
                this.status_bar.appendChild(this.current_q_number);

                //// go to next question
                this.fwd_btn = document.createElement("i");
                this.fwd_btn.className = "fas fa-chevron-circle-right fa-3x";
                this.status_bar.appendChild(this.fwd_btn);
                break;

            //// submit answers 
            case "submit":
                this.button = document.createElement("button");
                document.getElementById("main_inner").appendChild(this.button);
                this.button.innerHTML = "SUBMIT ANSWERS";
                this.button.className = "sumbit_answers";
                break;

            ////   new quiz     
            case "new_game":
                this.button = document.createElement("button");
                document.getElementById("main_inner").appendChild(this.button);
                this.button.innerHTML = "PLAY AGAIN";
                this.button.className = "submit_button play_again";
                break;

            default:
                console.log("no button type specified");
        }

    }
    removeButton(type) {

    }
}