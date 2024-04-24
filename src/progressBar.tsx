import React, {useState} from "react";
import './quizzes.css';

const ProgressBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const calculateProgress = () => {
    const maxLength = 100; 
    return (inputValue.length / maxLength) * 100;
  };

  return (
    <div>
      <textarea
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
        rows={4}
        cols={50}
      />
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
            width: `${calculateProgress()}%`,
            backgroundColor: '#4caf50',
            height: '100%',
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;








/*
interface ProgressBarProps {
    onTextboxClick: () => void;
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ onTextboxClick, progress}) => {
    return (
        <div className="progress-container">
            <div className="progress-bar">
                <div className="progress-bar-fill">
                    <input type="text" onClick={onTextboxClick} placeholder="Click me"/>
                </div>
                <div className="progress-label">{progress}%</div>
            </div>
        </div>
     );
    };

export default ProgressBar;
*/