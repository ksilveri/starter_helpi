import React from 'react';
import Form from 'react-bootstrap/Form';
export {};

interface RadioButtonOption {
  label: string;
  value: string;
}

interface RadioButtonProps {
    options: RadioButtonOption[];
    name: string;
    selectedValue: string;
    onChange: (value: string) => void;
  }

  const RadioButtonHelper: React.FC<RadioButtonProps> = ({ options, name, selectedValue, onChange }) => {
    return (
      <div>
        {options.map((option, index) => (
          <Form.Check
          inline
            key={index}
            type="radio"
            id={`${name}-${index}`}
            label={option.label}
            value={option.value}
            name={name}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
        ))}
      </div>
    );
  };
  
  export default RadioButtonHelper;