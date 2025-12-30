import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);
  
  // 1. State for the form inputs
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
    type: 'EXPENSE' // Default value
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Send data to Spring Boot
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/transactions', formData);
      alert("Transaction added!");
      setFormData({ description: '', amount: '', category: '', date: '', type: 'EXPENSE' }); // Clear form
      fetchTransactions(); // Refresh the list
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Smart Finance Tracker</h1>

      {/* --- ADD TRANSACTION FORM --- */}
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd' }}>
        <h3>Add New Transaction</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input name="amount" type="number" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
          <input name="category" placeholder="Category (e.g. Food)" value={formData.category} onChange={handleChange} required />
          <input name="date" type="date" value={formData.date} onChange={handleChange} required />
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
          <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
            Add Transaction
          </button>
        </form>
      </section>

      {/* --- TRANSACTION LIST --- */}
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.description}</td>
              <td style={{ color: t.type === 'EXPENSE' ? 'red' : 'green' }}>
                {t.type === 'EXPENSE' ? '-' : '+'}${t.amount}
              </td>
              <td>{t.category}</td>
              <td>{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;