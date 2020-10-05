fetch('https://quizapi.io/api/v1/questions?apiKey=C8BWSol6V6TUpmrsb7Zz17pdZoQuzcB9enTsztNA')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });


    //// celebrities
    fetch('https://opentdb.com/api.php?amount=5&category=26&difficulty=medium&type=multiple')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
    //// movies
    fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });

    /* this.questions_arr[0] = new Question("How many 'n' in 'Banana'?", 2, 1, 3, 4);
        this.questions_arr[1] = new Question("Is there life on Mars?", "Probably", "There was", "Yes", "No")
        this.questions_arr[2] = new Question("What does it taste like?", "Water", "Nothing", "Ice cream", "Marshmallow")
        this.questions_arr[3] = new Question("When in doubt, what?", "Lasagna", "Banana", "Onion", "Pizza");
        this.questions_arr[4] = new Question("Who are you?", "Nobody", "Iron Man", "Batman", "You");
         */


        getRndQuestion(length) {   
            let arr = [];
            let num_arr = [];
            for (let i = 0; i < length; i++) {
                let num = Math.floor(Math.random() * this.questions_arr.length);
                if (!num_arr.includes(num)) {
                    num_arr.push(num);
                    arr.push(this.questions_arr[num]);
                } else {
                    i--;
                }
            }
            console.log(arr);
            return arr;
        }



        for (let i = 0; i < questions.length; i++) {
            let show_question = document.createElement("h4");
            let question = questions[i].question;
            let section_player_corrects = player_correct_answers[i];
            let section_player_incorrects = player_incorrects[i];
            let section_correct_strings = this.questions.answers[i];
            // let section_correct = correct_answers[i]; //TODO: switch back
            let section_correct = ["true", "true", "false", "false", "false", "false"];
            

            question = question.replace(/\</g,"&lt;");
            show_question.innerHTML = question;
            main_inner.appendChild(show_question);

            if (is_corrects[i] == true) { // if correctly answered
                for (let answer of player_correct_answers[i]) {
                    let show_answer = document.createElement("p");
                    answer = answer.replace(/\</g,"&lt;");
                    show_answer.innerHTML = answer;
                    show_answer.className = "correct";
                    main_inner.appendChild(show_answer);
                }
            } else { // if NOT correctly answered
                for (let answer of section_player_incorrects) {
                    let show_answer = document.createElement("p");
                    let incorr = answer.replace(/\</g,"&lt;");
                    show_answer.innerHTML = incorr;
                    show_answer.className = "incorrect";
                    main_inner.appendChild(show_answer);
                }
                for (let j = 0; j < section_correct.length; j++) {
                    let answer = section_correct_strings[j];
                    if (section_correct[j] == "true" && !section_player_incorrects.includes(answer)) {
                        let show_answer = document.createElement("p");
                        
                        if (section_player_corrects.includes(answer) || section_player_corrects.includes(answer)) {
                            show_answer.className = "correct"
                        } else {
                            show_answer.className = "not_chosen";
                        }

                        let regex = answer.replace(/\</g,"&lt;");
                        show_answer.innerHTML = regex;
                        main_inner.appendChild(show_answer);
                    }
                }
                
            }
        }