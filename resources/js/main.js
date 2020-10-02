document.addEventListener("DOMContentLoaded", function(e) {
    new Start().getPlayerInfo();
    
    
    


    

    

    

    

    
    
    // console.log(quiz.player.name);


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

class Start {   //// steg 1 på sidan / håller i spelarens val / skapar Quiz och Player
    constructor() {
        this.input_name = "";
        this.input_category = "";
        this.input_difficulty = "";
        this.input_number = 0;
        this.quiz;

        this.header_container = document.getElementById("question_container");
        this.main_inner = document.getElementById("main_inner");
    }
    newPlayer() {
        new Player(this.input_name);
    }
    newQuiz() {
        this.quiz = new Quiz(this.input_number, this.input_difficulty, this.input_category);
    }
    getPlayerInfo() {
        let header = document.createElement("h1");
        header.innerHTML = "QUIZ TIME!"
        this.header_container.appendChild(header);

        let form = document.createElement("form");
        this.main_inner.appendChild(form);
        
        let name = document.createElement("input");
        name.className = "player_info";
        name.placeholder = "Enter your name here";
        name.required = true;
        form.appendChild(name);
        name.focus();


        let category = document.createElement("select");
        category.className = "player_info";
        category.required = true;
        form.appendChild(category);


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

        let difficulty = document.createElement("select");
        difficulty.className = "player_info";
        difficulty.required = true;
        form.appendChild(difficulty);

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

        let number = document.createElement("select");
        number.className = "player_info";
        number.required = true;
        form.appendChild(number);

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

        num_descr.innerHTML = "Number of questions";
        num_opt1.innerHTML = 5;
        num_opt2.innerHTML = 10;
        num_opt3.innerHTML = 15;

        number.appendChild(num_descr);
        number.appendChild(num_opt1);
        number.appendChild(num_opt2);
        number.appendChild(num_opt3);

        let submit = document.createElement("button");
        submit.className = "submit_button"
        submit.innerHTML = "START QUIZ";
        submit.type = "submit"
        // submit.disabled = true;
        form.appendChild(submit);

        // let selects = Array.from(document.getElementsByTagName("SELECT"));
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
            }
        })

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
        
        
        form.onsubmit = (e) => {
            e.preventDefault();
            let trimmed = name.value.trim();
            if (trimmed.length > 0) { // kolla att det inte bara är mellanslag
                this.input_name = name.value;
                this.input_number = number.value;
                this.input_difficulty = difficulty.value;
                this.input_category = category.value;
                localStorage.setItem("name", name.value);
                localStorage.setItem("number", number.value);
                localStorage.setItem("difficulty", difficulty.value);
                localStorage.setItem("category", category.value);
                console.log(form);
                while(this.main_inner.firstChild) {
                    this.main_inner.lastChild.remove();
                }
                header.remove();
                this.newQuiz();
                this.newPlayer();
            }
            else {
                alert("Please enter your name.")
            }
        }
    }
}