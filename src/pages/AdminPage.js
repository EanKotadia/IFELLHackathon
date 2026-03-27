import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './AdminPage.css';

const PASSCODE = process.env.REACT_APP_PASSCODE;

export default function AdminPage() {
  const [authed, setAuthed]       = useState(false);
  const [input, setInput]         = useState('');
  const [authErr, setAuthErr]     = useState('');
  const [articles, setArticles]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [tab, setTab]             = useState('pending'); // pending | approved

  const login = e => {
    e.preventDefault();
    if (input === PASSCODE) { setAuthed(true); fetchArticles('pending'); }
    else setAuthErr('Wrong passcode.');
  };

  async function fetchArticles(approvedVal) {
    setLoading(true);
    const approved = approvedVal === 'approved';
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('approved', approved)
      .order('created_at', { ascending: false });
    if (!error) setArticles(data || []);
    setLoading(false);
  }

  const switchTab = t => { setTab(t); fetchArticles(t); };

  const approve = async id => {
    await supabase.from('articles').update({ approved: true }).eq('id', id);
    setArticles(a => a.filter(x => x.id !== id));
  };

  const reject = async id => {
    await supabase.from('articles').delete().eq('id', id);
    setArticles(a => a.filter(x => x.id !== id));
  };

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

  return (
    <div className="page-wrapper admin">
      <div className="container">
        <header className="admin__header fade-up">
          <span className="manifesto__label">Admin Dashboard</span>
          <h1 className="admin__title">Story Review</h1>
        </header>

        <div className="admin__tabs">
          <button className={`mag-tab ${tab==='pending'  ? 'active' : ''}`} onClick={()=>switchTab('pending')}>Pending</button>
          <button className={`mag-tab ${tab==='approved' ? 'active' : ''}`} onClick={()=>switchTab('approved')}>Published</button>
        </div>

        {loading && <p className="admin__loading">Loading…</p>}

        {!loading && articles.length === 0 && (
          <p className="admin__empty">Nothing here.</p>
        )}

        <div className="admin__list">
          {articles.map(a => (
            <div key={a.id} className="admin-card">
              <div className="admin-card__meta">
                <span className="category-pill">{a.category}</span>
                <span className="admin-card__date">
                  {new Date(a.created_at).toLocaleDateString()}
                </span>
              </div>
              <h3 className="admin-card__title">{a.title}</h3>
              <p className="admin-card__author">— {a.author || 'Anonymous'}</p>
              {a.excerpt && <p className="admin-card__excerpt">{a.excerpt}</p>}
              <p className="admin-card__body">{a.body}</p>
              {tab === 'pending' && (
                <div className="admin-card__actions">
                  <button className="btn-primary admin-btn" onClick={() => approve(a.id)}>✓ Approve</button>
                  <button className="btn-ghost  admin-btn" onClick={() => reject(a.id)}>✕ Reject</button>
                </div>
              )}
              {tab === 'approved' && (
                <div className="admin-card__actions">
                  <button className="btn-ghost admin-btn" onClick={() => reject(a.id)}>Remove</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
