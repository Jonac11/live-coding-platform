import React, { useState } from "react";
import "./styles.css"; // Ensure styles are properly linked

const Tutorials = () => {
  // State to store dynamic content
  const [newMaterial, setNewMaterial] = useState([
    { title: "Tutorial 6", image: "https://via.placeholder.com/150" },
    { title: "Tutorial 5", image: "https://via.placeholder.com/150" },
    { title: "Tutorial 4", image: "https://via.placeholder.com/150" }
  ]);

  const [examples, setExamples] = useState([]);
  const [practiceExercises, setPracticeExercises] = useState([]);
  const [resources, setResources] = useState([]);

  // State for input fields
  const [newMaterialInput, setNewMaterialInput] = useState("");
  const [examplesInput, setExamplesInput] = useState("");
  const [practiceInput, setPracticeInput] = useState("");
  const [resourceInput, setResourceInput] = useState("");

  // Functions to add content dynamically
  const addNewMaterial = () => {
    if (newMaterialInput.trim() !== "") {
      setNewMaterial([...newMaterial, { title: newMaterialInput, image: "https://via.placeholder.com/150" }]);
      setNewMaterialInput("");
    }
  };

  const addExample = () => {
    if (examplesInput.trim() !== "") {
      setExamples([...examples, examplesInput]);
      setExamplesInput("");
    }
  };

  const addPracticeExercise = () => {
    if (practiceInput.trim() !== "") {
      setPracticeExercises([...practiceExercises, practiceInput]);
      setPracticeInput("");
    }
  };

  const addResource = () => {
    if (resourceInput.trim() !== "") {
      setResources([...resources, resourceInput]);
      setResourceInput("");
    }
  };

  return (
    <div className="tutorials-page">
      {/* Header Section */}
      <h1 className="title">Tutorials</h1>
      

      {/* Main Content */}
      <div className="content">
        {/* New Material Section */}
        <section className="section">
          <h2>New Material</h2>
          <div className="tutorial-list">
            {newMaterial.map((tutorial, index) => (
              <div key={index} className="tutorial-card">
                <img src={tutorial.image} alt={tutorial.title} />
                <p>{tutorial.title}</p>
              </div>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Enter new tutorial title" 
            value={newMaterialInput} 
            onChange={(e) => setNewMaterialInput(e.target.value)} 
            className="input-field"
          />
          <button className="create-btn" onClick={addNewMaterial}>Create</button>
        </section>

        {/* Examples Section */}
        <section className="section">
          <h2>Examples</h2>
          <div className="example-list">
            {examples.map((example, index) => (
              <div key={index} className="example-box">{example}</div>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Enter new example" 
            value={examplesInput} 
            onChange={(e) => setExamplesInput(e.target.value)} 
            className="input-field"
          />
          <button className="create-btn" onClick={addExample}>Create</button>
        </section>

        {/* Practice Exercises Section */}
        <section className="section">
          <h2>Practice Exercises</h2>
          <div className="practice-list">
            {practiceExercises.map((exercise, index) => (
              <div key={index} className="practice-box">{exercise}</div>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Enter new practice exercise" 
            value={practiceInput} 
            onChange={(e) => setPracticeInput(e.target.value)} 
            className="input-field"
          />
          <button className="create-btn" onClick={addPracticeExercise}>Create</button>
        </section>

        {/* Resources Section */}
        <section className="section">
          <h2>Resources</h2>
          <div className="resource-list">
            {resources.map((resource, index) => (
              <button key={index} className="resource-btn">{resource}</button>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Enter new resource link" 
            value={resourceInput} 
            onChange={(e) => setResourceInput(e.target.value)} 
            className="input-field"
          />
          <button className="create-btn" onClick={addResource}>Create</button>
        </section>
      </div>
    </div>
  );
};

export default Tutorials;
