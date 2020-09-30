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