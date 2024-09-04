import Optinos from "./Optinos";

function Question({ questions, dispatch, answer }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Optinos questions={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
