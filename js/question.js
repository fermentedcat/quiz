class Question {
    constructor() {
        this.question = this.getQuestion();
        
    }
    getQuestion() {
        let questions_arr = [
            "How many 'n' in 'Banana'?",
            "What does snow taste like?",
            "Is there life on Mars?",
            "Who are you?",
            "When in doubt, what?"
        ];
        let correct_answers = [
            2,
            "Water",
            "Probably",
            "Nobody",
            "Lasagna"
        ];
        let alternatives = [
            ( 1, 2, 3, 4 ),
            ("Nothing", "Ice cream", "Water", "Marshmallow"),
            ("There was", "Yes", "No", "Probably"),
            ("Iron Man", "Batman", "Nobody", "You"),
            ("Lasagna", "Banana", "Onion", "Pizza") 
        ];
        
        let num = Math.floor(Math.random() * questions_arr.length);
        console.log(num);
        return questions_arr[num];
    }
}