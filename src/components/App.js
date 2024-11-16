import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const[questions,setQuestions] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((response)=>response.json())
    .then((data)=>setQuestions(data))
    .catch((error)=>console.error("Error fetching questions:",error));
  },[]);

  function addQuestion(newQuestion){
    setQuestions((questions) =>[...questions,newQuestion]);
  }

  function deleteQuestion(id){
    setQuestions(questions.filter((question)=>question.id !== id));
  }

  function updateQuestion(updatedQuestion){
    setQuestions(questions.map((question)=>
    question.id === updatedQuestion.id ? updatedQuestion :question));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion}/>
      )
       : (
       <QuestionList 
        questions={questions}
        onDeleteQuestion={deleteQuestion}
        onUpdateQuestion={updateQuestion}
        />)
      }
    </main>
  );
}

export default App;
