import { useEffect } from "react";
import Header from "./Header";
import { useReducer } from "react";
import MainData from "./MainData";

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready, 'active', 'finished'
  status: "loading",
};

function reducer(state, action) {
  console.log(state);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Unkonwn Action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainData>
        <p>1/15</p>
        <p>Question</p>
      </MainData>
    </div>
  );
}

export default App;
