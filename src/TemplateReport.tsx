import React from 'react';
export {}

interface TemplateReportProps {
  reportContent: string;
}

const TemplateReport: React.FC<TemplateReportProps> = ({ reportContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: reportContent }} />;
};

export default TemplateReport;