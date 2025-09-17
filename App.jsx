import { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';

function App() {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePreview = (invoiceData) => {
    setPreviewData(invoiceData);
  };

  const handleSubmit = async (invoiceData) => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:3001/api/generate-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage('Invoice generated and sent successfully!');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const closePreview = () => {
    setPreviewData(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Invoice Generator</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message}
          </div>
        )}

        {loading && (
          <div className="mb-6 p-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
            Generating and sending invoice...
          </div>
        )}

        <InvoiceForm onSubmit={handleSubmit} onPreview={handlePreview} />
        
        {previewData && (
          <InvoicePreview invoiceData={previewData} onClose={closePreview} />
        )}
      </main>
    </div>
  );
}

export default App;
