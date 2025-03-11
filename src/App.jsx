import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";

function StoryMaker() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const storyTopics = [
    "The weirdest Day at School",
    "Adventure in the amazon jungle",
    "Fantasy and Imagination",
    "The birthday plan",
    "A rainy day",
    "The princess",
    "Cooking show",
    "A Haunted House Visit",
    "My Superpower",
    "The Movie Premiere",
    "The Day Everything Went Backward",
  ];

  const topicColors = ["#fe7338", "#2da343", "#203f92", "#ad46b5", "#ec2a2a"];

  const wordTypes = ["verb", "noun", "adjective", "place", "emotion", "name"];

  // საწყისი მნიშვნელობები
  const initialValues = {};
  wordTypes.forEach(wordType => {
    initialValues[wordType] = "";
  });

  // ვალიდაციის სქემის შექმნა
  const validationSchemaObj = {};
  wordTypes.forEach(wordType => {
    validationSchemaObj[wordType] = Yup.string().required(`${wordType} სავალდებულოა`);
  });
  
  const validationSchema = Yup.object(validationSchemaObj);

  const handleSubmit = (values, { setSubmitting }) => {
    if (selectedTopic === null) {
      alert("გთხოვთ აირჩიოთ ისტორიის თემა!");
      setSubmitting(false);
      return;
    }
    
    console.log("შეყვანილი მნიშვნელობები:", values);
    console.log("არჩეული თემა:", storyTopics[selectedTopic]);
    // აქ შეგიძლიათ დაამატოთ ისტორიის გენერაციის ლოგიკა
    setSubmitting(false);
  };

  return (
    <div className="story-maker">
      <h1>Mad Libs!</h1>

      <p className="topic-selection">აირჩიეთ ისტორია</p>

      <div className="topic-list">
        {storyTopics.map((topic, index) => (
          <button
            key={index}
            style={{ 
              backgroundColor: topicColors[index % 5],
              border: selectedTopic === index ? "3px solid black" : "none"
            }}
            onClick={() => setSelectedTopic(index)}
            type="button"
          >
            {topic}
          </button>
        ))}
      </div>

      {showErrors && selectedTopic === null && (
        <p className="error-message topic-error">
          გთხოვთ აირჩიოთ ისტორიის თემა!
        </p>
      )}

      <div className="divider"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, touched, isSubmitting, submitForm, isValid }) => (
          <Form className="word-form">
            <div className="word-inputs">
              {wordTypes.map((word, index) => {
                const article = /^[aeiou]/i.test(word) ? "an" : "a";
                return (
                  <div className="input-wrapper" key={index}>
                    <Field
                      name={word}
                      type="text"
                      placeholder={`შეიყვანეთ ${article} ${word}`}
                      className={showErrors && errors[word] ? "error-input" : ""}
                    />
                    {showErrors && (
                      <ErrorMessage 
                        name={word} 
                        component="span" 
                        className="error-message" 
                      />
                    )}
                    <div>{word}</div>
                  </div>
                );
              })}
            </div>

            <button 
              type="button" 
              className="generate-btn"
              onClick={() => {
                setShowErrors(true);
                submitForm();
              }}
              disabled={isSubmitting}
            >
              შექმენი!
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StoryMaker;