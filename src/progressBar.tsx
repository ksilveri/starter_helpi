import React from "react";
import './quizzes.css';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    return (
        <div>
            <div
                style={{
                    width: '70%',
                    backgroundColor: '#ddd',
                    height: '30px',
                    marginBottom: '40px',
                    marginTop: '10px',
                    borderRadius: '100px',
                    margin: '0 auto',
                    border: '2px solid #000000',
                    
                }}
                
            >
                <div
                    style={{
                        width: `${progress}%`,
                        backgroundColor: '#254117',
                        height: '100%',
                        borderRadius: '100px',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;