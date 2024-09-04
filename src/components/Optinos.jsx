function Optinos({ questions, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className=" options">
      {questions.options.map((option, index) => (
        <button
          key={option}
          className={` btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? questions.correctOption == index
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={answer !== null}
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: index,
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Optinos;
