import React, { useEffect, useState } from "react";
import "./Questions.css";
import { useFormik } from "formik";
import axios from "axios";
function Questions() {
  const [Questions, setQuestions] = useState([]);

  // Function to handle selecting an answer for a question
  // const handleAnswerSelection = (questionId, answer) => {
  //   setAnswers((answers) => {
  //     return {
  //       ...answers,
  //       [questionId]: answer,
  //     };
  //   });
  // };

  const handleQuestionId = (event) => {
    setQuestionID(event.target.value);
  };
  const [user_id, setUser_id] = useState(1);
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      try {
        setUser_id(user_id + 1);
        let data = Questions.map((question) => ({
          question_id: parseInt(question.id),
          response: values[question.id],
          user_id: user_id,
        }));

        console.log(data);
        axios.post("http://localhost:3001/response", data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const GetQuestions = async () => {
    const data = await axios.get("http://localhost:3001/questions");
    setQuestions(data.data);
    // console.log(data.data);
  };
  useEffect(() => {
    GetQuestions();
  }, []);

  return (
    <div className="container">
      <h4>Questions</h4>
      <form onSubmit={formik.handleSubmit}>
        <div className="questionlist">
          <ul>
            {Questions.map((item, index) => {
              return (
                <li key={index} className="row m-2">
                  <div className="col fw-bold" id={item.id}>
                    <label onChange={handleQuestionId} value={item.id}>
                      {item.question}
                    </label>
                  </div>
                  <div className=" fs-6">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={item.id}
                        id={item.id}
                        value={"Excellent"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={item.question}
                      >
                        Excellent
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={item.id}
                        id={item.id}
                        value={"Good"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={item.question}
                      >
                        Good
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={item.id}
                        id={item.id}
                        value={"Poor"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={item.question}
                      >
                        Poor
                      </label>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Questions;
