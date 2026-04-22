import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../services/api';

const ApiTest = () => {
  const [testResult, setTestResult] = useState('Testing...');
  const [error, setError] = useState('');

  useEffect(() => {
    const testApi = async () => {
      try {
        console.log('Testing API connection...');
        const result = await fetchTrendingMovies();
        console.log('API Test Success:', result);
        setTestResult(`SUCCESS: Found ${result.results.length} movies`);
      } catch (err) {
        console.error('API Test Failed:', err);
        setError(err.message);
        setTestResult('FAILED');
      }
    };

    testApi();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '2px solid #e50914', 
      borderRadius: '8px',
      backgroundColor: '#1a1a2e',
      color: 'white'
    }}>
      <h3>API Connection Test</h3>
      <p><strong>Status:</strong> {testResult}</p>
      {error && <p><strong>Error:</strong> {error}</p>}
      <p><strong>Check browser console for detailed debug info</strong></p>
    </div>
  );
};

export default ApiTest;
