import { useEffect } from "react";
import Header from "./components/Header";
import { useReducer } from "react";
import MainData from "./components/MainData";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/finishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready, 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemainig: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemainig: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restartQuiz":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        status: "ready",
        secondsRemainig: null,
      };

    case "tick":
      return {
        ...state,
        secondsRemainig: state.secondsRemainig - 1,
        status: state.secondsRemainig === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unkonwn Action");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemainig },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainData>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemainig={secondsRemainig} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
      </MainData>
      {status === "finished" && (
        <FinishScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          highscore={highscore}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default App;
