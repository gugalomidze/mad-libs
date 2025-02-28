import { useState } from "react";
import "./App.css";

function StoryMaker() {
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

  return (
    <div className="story-maker">
      <h1>Mad Libs!</h1>

      <p className="topic-selection">Choose a story</p>

      <div className="topic-list">
        {storyTopics.map((topic, index) => (
          <button
            key={index}
            style={{ backgroundColor: topicColors[index % 5] }}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="divider"></div>

      <div className="word-form">
        <p>Go Mad! Fill in the blank fields below</p>

        <div className="word-inputs">
          {wordTypes.map((word, index) => {
            const article = /^[aeiou]/i.test(word) ? "an" : "a";
            return (
              <div className="input-wrapper" key={index}>
                <input type="text" placeholder={`Enter ${article} ${word}`} />
                <span>is a required field</span>
                <div>{word}</div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="generate-btn">create!</button>
    </div>
  );
}

export default StoryMaker;
