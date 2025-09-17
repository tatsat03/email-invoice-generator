const InvoicePreview = ({ invoiceData, onClose }) => {
  if (!invoiceData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Invoice Preview</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* Invoice Content - Meha Gupta Style */}
          <div className="bg-white border p-8 text-sm">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <div className="font-bold text-base mb-2">{invoiceData.companyName || 'Meha Gupta'}</div>
                <div className="text-sm leading-relaxed">
                  <div>A 301,</div>
                  <div>Hinduja Lake Front Estate,</div>
                  <div>Opp Hulimavu Police Station,</div>
                  <div>Bannerghatta Road,</div>
                  <div>Bangalore – 560 076</div>
                  <div>Phone: 098801 34700 / 097409 05050</div>
                  <div>FSSAI No. 21218192000229</div>
                  <div className="text-blue-600">https://www.facebook.com/EatNTreatBlr/</div>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold mb-4">INVOICE</h1>
                <div className="text-sm">
                  <div>INVOICE # {invoiceData.invoiceNumber}</div>
                  <div>DATE: {new Date(invoiceData.date).toLocaleDateString('en-GB')}</div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-6">
              <div className="font-bold mb-1">TO:</div>
              <div className="mb-4">
                <div>{invoiceData.customerName}</div>
                <div>{invoiceData.customerEmail}</div>
                <div>{invoiceData.customerPhone}</div>
              </div>
              <div><strong>COMMENTS OR SPECIAL INSTRUCTIONS:</strong> NA</div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <table className="w-full border-collapse border-2 border-black">
                <thead>
                  <tr>
                    <th className="border-2 border-black p-2 text-center font-bold">QUANTITY</th>
                    <th className="border-2 border-black p-2 text-center font-bold">DESCRIPTION</th>
                    <th className="border-2 border-black p-2 text-center font-bold">UNIT PRICE</th>
                    <th className="border-2 border-black p-2 text-center font-bold">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-black p-2 text-center">{item.quantity}kg</td>
                      <td className="border border-black p-2 text-left">{item.description}</td>
                      <td className="border border-black p-2 text-center">{item.price}(kg)</td>
                      <td className="border border-black p-2 text-center">{(item.quantity * item.price).toFixed(0)}</td>
                    </tr>
                  ))}
                  {/* Empty rows for spacing */}
                  {[...Array(Math.max(0, 3 - invoiceData.items.length))].map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="border border-black p-4">&nbsp;</td>
                      <td className="border border-black p-4">&nbsp;</td>
                      <td className="border border-black p-4">&nbsp;</td>
                      <td className="border border-black p-4">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="text-right mb-6">
              <table className="ml-auto border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-black p-2 font-bold">SUBTOTAL</td>
                    <td className="border border-black p-2 font-bold">{new Intl.NumberFormat('en-IN').format(invoiceData.subtotal)}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">TOTAL AMOUNT DUE</td>
                    <td className="border border-black p-2 font-bold">{new Intl.NumberFormat('en-IN').format(invoiceData.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="text-center text-sm">
              <div className="mb-3">All Unit Price and Total Amount are in INDIAN RUPEES</div>
              <div className="mb-3">If you have any questions regarding this invoice, kindly contact eatntreatschef@gmail.com</div>
              <div className="font-bold">Thank you for your business!</div>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-6 text-center border-t pt-4">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-semibold"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;