import React from 'react';
export {}

interface ReportTemplateProps {
  title: string;
  content: string;
}

const ReportTemplate: React.FC<ReportTemplateProps> = ({ title, content }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
          <h2>{title}</h2>
          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <p>{content}</p>
          </div>
        </div>
      );
};

export default ReportTemplate;