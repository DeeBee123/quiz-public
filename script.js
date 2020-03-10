var url =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

$.getJSON(url, function(data) {
  var allQuestions = data.results;
  var currentScore = data.response_code;
  console.log(`Good Luck!`);
  $("#results").text(
    "Score: " + currentScore + " out of " + allQuestions.length + "!"
  );

  function startQuiz() {
    const output = [];
    allQuestions.forEach(currentQuestion => {
      const answers = [];

      for (i = 0; i < currentQuestion.incorrect_answers.length; i++) {
        answers.push(
          `<li class="list-group-item" value="wrong">${currentQuestion.incorrect_answers[i]}</li>`
        );
      }
      answers.push(
        `<li class="list-group-item" value="correct">${currentQuestion.correct_answer}</li>`
      );

      function shuffle(answers) {
        let length = answers.length;
        let temp;
        let index;

        while (length > 0) {
          index = Math.floor(Math.random() * length);
          length--;
          temp = answers[length];
          answers[length] = answers[index];
          answers[index] = temp;
        }
        return answers;
      }
      shuffle(answers);

      output.push(
        `<li class="list-group-item active">${currentQuestion.question}</li>
         ${answers.join("")}`
      );
    });

    let index = 0;
    let question = 1;
    $(".jumbotron .list-group").append(output[index]);

    $("#next").click(function() {
      index++;
      if (question < 10) {
        $(".jumbotron .list-group").html(output[index]);

        question++;

        $(".sequence .questionNumber").text(question);

        $(".list-group-item:not(:first-child)").click(function() {
          $(".list-group-item:not(:first-child)").removeClass("selected");
          $(this).addClass("selected");
        });
        if (question === 10) {
          $("#next").css("display", "none");
          $("#again").css("display", "block");
        }
      }
    });

    $(".list-group-item:not(:first-child)").click(function() {
      $(".list-group-item:not(:first-child)").removeClass("selected");
      $(this).addClass("selected");
    });
  }

  var score = 0;
  $("#submit").click(function() {
    var rightAnswer = $('li[value="correct"]');
    var allAnswers = $(".list-group-item:not(:first-child)");
    var selectedAnswer = $(".list-group-item.selected");

    $(allAnswers).click(function() {
      $(allAnswers).removeClass("selected");
    });

    if (rightAnswer.hasClass("selected")) {
      score += 1;
      $("#results").text(
        "Score: " + score + " out of " + allQuestions.length + "!"
      );
    } else {
      score += 0;
      $(selectedAnswer).addClass("wrong");
    }

    $(rightAnswer).addClass("correct");
  });

  startQuiz();
});
$("#again").click(function() {
  location.reload();
});
