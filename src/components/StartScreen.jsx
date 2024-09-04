function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz !</h2>
      <h3>{numQuestions} Questions to Test Your React Mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Let&apos;s Start
      </button>
    </div>
  );
}

export default StartScreen;
