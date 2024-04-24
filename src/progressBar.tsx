import React, {useState} from "react";

export const ProgressBar = () => {
    const [progress, setProgress] = useState(0);

    const handleNext = () => {
        if (progress < 100){
           setProgress(progress + 7); 
        }
    }

    const handlePrev = () => {
        setProgress(progress - 7);
    }

    return <div className="progress-container">
        <div className="progress-bar">
            <div className="progress-bar-fill"></div>
        </div>
        <div className="progress-label">50%</div>
        <button onClick={handleNext}>Next</button>
        <button onClick={handlePrev}>Reset</button>
    </div>;
};