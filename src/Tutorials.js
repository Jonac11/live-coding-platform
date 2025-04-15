import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Tutorials = () => {
  const navigate = useNavigate();

  const [videoPreviews, setVideoPreviews] = useState(() => {
    return JSON.parse(localStorage.getItem("videoPreviews")) || [];
  });

  const [slidePreviews, setSlidePreviews] = useState(() => {
    return JSON.parse(localStorage.getItem("slidePreviews")) || [];
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("assignments")) || [];
    return saved.sort((a, b) => b.id - a.id);
  });

  const [videoFile, setVideoFile] = useState(null);
  const [slideFile, setSlideFile] = useState(null);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDesc, setAssignmentDesc] = useState("");

  const [showAllVideos, setShowAllVideos] = useState(false);
  const [showAllSlides, setShowAllSlides] = useState(false);
  const [showAllAssignments, setShowAllAssignments] = useState(false);
  const [maximizedSlide, setMaximizedSlide] = useState(null);

  useEffect(() => {
    localStorage.setItem("videoPreviews", JSON.stringify(videoPreviews));
    localStorage.setItem("slidePreviews", JSON.stringify(slidePreviews));
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [videoPreviews, slidePreviews, assignments]);

  const handleVideoUpload = () => {
    if (videoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newVideo = {
          id: Date.now(),
          title: `Tutorial ${videoPreviews.length + 1}`,
          url: reader.result,
        };
        const updated = [newVideo, ...videoPreviews];
        setVideoPreviews(updated);
        setVideoFile(null);
      };
      reader.readAsDataURL(videoFile);
    }
  };

  const handleSlideUpload = () => {
    if (slideFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result;
        const newSlide = {
          id: Date.now(),
          fileName: slideFile.name,
          url,
          isPDF: slideFile.type === "application/pdf"
        };

        const updated = [newSlide, ...slidePreviews];
        setSlidePreviews(updated);
        localStorage.setItem("slidePreviews", JSON.stringify(updated));
        setSlideFile(null);
      };
      reader.readAsDataURL(slideFile);
    }
  };

  const handlePostAssignment = () => {
    if (assignmentTitle && assignmentDesc) {
      const newAssignment = {
        id: Date.now(),
        title: assignmentTitle,
        question: assignmentDesc
      };
      const updated = [newAssignment, ...assignments];
      setAssignments(updated);
      setAssignmentTitle("");
      setAssignmentDesc("");
    }
  };

  const deleteAssignment = (id) => {
    const updated = assignments.filter(a => a.id !== id);
    setAssignments(updated);
  };

  const deleteVideo = (id) => {
    const updated = videoPreviews.filter(v => v.id !== id);
    setVideoPreviews(updated);
  };

  const deleteSlide = (index) => {
    const updated = slidePreviews.filter((_, i) => i !== index);
    setSlidePreviews(updated);
  };

  const renderPreviewLimit = (items, showAll) => showAll ? items : items.slice(0, 3);

  const handleMaximizeSlide = (index) => {
    setMaximizedSlide(index);
  };

  return (
    <div className="tutorials-page">
      <h1 className="title"> </h1>

      <section className="section">
        <h2>New Material (videos)</h2>
        <div className="tutorial-list">
          {renderPreviewLimit(videoPreviews, showAllVideos).map((video) => (
            <div key={video.id} className="tutorial-card">
              <video src={video.url} controls width="100%" />
              <p>{video.title}</p>
              <button className="delete-btn" onClick={() => deleteVideo(video.id)}>✖</button>
            </div>
          ))}
        </div>
        <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} />
        <button className="create-btn" onClick={handleVideoUpload}>Upload Video</button>
        {videoPreviews.length > 3 && (
          <p className="view-more" onClick={() => setShowAllVideos(!showAllVideos)}>
            {showAllVideos ? "View Less" : "View More"}
          </p>
        )}
      </section>

      <section className="section">
        <h2>Material (slides)</h2>
        <div className="example-list">
          {renderPreviewLimit(slidePreviews, showAllSlides).map((slide) => (
            <div key={slide.id} className="example-box">
              {maximizedSlide === slide.id ? (
                <div className="full-screen-slide">
                  {slide.isPDF ? (
                    <iframe src={slide.url} title={slide.fileName} width="100%" height="100%" style={{ border: "none" }} />
                  ) : (
                    <img src={slide.url} alt={slide.fileName} style={{ width: "100%", height: "auto" }} />
                  )}
                  <button className="delete-btn" onClick={() => deleteSlide(slide.id)}>✖</button>
                </div>
              ) : (
                <>
                  {slide.isPDF ? (
                    <iframe src={slide.url} title={slide.fileName} width="100px" height="100px" style={{ border: "none" }} />
                  ) : (
                    <img src={slide.url} alt={slide.fileName} className="slide-preview" style={{ width: "100px", height: "100px" }} />
                  )}
                  <button className="delete-btn" onClick={() => deleteSlide(slidePreviews.indexOf(slide))}>✖</button>
                  <button className="maximize-btn" onClick={() => handleMaximizeSlide(slide.id)}>
                    {maximizedSlide === slide.id ? "Minimize" : "Maximize"}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
        <input type="file" accept="image/*,.pdf" onChange={e => setSlideFile(e.target.files[0])} />
        <button className="create-btn" onClick={handleSlideUpload}>Upload Slide</button>
        {slidePreviews.length > 3 && (
          <p className="view-more" onClick={() => setShowAllSlides(!showAllSlides)}>
            {showAllSlides ? "View Less" : "View More"}
          </p>
        )}
      </section>

      <section className="section">
        <h2>Assignments posted</h2>
        <input type="text" placeholder="Enter assignment title" value={assignmentTitle} onChange={e => setAssignmentTitle(e.target.value)} className="input-field" />
        <textarea placeholder="Enter assignment description" value={assignmentDesc} onChange={e => setAssignmentDesc(e.target.value)} className="input-field" rows={3} />
        <button className="create-btn" onClick={handlePostAssignment}>Post Assignment</button>
        <div className="practice-list">
          {renderPreviewLimit(assignments, showAllAssignments).map((assignment) => (
            <div key={assignment.id} className="assignment-box">
              <button className="delete-btn" onClick={() => deleteAssignment(assignment.id)}>✖</button>
              <p className="assignment-title">{assignment.title}</p>
              <p className="assignment-desc"><em>(description)</em> {assignment.question}</p>
            </div>
          ))}
        </div>
        {assignments.length > 3 && (
          <p className="view-more" onClick={() => setShowAllAssignments(!showAllAssignments)}>
            {showAllAssignments ? "View Less" : "View More"}
          </p>
        )}
      </section>

      <section className="section">
        <h2>Open practice</h2>
        <button className="resource-btn" onClick={() => navigate("/")}>Open</button>
        <p style={{ fontStyle: "italic", marginTop: "5px" }}>
          This should take you to the main page where the students can play around with the code
        </p>
      </section>
    </div>
  );
};

export default Tutorials;
