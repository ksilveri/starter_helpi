import React, {useState} from "react";
import './quizzes.css';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    return (
        <div>
            <div
                style={{
                    width: '100%',
                    backgroundColor: '#ddd',
                    height: '20px',
                    marginBottom: '10px',
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        backgroundColor: '#4caf50',
                        height: '100%',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;