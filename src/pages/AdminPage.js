import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import './AdminPage.css';

const PASSCODE = process.env.REACT_APP_PASSCODE;

const CATEGORIES = [
  { value: 'first-love',    label: '🌹 First Love' },
  { value: 'heartbreak',    label: '💔 Heartbreak' },
  { value: 'long-distance', label: '✈️ Long Distance' },
  { value: 'unrequited',    label: '🕯️ Unrequited' },
  { value: 'self-love',     label: '🪞 Self Love' },
  { value: 'soulmates',     label: '∞ Soulmates' },
];

export default function AdminPage() {
  const [authed, setAuthed]         = useState(false);
  const [input, setInput]           = useState('');
  const [authErr, setAuthErr]       = useState('');
  const [articles, setArticles]     = useState([]);
  const [loading, setLoading]       = useState(false);
  const [tab, setTab]               = useState('pending');
  const [counts, setCounts]         = useState({ pending: 0, approved: 0 });
  const [search, setSearch]         = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm]     = useState({});
  const [saving, setSaving]         = useState(false);
  const [saveMsg, setSaveMsg]       = useState('');
  const [toast, setToast]           = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const fetchArticles = useCallback(async (approvedVal) => {
    setLoading(true);
    const isApproved = approvedVal === 'approved';
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('approved', isApproved)
      .order('created_at', { ascending: false });
    if (!error) setArticles(data || []);
    setLoading(false);
  }, []);

  const fetchCounts = useCallback(async () => {
    const [{ count: pending }, { count: approved }] = await Promise.all([
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('approved', false),
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('approved', true),
    ]);
    setCounts({ pending: pending || 0, approved: approved || 0 });
  }, []);

  useEffect(() => {
    if (authed) {
      fetchArticles(tab);
      fetchCounts();
    }
  }, [authed, tab, fetchArticles, fetchCounts]);

  const login = e => {
    e.preventDefault();
    if (input === PASSCODE) setAuthed(true);
    else setAuthErr('Wrong passcode.');
  };

  const approve = async id => {
    const { error } = await supabase.from('articles').update({ approved: true }).eq('id', id);
    if (!error) {
      setArticles(a => a.filter(x => x.id !== id));
      fetchCounts();
      showToast('Story approved & published ✓');
    }
  };

  const unapprove = async id => {
    const { error } = await supabase.from('articles').update({ approved: false }).eq('id', id);
    if (!error) {
      setArticles(a => a.filter(x => x.id !== id));
      fetchCounts();
      showToast('Story moved back to pending');
    }
  };

  const reject = async id => {
    if (!window.confirm('Delete this story permanently?')) return;
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (!error) {
      setArticles(a => a.filter(x => x.id !== id));
      fetchCounts();
      showToast('Story deleted', 'warn');
    }
  };

  const openEdit = (a, e) => {
    e.stopPropagation();
    setEditTarget(a);
    setEditForm({
      title:    a.title    || '',
      author:   a.author   || '',
      category: a.category || '',
      excerpt:  a.excerpt  || '',
      body:     a.body     || '',
    });
    setSaveMsg('');
  };

  const closeEdit = () => {
    setEditTarget(null);
    setEditForm({});
    setSaveMsg('');
  };

  const handleEditChange = e => {
    setEditForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const saveEdit = async () => {
    if (!editForm.title || !editForm.category || !editForm.body) {
      setSaveMsg('Title, category, and body are required.');
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from('articles')
      .update({
        title:    editForm.title,
        author:   editForm.author,
        category: editForm.category,
        excerpt:  editForm.excerpt,
        body:     editForm.body,
      })
      .eq('id', editTarget.id);
    setSaving(false);
    if (error) {
      setSaveMsg('Save failed: ' + error.message);
    } else {
      setArticles(prev =>
        prev.map(a => a.id === editTarget.id ? { ...a, ...editForm } : a)
      );
      showToast('Changes saved ✓');
      closeEdit();
    }
  };

  const filtered = articles.filter(a => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      a.title?.toLowerCase().includes(q) ||
      a.author?.toLowerCase().includes(q) ||
      a.excerpt?.toLowerCase().includes(q) ||
      a.category?.toLowerCase().includes(q)
    );
  });

  /* ── LOGIN ── */
  if (!authed) {
    return (
      <div className="page-wrapper admin">
        <div className="container">
          <div className="admin__login fade-up">
            <span className="manifesto__label">Admin</span>
            <h2 className="admin__login-title">Editor Access</h2>
            <form className="admin__login-form" onSubmit={login}>
              <input
                type="password"
                placeholder="Enter passcode"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              {authErr && <span className="admin__err">{authErr}</span>}
              <button type="submit" className="btn-primary">Unlock →</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ── EDIT MODAL ── */
  const EditModal = () => (
    <div className="admin-modal-overlay" onClick={closeEdit}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <div className="admin-modal__header">
          <h3 className="admin-modal__title">Edit Story</h3>
          <button className="admin-modal__close" onClick={closeEdit} aria-label="Close">✕</button>
        </div>
        <div className="admin-modal__body">
          <div className="admin-modal__row">
            <div className="admin-modal__group">
              <label>Title <span className="req">*</span></label>
              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                placeholder="Story title"
              />
            </div>
            <div className="admin-modal__group">
              <label>Author</label>
              <input
                name="author"
                value={editForm.author}
                onChange={handleEditChange}
                placeholder="Anonymous"
              />
            </div>
          </div>
          <div className="admin-modal__group">
            <label>Category <span className="req">*</span></label>
            <select name="category" value={editForm.category} onChange={handleEditChange}>
              <option value="">— Choose a theme —</option>
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="admin-modal__group">
            <label>Teaser / Excerpt</label>
            <input
              name="excerpt"
              value={editForm.excerpt}
              onChange={handleEditChange}
              placeholder="A single sentence that captures the feeling"
            />
          </div>
          <div className="admin-modal__group admin-modal__group--full">
            <label>Body <span className="req">*</span></label>
            <textarea
              name="body"
              rows={14}
              value={editForm.body}
              onChange={handleEditChange}
              placeholder="Story body…"
            />
            <span className="admin-modal__charcount">{editForm.body.length} characters</span>
          </div>
          {saveMsg && <p className="admin-modal__err">{saveMsg}</p>}
        </div>
        <div className="admin-modal__footer">
          <button className="btn-ghost admin-btn" onClick={closeEdit}>Cancel</button>
          <button className="btn-primary admin-btn" onClick={saveEdit} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );

  /* ── DASHBOARD ── */
  return (
    <div className="page-wrapper admin">
      {editTarget && <EditModal />}

      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`}>{toast.msg}</div>
      )}

      <div className="container">
        <header className="admin__header fade-up">
          <span className="manifesto__label">Admin Dashboard</span>
          <h1 className="admin__title">Story Review</h1>
          <div className="admin__stats">
            <div className="admin__stat">
              <span className="admin__stat-num">{counts.pending}</span>
              <span className="admin__stat-label">Pending</span>
            </div>
            <div className="admin__stat-divider" />
            <div className="admin__stat">
              <span className="admin__stat-num">{counts.approved}</span>
              <span className="admin__stat-label">Published</span>
            </div>
          </div>
        </header>

        <div className="admin__controls">
          <div className="admin__tabs">
            <button className={`mag-tab ${tab === 'pending'  ? 'active' : ''}`} onClick={() => setTab('pending')}>
              Pending
              {counts.pending > 0 && <span className="admin__badge">{counts.pending}</span>}
            </button>
            <button className={`mag-tab ${tab === 'approved' ? 'active' : ''}`} onClick={() => setTab('approved')}>
              Published
            </button>
          </div>
          <div className="admin__search-wrap">
            <span className="admin__search-icon">⌕</span>
            <input
              className="admin__search"
              type="search"
              placeholder="Search stories…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="admin__search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>
        </div>

        {loading ? (
          <p className="admin__loading">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="admin__empty">
            {search ? `No stories matching "${search}"` : 'Nothing here.'}
          </p>
        ) : (
          <div className="admin__list">
            {filtered.map(a => {
              const isExpanded = expandedId === a.id;
              return (
                <div key={a.id} className={`admin-card ${isExpanded ? 'admin-card--expanded' : ''}`}>
                  <div
                    className="admin-card__top"
                    onClick={() => window.open(`/article/${a.id}`, '_blank')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="admin-card__meta">
                      <span className="category-pill">{a.category}</span>
                      <span className="admin-card__date">
                        {new Date(a.created_at).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="admin-card__title">{a.title}</h3>
                    <p className="admin-card__author">— {a.author || 'Anonymous'}</p>
                    {a.excerpt && <p className="admin-card__excerpt">{a.excerpt}</p>}
                  </div>

                  <button
                    className="admin-card__expand-btn"
                    onClick={e => { e.stopPropagation(); setExpandedId(isExpanded ? null : a.id); }}
                  >
                    <span>{isExpanded ? '▲ Hide body' : '▼ Preview body'}</span>
                    {a.body && (
                      <span className="admin-card__wordcount">
                        {a.body.trim().split(/\s+/).length} words
                      </span>
                    )}
                  </button>

                  {isExpanded && <div className="admin-card__body">{a.body}</div>}

                  <div className="admin-card__actions" onClick={e => e.stopPropagation()}>
                    <button className="admin-btn admin-btn--edit" onClick={e => openEdit(a, e)}>
                      ✎ Edit
                    </button>
                    {tab === 'pending' ? (
                      <>
                        <button className="btn-primary admin-btn" onClick={() => approve(a.id)}>✓ Approve</button>
                        <button className="btn-ghost admin-btn admin-btn--danger" onClick={() => reject(a.id)}>✕ Delete</button>
                      </>
                    ) : (
                      <>
                        <button className="btn-ghost admin-btn" onClick={() => unapprove(a.id)}>↩ Unpublish</button>
                        <button className="btn-ghost admin-btn admin-btn--danger" onClick={() => reject(a.id)}>✕ Delete</button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
