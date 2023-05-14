import React, { useState } from 'react';
import Histogram from './Histogram';
import "./App.css";

function App() {
  const [histogramData, setHistogramData] = useState([]);

  const handleSubmit = async () => {
    const response = await fetch('https://www.terriblytinytales.com/test.txt');
    const text = await response.text();
    const wordFrequency = {};
    const words = text.toLowerCase().match(/\b\w+\b/g);
    for (const word of words) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
    const sortedData = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, frequency]) => ({ word, frequency }));
    setHistogramData(sortedData);
  };

  const handleExport = () => {
    const csvData = [
      ['Word', 'Frequency'],
      ...histogramData.map(({ word, frequency }) => [word, frequency]),
    ];
    const csvString = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const filename = 'histogram_data.csv';
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    
      <div className="app-container">
      <h1>Word Frequency Histogram</h1>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      {histogramData.length > 0 && (
        <div>
          <Histogram data={histogramData} />
          <button className="export-button" onClick={handleExport}>Export</button>
        </div>
      )}
    </div>
  );
}

export default App;
