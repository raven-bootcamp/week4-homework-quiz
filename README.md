# Week 4 Homework: Quiz

My solution, hosted using Github Pages: https://raven-bootcamp.github.io/week4-homework-quiz/

The repository with my code: https://github.com/raven-bootcamp/week4-homework-quiz

## The Task

We are to create a quiz using Javascript / HTML / CSS.  This quiz will ask you a number of multiple choice questions and a time limit is in place.  The game is over if the time runs out.  

Each time the user answers a question incorrectly, a certain amount of time is taken off the remaining time limit.

A list of high scores is kept that can be added to by the user, if their score is good enough.

## My Approach

The rules of the quiz are vague (intentionally, I think).  I have designed the rules in the following way:

1. The time limit is 75 seconds.
2. There are 5 questions in total.
3. A wrong answer subtracts 10 seconds from the remaining time.
4. Should the user run out of time, or answer a question incorrectly which removes the remaining time, the game is over.
5. Should the user answer all the questions and they still have time remaining on the clock, the remaining time becomes their overall score.

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Mockup

![image](/images/04-web-apis-homework-demo.gif)

## Solution screenshot

![image](/images/quiz-screenshot.png)
