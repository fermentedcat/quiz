document.addEventListener("DOMContentLoaded", function(e) {
    new Start().getPlayerInfo();
    
    
    


    

    

    

    

    
    let quiz = new Quiz(10, "Easy", "JavaScript");
    quiz.startQuiz();
    console.log(quiz.player.name);


    /* class Question {
        constructor() {
            this.question = question;
            this.correct_answer = correct_answer;
            this.alt_1 = alt_1;
            this.alt_2 = alt_2;
            this.alt_3 = alt_3;
            
        }
        
    } */
    /* let questions = new Questions();
    questions.changeQuestion("hello"); */
});

class Start {   //// steg 1 på sidan / håller i spelarens val
    constructor() {
        this.filled = false;
        this.player_name = "";
        this.player_category = "";
        this.player_number = 0;

        this.header_container = document.getElementById("question_container");
        this.main_inner = document.getElementById("main_inner");
    }
    getPlayerInfo() {
        let header = document.createElement("h1");
        header.innerHTML = "QUIZ TIME!"
        this.header_container.appendChild(header);

        //TODO: gör om till FORM
        let input = document.createElement("input");
        input.className = "player_info";
        input.placeholder = "Enter your name here";
        this.main_inner.appendChild(input);
        input.focus();
        let category = document.createElement("select");
        category.className = "player_info";
        this.main_inner.appendChild(category);

        let cat_descr = document.createElement("option");
        let cat_opt1 = document.createElement("option");
        let cat_opt2 = document.createElement("option");
        let cat_opt3 = document.createElement("option");

        cat_descr.disabled = true;
        cat_descr.selected = true;
        cat_descr.hidden = true;
        
        cat_descr.value = "";
        cat_opt1.value = "Programming";
        cat_opt2.value = "JavaScript";
        cat_opt3.value = "HTML";

        cat_descr.innerHTML = "Choose a category";
        cat_opt1.innerHTML = "Programming";
        cat_opt2.innerHTML = "JavaScript";
        cat_opt3.innerHTML = "HTML";

        category.appendChild(cat_descr);
        category.appendChild(cat_opt1);
        category.appendChild(cat_opt2);
        category.appendChild(cat_opt3);

        let number = document.createElement("select");
        number.className = "player_info";
        this.main_inner.appendChild(number);

        let num_descr = document.createElement("option");
        let num_opt1 = document.createElement("option");
        let num_opt2 = document.createElement("option");
        let num_opt3 = document.createElement("option");

        num_descr.disabled = true;
        num_descr.selected = true;
        num_descr.hidden = true;

        num_descr.value = "";
        num_opt1.value = 5;
        num_opt2.value = 10;
        num_opt3.value = 15;

        num_descr.innerHTML = "Choose a number";
        num_opt1.innerHTML = 5;
        num_opt2.innerHTML = 10;
        num_opt3.innerHTML = 15;

        number.appendChild(num_descr);
        number.appendChild(num_opt1);
        number.appendChild(num_opt2);
        number.appendChild(num_opt3);

        let submit = document.createElement("button");
        submit.className = "submit_button"
        submit.innerHTML = "SUBMIT";
        // submit.disabled = true;
        this.main_inner.appendChild(submit);

        input.addEventListener("keyup", e => {
            if (e.code == "Enter") {
                let trimmed = input.value.trim();
                if (trimmed.length > 0) {
                    this.player_name = trimmed;
                    console.log(this.player_name);
                    category.focus();
                }
            }
        })

    }

    newQuiz() {

    }
}