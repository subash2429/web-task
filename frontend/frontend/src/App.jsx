import { useState, useEffect } from 'react';
import InventoryTable from './components/InventoryTable';
import EditForm from './components/EditForm';
import { getAllItems } from './services/api';
import './styles/App.scss';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getAllItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch inventory items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleSaveEdit = async () => {
    await fetchItems();
    setIsEditMode(false);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading inventory...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Inventory Management </h1>
        <p>Manage your inventory with ease</p>
      </header>

      <main className="app-main">
        {isEditMode ? (
          <EditForm
            items={items}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        ) : (
          <InventoryTable
            items={items}
            onEdit={handleEdit}
            onRefresh={fetchItems}
          />
        )}
      </main>
    </div>
  );
}

export default App;