import React from "react";

function QuestionItem({ question,newCorrectIndex, onUpdateQuestion, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const[selectedIndex, setSelectedIndex] = React.useState(correctIndex);



  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleCorrectAnswerChange(event){
    const newCorrectIndex = parseInt(event.target.value,10);
    setSelectedIndex(newCorrectIndex);
  

  fetch(`http://localhost:4000/questions/${id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      correctIndex:newCorrectIndex,
    }),
  })
  .then((response)=>response.json())
  .then((updatedQuestion)=>{
    onUpdateQuestion(updatedQuestion);
    setSelectedIndex(newCorrectIndex);
  })
  .catch((error)=>console.error("Error updating question:",error))
}
function handleDelete(){
  fetch(`http://localhost:4000/questions/${id}`,{
    method:"DELETE",
  })
  .then(()=>{
    onDeleteQuestion(id);
  })
  .catch((error)=>console.error("Error deleting question:",error))
}

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
        value={selectedIndex}
        defaultValue={correctIndex}
        onChange={handleCorrectAnswerChange}
        >{
          options}</select>
      </label>
      <button
      onClick={handleDelete}
      >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
