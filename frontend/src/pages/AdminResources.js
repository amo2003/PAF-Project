import { useState, useEffect } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });
const getAllResources  = ()       => API.get('/resources');
const createResource  = (data)   => API.post('/resources', data);
const deleteResource  = (id)     => API.delete(`/resources/${id}`);

const emptyForm = { name: '', type: 'LECTURE_HALL', capacity: '', location: '', status: 'ACTIVE' };

function AdminResources() {
  const [resources, setResources] = useState([]);
  const [form, setForm]           = useState(emptyForm);
  const [showForm, setShowForm]   = useState(false);
  const [message, setMessage]     = useState('');
  const [loading, setLoading]     = useState(true);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try { const res = await getAllResources(); setResources(res.data); }
    catch { setMessage('Failed to load resources.'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createResource({ ...form, capacity: Number(form.capacity) });
      setMessage('Resource added successfully.');
      setForm(emptyForm); setShowForm(false); fetchAll();
    } catch { setMessage('Failed to add resource.'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resource?')) return;
    try { await deleteResource(id); fetchAll(); }
    catch { setMessage('Failed to delete.'); }
  };

  const statusClass = {
    ACTIVE:         'bg-green-100 text-green-700',
    OUT_OF_SERVICE: 'bg-red-100 text-red-700',
  };

  return (
    <div className="admin-bg min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">Resource Management</h2>
            <p className="text-gray-500 text-sm mt-1">Manage campus facilities and equipment</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm">
            {showForm ? '✕ Close' : '+ Add Resource'}
          </button>
        </div>

        {message && (
          <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm mb-5">{message}</div>
        )}

        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-base font-bold text-gray-700 mb-4">New Resource</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  required placeholder="e.g. Lab A101"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-white">
                  <option value="LECTURE_HALL">Lecture Hall</option>
                  <option value="LAB">Lab</option>
                  <option value="MEETING_ROOM">Meeting Room</option>
                  <option value="EQUIPMENT">Equipment</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Capacity</label>
                <input type="number" value={form.capacity}
                  onChange={e => setForm({ ...form, capacity: e.target.value })}
                  required placeholder="e.g. 30"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Location</label>
                <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                  required placeholder="e.g. Block A"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-white">
                  <option value="ACTIVE">Active</option>
                  <option value="OUT_OF_SERVICE">Out of Service</option>
                </select>
              </div>
              <div className="flex items-end">
                <button type="submit"
                  className="w-full bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm">
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-xl p-16 text-center text-gray-400 flex flex-col items-center gap-3">
            <span className="text-4xl">⏳</span><p>Loading resources...</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-md bg-white">
            <table className="w-full text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  {['ID','Name','Type','Capacity','Location','Status','Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resources.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">No resources found.</td></tr>
                ) : resources.map((r, i) => (
                  <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 border-b border-gray-100">{r.id}</td>
                    <td className="px-4 py-3 border-b border-gray-100 font-medium">{r.name}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{r.type.replace('_', ' ')}</td>
                    <td className="px-4 py-3 border-b border-gray-100 text-center">{r.capacity}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{r.location}</td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusClass[r.status]}`}>
                        {r.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <button onClick={() => handleDelete(r.id)}
                        className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-600 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminResources;
