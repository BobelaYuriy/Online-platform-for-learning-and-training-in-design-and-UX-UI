import React, { useState, useEffect } from "react";
import { MyButton } from "../UI/button/MyButton";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { courseApi } from "../../services/coursesService";

const Test = ({ questions, setUserAnswers }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  useEffect(() => {
    // Update the parent component whenever answers change
    setUserAnswers(answers);
  }, [answers, setUserAnswers]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  return (
    <div>
      {questions.map((question, questionIndex) => (
        <div key={question._id} style={{ marginBottom: "20px" }}>
          <p style={{ fontWeight: "bold" }}>{question.text}</p>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="radio"
                id={`option-${questionIndex}-${optionIndex}`}
                name={`question-${questionIndex}`}
                value={optionIndex}
                checked={answers[questionIndex] === optionIndex}
                onChange={() => handleOptionChange(questionIndex, optionIndex)}
              />
              <label htmlFor={`option-${questionIndex}-${optionIndex}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Test;
