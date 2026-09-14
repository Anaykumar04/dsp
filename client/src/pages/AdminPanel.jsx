import React, { useState } from 'react';
import {
  ShieldCheck, Users, BookOpen, Plus, Trash2, Edit3,
  Eye, EyeOff, Save, X, Search, Key,
  AlertTriangle, CheckCircle, UserPlus
} from 'lucide-react';
import { ADMIN_CONFIG } from '../config/adminConfig';
import { usersAPI, schemesAPI } from '../api/client';

const { theme: THEME } = ADMIN_CONFIG;

const SCHEME_CATEGORIES = ['GRANT', 'GRANT-DEBT-EQUITY', 'DEBT EQUITY', 'EQUITY', 'LOAN ONLY', 'LOAN SUBSIDY', 'CERTGEM'];
const EMPTY_SCHEME = {
  name: '', category: 'GRANT', status: 'Active', organization: '',
  type: 'Government Scheme', lastDate: 'Rolling basis', minCharge: '',
  applicableFor: 'Pan India', location: 'Pan India', portalLink: '',
  maxFunding: '', tags: [],
  isNew: false,
  benefits: [''], eligibility: [''],
  focusSectors: [], industrySectors: [], companyTypes: [],
};

// ── Toast ────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
      ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

// ── Confirm Dialog ───────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <div>
            <p className="font-bold text-gray-800">Confirm Delete</p>
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2 rounded-lg bg-red-600 text-sm font-bold text-white hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  SCHEME MANAGEMENT
// ════════════════════════════════════════════════════════════════
function SchemeManager({ schemes, setSchemes, showToast }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('ALL');
  const [editScheme, setEditScheme] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [form, setForm] = useState(EMPTY_SCHEME);
  const [saving, setSaving] = useState(false);

  const filtered = schemes.filter(s => {
    const matchCat = filterCat === 'ALL' || s.category === filterCat;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.organization?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openAdd = () => { setForm({ ...EMPTY_SCHEME }); setIsAdding(true); setEditScheme(null); };
  // FIX: populate form with all scheme fields on edit
  const openEdit = (s) => { setForm({ ...EMPTY_SCHEME, ...s }); setEditScheme(s); setIsAdding(false); };
  const closeForm = () => { setIsAdding(false); setEditScheme(null); };

  const saveScheme = async () => {
    if (!form.name.trim()) return showToast('Scheme name is required', 'error');
    setSaving(true);
    try {
      if (isAdding) {
        const res = await schemesAPI.create({
          ...form,
          benefits:    form.benefits.filter(Boolean),
          eligibility: form.eligibility.filter(Boolean),
        });
        // Bug 4 fix: normalise response — server returns {success, data}, request() returns that object so res.data is the scheme
        const created = res.data || res;
        setSchemes(prev => [...prev, created]);
        showToast(`"${created.name}" added successfully`, 'success');
        // Fire bell notification
        window.dispatchEvent(new CustomEvent('scheme-notification', {
          detail: {
            title: 'New Scheme Added',
            message: `${created.name} is now available${created.organization ? ' from ' + created.organization : ''}.`,
            icon: 'PlusCircle',
            color: '#16a34a',
            bg: '#f0fdf4',
          }
        }));
      } else {
        // FIX: use _id (MongoDB) — schemes from DB have _id, not id
        const schemeId = editScheme._id || editScheme.id;
        const res = await schemesAPI.update(schemeId, {
          ...form,
          benefits:    form.benefits.filter(Boolean),
          eligibility: form.eligibility.filter(Boolean),
        });
        // Bug 4 fix: normalise response
        const updated = res.data || res;
        setSchemes(prev => prev.map(s =>
          (s._id || s.id)?.toString() === schemeId?.toString() ? updated : s
        ));
        showToast(`"${updated.name}" updated successfully`, 'success');
        // Fire bell notification for update
        window.dispatchEvent(new CustomEvent('scheme-notification', {
          detail: {
            title: 'Scheme Updated',
            message: `${updated.name} has been updated with the latest information.`,
            icon: 'RefreshCw',
            color: '#0284c7',
            bg: '#f0f9ff',
          }
        }));
      }
      closeForm();
    } catch (err) {
      showToast(err.message || 'Failed to save scheme', 'error');
    } finally {
      setSaving(false);
    }
  };

  const deleteScheme = async (id) => {
    const s = schemes.find(x => (x._id || x.id)?.toString() === id?.toString());
    // Bug 3 fix: local/fallback schemes have numeric ids — only hit the API for real MongoDB ObjectIds
    const isMongoId = /^[a-f\d]{24}$/i.test(id);
    if (!isMongoId) {
      setSchemes(prev => prev.filter(x => (x._id || x.id)?.toString() !== id?.toString()));
      showToast(`"${s?.name}" removed (local only — not in DB)`, 'success');
      setConfirmDelete(null);
      return;
    }
    try {
      await schemesAPI.delete(id);
      setSchemes(prev => prev.filter(x => (x._id || x.id)?.toString() !== id?.toString()));
      showToast(`"${s?.name}" deleted`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete scheme', 'error');
    }
    setConfirmDelete(null);
  };

  const updateList = (field, idx, val) => {
    const arr = [...form[field]];
    arr[idx] = val;
    setForm({ ...form, [field]: arr });
  };
  const addListItem    = (field) => setForm({ ...form, [field]: [...form[field], ''] });
  const removeListItem = (field, idx) => {
    if (form[field].length === 1) {
      // Bug 7 fix: can't remove the last row — clear its value instead so the field stays usable
      const arr = [...form[field]];
      arr[0] = '';
      setForm({ ...form, [field]: arr });
    } else {
      setForm({ ...form, [field]: form[field].filter((_, i) => i !== idx) });
    }
  };

  const showForm = isAdding || !!editScheme;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Scheme Management</h2>
          <p className="text-xs text-gray-500 mt-0.5">{schemes.length} total schemes</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
          style={{ background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryLight})` }}>
          <Plus size={15} /> Add Scheme
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search schemes..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#fdcf00]" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none">
          <option value="ALL">All Categories</option>
          {SCHEME_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Scheme</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Category</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Max Funding</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="text-center py-10 text-gray-400 text-sm">No schemes found</td></tr>
              )}
              {filtered.map(s => {
                const schemeKey = (s._id || s.id)?.toString();
                return (
                  <tr key={schemeKey} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[200px]">{s.organization}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#e8effe] text-[#1a5dfe]">{s.category}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{s.maxFunding || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold
                        ${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(s)}
                          className="p-1.5 rounded-lg text-[#1a5dfe] hover:bg-[#e8effe] transition-colors">
                          <Edit3 size={15} />
                        </button>
                        <button onClick={() => setConfirmDelete(schemeKey)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Form Drawer */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10"
              style={{ borderTop: `3px solid ${THEME.accent}` }}>
              <div>
                <h3 className="font-bold text-gray-800">{isAdding ? 'Add New Scheme' : `Edit: ${editScheme?.name}`}</h3>
                <p className="text-xs text-gray-400">Fill in the scheme details below</p>
              </div>
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>

            <div className="px-6 py-5 flex-1 space-y-4">
              <Field label="Scheme Name *">
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="input-field" placeholder="e.g. TIDE 2.0" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Category">
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field">
                    {SCHEME_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Status">
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="input-field">
                    <option>Active</option><option>Closed</option><option>Upcoming</option>
                  </select>
                </Field>
              </div>
              <Field label="Organization">
                <input value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })}
                  className="input-field" placeholder="e.g. Ministry of Finance" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Max Funding">
                  <input value={form.maxFunding} onChange={e => setForm({ ...form, maxFunding: e.target.value })}
                    className="input-field" placeholder="₹10 Lakhs" />
                </Field>
                <Field label="Min Charge">
                  <input value={form.minCharge} onChange={e => setForm({ ...form, minCharge: e.target.value })}
                    className="input-field" placeholder="INR 10,000 + 18% GST" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Last Date">
                  <input value={form.lastDate} onChange={e => setForm({ ...form, lastDate: e.target.value })}
                    className="input-field" placeholder="Rolling basis" />
                </Field>
                <Field label="Location">
                  <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                    className="input-field" placeholder="Pan India" />
                </Field>
              </div>
              <Field label="Portal Link (URL — leave blank if not available)">
                <input value={form.portalLink} onChange={e => setForm({ ...form, portalLink: e.target.value })}
                  className="input-field" placeholder="https://www.example.gov.in/scheme" />
                {form.portalLink && form.portalLink !== '#' && (
                  <p className="text-[11px] text-green-600 mt-1 flex items-center gap-1">
                    ✓ Link will be clickable on scheme detail page
                  </p>
                )}
              </Field>
              <Field label="Tags (comma separated)">
                <input value={form.tags?.join(', ')} onChange={e => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                  className="input-field" placeholder="hot, easy, early" />
              </Field>

              <Field label="Recently Added">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setForm({ ...form, isNew: !form.isNew })}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${form.isNew ? 'bg-[#1a5dfe]' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isNew ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                  <span className="text-sm">
                    {form.isNew
                      ? <span className="font-semibold text-[#1a5dfe]">✅ Will appear in Funding Opportunities</span>
                      : <span className="text-gray-400">Not shown in Funding Opportunities</span>}
                  </span>
                </label>
              </Field>

              <ListField label="Benefits" items={form.benefits}
                onChange={(i, v) => updateList('benefits', i, v)}
                onAdd={() => addListItem('benefits')}
                onRemove={(i) => removeListItem('benefits', i)}
                placeholder="e.g. Non-refundable Grant up to INR 7 Lakh" />

              <ListField label="Eligibility Criteria" items={form.eligibility}
                onChange={(i, v) => updateList('eligibility', i, v)}
                onAdd={() => addListItem('eligibility')}
                onRemove={(i) => removeListItem('eligibility', i)}
                placeholder="e.g. Startup registered as Pvt Ltd" />
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex gap-3 sticky bottom-0 bg-white">
              <button onClick={closeForm} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={saveScheme} disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: saving ? '#9ca3af' : `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryLight})` }}>
                <Save size={14} /> {saving ? 'Saving…' : isAdding ? 'Add Scheme' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <ConfirmDialog
          message="This scheme will be permanently deleted."
          onConfirm={() => deleteScheme(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  USER MANAGEMENT
// ════════════════════════════════════════════════════════════════
function UserManager({ users, setUsers, currentUserEmail, showToast }) {
  const [showForm, setShowForm]         = useState(false);
  const [editUser, setEditUser]         = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showPassFor, setShowPassFor]   = useState({});
  // Bug 5 fix: clear revealed passwords whenever the users list size changes (add/delete)
  const prevUsersLenRef = React.useRef(users.length);
  React.useEffect(() => {
    if (users.length !== prevUsersLenRef.current) {
      setShowPassFor({});
      prevUsersLenRef.current = users.length;
    }
  }, [users.length]);
  const [form, setForm]                 = useState({ name: '', email: '', password: '', role: 'user' });
  // FIX: separate field for changing password during edit
  const [newPassword, setNewPassword]   = useState('');
  const [formError, setFormError]       = useState('');
  const [saving, setSaving]             = useState(false);

  const openAdd = () => {
    setForm({ name: '', email: '', password: '', role: 'user' });
    setNewPassword('');
    setEditUser(null);
    setFormError('');
    setShowForm(true);
  };
  const openEdit = (u) => {
    setForm({ name: u.name, email: u.email, role: u.role, password: '' });
    setNewPassword('');
    setEditUser(u);
    setFormError('');
    setShowForm(true);
  };
  // Bug 6 fix: always clear formError on close so stale errors don't flash on reopen
  const closeForm = () => { setShowForm(false); setEditUser(null); setNewPassword(''); setFormError(''); };

  const saveUser = async () => {
    if (!form.name.trim())  return setFormError('Name is required');
    if (!form.email.trim()) return setFormError('Email is required');
    if (!editUser && !form.password.trim()) return setFormError('Password is required for new users');
    if (!editUser && form.password.length < 6) return setFormError('Password must be at least 6 characters');
    // FIX: validate new password length if admin chose to set one during edit
    if (editUser && newPassword && newPassword.length < 6) return setFormError('New password must be at least 6 characters');

    setSaving(true);
    try {
      if (!editUser) {
        // CREATE
        const res = await usersAPI.create({
          name:     form.name.trim(),
          email:    form.email.trim().toLowerCase(),
          password: form.password,
          role:     form.role,
        });
        // Bug 4 fix: normalise response shape
        const created = res.data || res;
        setUsers(prev => [...prev, created]);
        showToast(`User "${created.name}" created successfully`, 'success');
      } else {
        // UPDATE name/role
        const userId = editUser._id || editUser.id;
        const res = await usersAPI.update(userId, {
          name: form.name.trim(),
          role: form.role,
        });
        // Bug 2 fix: merge into existing user object so plainPassword (not returned by PUT) is preserved
        setUsers(prev => prev.map(u => {
          if ((u._id || u.id)?.toString() !== userId?.toString()) return u;
          return { ...u, ...res.data, plainPassword: res.data.plainPassword?.trim() || u.plainPassword };
        }));
        showToast(`User "${res.data.name}" updated`, 'success');

        // FIX: if admin also set a new password, change it via separate endpoint
        if (newPassword) {
          await usersAPI.changePassword(userId, newPassword);
          // Bug 2 fix: also update plainPassword in local state after password change
          setUsers(prev => prev.map(u =>
            (u._id || u.id)?.toString() === userId?.toString()
              ? { ...u, plainPassword: newPassword }
              : u
          ));
          showToast('Password changed successfully', 'success');
        }
      }
      setShowForm(false);
      setFormError('');
    } catch (err) {
      setFormError(err.message || 'Failed to save user. Is the backend running?');
    } finally {
      setSaving(false);
    }
  };

  const deleteUser = async (userId) => {
    const u = users.find(x => (x._id || x.id)?.toString() === userId?.toString());
    try {
      await usersAPI.delete(userId);
      setUsers(prev => prev.filter(x => (x._id || x.id)?.toString() !== userId?.toString()));
      showToast(`"${u?.name}" removed`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete user', 'error');
    }
    setConfirmDelete(null);
  };

  const toggleActive = async (u) => {
    const userId = (u._id || u.id)?.toString();
    const newStatus = !u.isActive;
    try {
      await usersAPI.toggleStatus(userId, newStatus);
      setUsers(prev => prev.map(x =>
        (x._id || x.id)?.toString() === userId ? { ...x, isActive: newStatus } : x
      ));
      showToast(`"${u.name}" ${newStatus ? 'activated' : 'deactivated'}`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  // Track inline "record password" input per user
  const [recordPassFor, setRecordPassFor] = useState({});
  const [recordPassVal, setRecordPassVal] = useState({});
  const [recordSaving, setRecordSaving]   = useState({});

  const submitRecordPass = async (userId) => {
    const val = (recordPassVal[userId] || '').trim();
    if (!val) return;
    setRecordSaving(p => ({ ...p, [userId]: true }));
    try {
      const res = await usersAPI.recordPlainPassword(userId, val);
      const updated = res.data || res;
      setUsers(prev => prev.map(u =>
        (u._id || u.id)?.toString() === userId ? { ...u, plainPassword: updated.plainPassword?.trim() || val } : u
      ));
      setRecordPassFor(p => ({ ...p, [userId]: false }));
      setRecordPassVal(p => ({ ...p, [userId]: '' }));
      showToast('Password recorded successfully', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to record password', 'error');
    } finally {
      setRecordSaving(p => ({ ...p, [userId]: false }));
    }
  };

  // Toggle visibility by user _id string (stable key)
  const toggleShowPass = (userId) =>
    setShowPassFor(p => ({ ...p, [userId]: !p[userId] }));

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-800">User Management</h2>
          <p className="text-xs text-gray-500 mt-0.5">{users.length} users registered</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg"
          style={{ background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryLight})` }}>
          <UserPlus size={15} /> Create User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">User</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Role</th>
              {/* FIX: password column header now reflects what it shows */}
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Password</th>
              <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr><td colSpan={4} className="text-center py-10 text-gray-400 text-sm">No users found</td></tr>
            )}
            {users.map(u => {
              // FIX: use _id as stable key (DB users don't expose password to client)
              const userId = (u._id || u.id)?.toString();
              return (
                <tr key={userId} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${!u.isActive ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: u.role === 'admin' ? THEME.primary : '#fdcf00' }}>
                        {u.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{u.name}
                          {u.email === currentUserEmail && <span className="ml-1.5 text-[10px] text-green-600 font-bold">(you)</span>}
                          {!u.isActive && <span className="ml-1.5 text-[10px] text-red-500 font-bold">(inactive)</span>}
                        </p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase"
                      style={u.role === 'admin'
                        ? { background: '#e8effe', color: THEME.primary }
                        : { background: '#fff9cc', color: '#7a5e00' }}>
                      {u.role === 'admin' ? '🛡 Admin' : '👤 User'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {/* Case 1: plainPassword exists and is non-empty — show/hide toggle */}
                    {u.plainPassword?.trim() ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">
                          {showPassFor[userId] ? u.plainPassword : '••••••••'}
                        </span>
                        <button onClick={() => toggleShowPass(userId)} className="text-gray-400 hover:text-gray-600">
                          {showPassFor[userId] ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                    ) : recordPassFor[userId] ? (
                      /* Case 2: no password stored, inline record input open */
                      <div className="flex items-center gap-1.5">
                        <input
                          autoFocus
                          value={recordPassVal[userId] || ''}
                          onChange={e => setRecordPassVal(p => ({ ...p, [userId]: e.target.value }))}
                          onKeyDown={e => { if (e.key === 'Enter') submitRecordPass(userId); if (e.key === 'Escape') setRecordPassFor(p => ({ ...p, [userId]: false })); }}
                          placeholder="type password…"
                          className="input-field font-mono text-xs py-1 px-2 w-28"
                        />
                        <button
                          onClick={() => submitRecordPass(userId)}
                          disabled={recordSaving[userId]}
                          className="p-1.5 rounded-lg text-white text-[11px] font-bold disabled:opacity-50"
                          style={{ background: THEME.primary }}>
                          {recordSaving[userId] ? '…' : <Save size={12} />}
                        </button>
                        <button onClick={() => setRecordPassFor(p => ({ ...p, [userId]: false }))}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      /* Case 3: no password stored, show prompt to record it */
                      <button
                        onClick={() => setRecordPassFor(p => ({ ...p, [userId]: true }))}
                        className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg hover:bg-amber-100 transition-colors">
                        <Key size={11} /> Record password
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(u)} title="Edit / Change Password"
                        className="p-1.5 rounded-lg text-[#1a5dfe] hover:bg-[#e8effe] transition-colors">
                        <Edit3 size={15} />
                      </button>
                      {u.email !== currentUserEmail && (
                        <button
                          onClick={() => toggleActive(u)}
                          title={u.isActive ? 'Deactivate user' : 'Activate user'}
                          className={`p-1.5 rounded-lg transition-colors text-xs font-bold
                            ${u.isActive ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`}>
                          {u.isActive ? '⏸' : '▶'}
                        </button>
                      )}
                      <button
                        onClick={() => u.email !== currentUserEmail && setConfirmDelete(userId)}
                        disabled={u.email === currentUserEmail}
                        title={u.email === currentUserEmail ? "Can't delete yourself" : "Delete user"}
                        className={`p-1.5 rounded-lg transition-colors
                          ${u.email === currentUserEmail ? 'text-gray-300 cursor-not-allowed' : 'text-red-500 hover:bg-red-50'}`}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between"
              style={{ borderTop: `3px solid ${THEME.accent}` }}>
              <div>
                <h3 className="font-bold text-gray-800">{editUser ? `Edit User: ${editUser.name}` : 'Create New User'}</h3>
                <p className="text-xs text-gray-400">{editUser ? 'Update details or change password' : 'Fill in user credentials'}</p>
              </div>
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <Field label="Full Name">
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="input-field" placeholder="e.g. Rahul Sharma" />
              </Field>
              <Field label="Email Address">
                {/* FIX: disable email field during edit (backend doesn't support email change via PUT) */}
                <input value={form.email} onChange={e => !editUser && setForm({ ...form, email: e.target.value })}
                  type="email" className={`input-field ${editUser ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="user@example.com" readOnly={!!editUser} />
                {editUser && <p className="text-[11px] text-gray-400 mt-1">Email cannot be changed after creation</p>}
              </Field>

              {/* FIX: show password field on create; show "new password" field on edit */}
              {!editUser ? (
                <Field label="Password">
                  <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                    type="text" className="input-field font-mono" placeholder="min 6 characters" />
                </Field>
              ) : (
                <Field label="New Password (leave blank to keep current)">
                  <div className="relative">
                    <Key size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={newPassword} onChange={e => setNewPassword(e.target.value)}
                      type="text" className="input-field font-mono pl-8" placeholder="Leave blank to keep unchanged" />
                  </div>
                </Field>
              )}

              <Field label="Role">
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="input-field">
                  <option value="user">👤 User — Read-only access</option>
                  <option value="admin">🛡 Admin — Full access</option>
                </select>
              </Field>
              {formError && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 text-xs font-medium px-3 py-2 rounded-lg border border-red-100">
                  <AlertTriangle size={13} /> {formError}
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
              <button onClick={closeForm} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={saveUser} disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: saving ? '#9ca3af' : `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryLight})` }}>
                <Save size={14} /> {saving ? 'Saving…' : editUser ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <ConfirmDialog
          message="This user will be permanently removed."
          onConfirm={() => deleteUser(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}

// ── Small helper components ──────────────────────────────────────
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function ListField({ label, items, onChange, onAdd, onRemove, placeholder }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">{label}</label>
        <button onClick={onAdd} className="flex items-center gap-1 text-xs text-[#1a5dfe] font-medium hover:underline">
          <Plus size={12} /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input value={item} onChange={e => onChange(i, e.target.value)}
              className="input-field flex-1" placeholder={placeholder} />
            <button onClick={() => onRemove(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  MAIN ADMIN PANEL
// ════════════════════════════════════════════════════════════════
export default function AdminPanel({ currentUser, schemes, setSchemes, users: rawUsers, setUsers }) {
  const users = rawUsers || [];
  const [activeTab, setActiveTab] = useState('schemes');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="page-transition">
      <div className="mb-6 p-5 rounded-2xl text-white"
        style={{ background: `linear-gradient(135deg, ${THEME.primary} 0%, ${THEME.primaryLight} 100%)` }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Admin Panel</h1>
            <p className="text-sm text-white/70">Manage schemes and users • Logged in as {currentUser?.name}</p>
          </div>
        </div>
      </div>

      <div className="flex mb-6 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <button
          onClick={() => setActiveTab('schemes')}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-bold transition-all border-r border-gray-200"
          style={activeTab === 'schemes'
            ? { background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryLight})`, color: 'white' }
            : { color: '#6b7280' }}>
          <BookOpen size={16} />
          Scheme Management
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={activeTab === 'schemes'
              ? { background: 'rgba(255,255,255,0.2)', color: 'white' }
              : { background: '#f3f4f6', color: '#6b7280' }}>
            {schemes.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-bold transition-all"
          style={activeTab === 'users'
            ? { background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryLight})`, color: 'white' }
            : { color: '#6b7280' }}>
          <Users size={16} />
          User Management
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={activeTab === 'users'
              ? { background: 'rgba(255,255,255,0.2)', color: 'white' }
              : { background: '#f3f4f6', color: '#6b7280' }}>
            {users.length}
          </span>
        </button>
      </div>

      {activeTab === 'schemes' && (
        <SchemeManager schemes={schemes} setSchemes={setSchemes} showToast={showToast} />
      )}
      {activeTab === 'users' && (
        <UserManager users={users} setUsers={setUsers} currentUserEmail={currentUser?.email} showToast={showToast} />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.6rem 0.85rem;
          border-radius: 0.6rem;
          border: 1px solid #e5e7eb;
          background: #f6f8fb;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .input-field:focus { border-color: #fdcf00; }
        select.input-field { appearance: auto; }
      `}</style>
    </div>
  );
}