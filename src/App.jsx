import { useState } from "react";

import "./App.css";
import Questions from "./components/Questions";

function App() {
  return (
    <>
      {/* Create feedback form */}
      <div>
        <h1 className="title">Feedback Form</h1>
        <Questions />
      </div>
    </>
  );
}

export default App;
