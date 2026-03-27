import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import './AdminPage.css';

const PASSCODE = process.env.REACT_APP_PASSCODE;

export default function AdminPage() {
    const [authed, setAuthed]       = useState(false);
    const [input, setInput]         = useState('');
    const [authErr, setAuthErr]     = useState('');
    const [articles, setArticles]   = useState([]);
    const [loading, setLoading]     = useState(false);
    const [tab, setTab]             = useState('pending');

    const fetchArticles = useCallback(async (approvedVal) => {
        setLoading(true);
        const isApproved = approvedVal === 'approved';

        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('approved', isApproved)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Fetch error:", error.message);
        } else {
            setArticles(data || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (authed) {
            fetchArticles(tab);
        }
    }, [authed, tab, fetchArticles]);

    const login = e => {
        e.preventDefault();
        if (input === PASSCODE) {
            setAuthed(true);
        } else {
            setAuthErr('Wrong passcode.');
        }
    };

    const approve = async id => {
        const { error } = await supabase.from('articles').update({ approved: true }).eq('id', id);
        if (!error) setArticles(a => a.filter(x => x.id !== id));
    };

    const reject = async id => {
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (!error) setArticles(a => a.filter(x => x.id !== id));
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
                    <button className={`mag-tab ${tab==='pending'  ? 'active' : ''}`} onClick={()=>setTab('pending')}>Pending</button>
                    <button className={`mag-tab ${tab==='approved' ? 'active' : ''}`} onClick={()=>setTab('approved')}>Published</button>
                </div>

                {loading ? (
                    <p className="admin__loading">Loading…</p>
                ) : articles.length === 0 ? (
                    <p className="admin__empty">Nothing here.</p>
                ) : (
                    <div className="admin__list">
                        {articles.map(a => (
                            <div
                                key={a.id}
                                className="admin-card"
                                /* 1. Opens the full article in a new tab */
                                onClick={() => window.open(`/article/${a.id}`, '_blank')}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="admin-card__meta">
                                    <span className="category-pill">{a.category}</span>
                                    <span className="admin-card__date">
                                        {new Date(a.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="admin-card__title">{a.title}</h3>
                                <p className="admin-card__author">— {a.author || 'Anonymous'}</p>

                                <div className="admin-card__content">
                                    <p className="admin-card__excerpt">{a.excerpt}</p>
                                </div>

                                {/* 2. STOP PROPAGATION is vital so the new tab doesn't open when clicking buttons */}
                                <div className="admin-card__actions" onClick={(e) => e.stopPropagation()}>
                                    {tab === 'pending' ? (
                                        <>
                                            <button className="btn-primary admin-btn" onClick={() => approve(a.id)}>✓ Approve</button>
                                            <button className="btn-ghost admin-btn" onClick={() => reject(a.id)}>✕ Reject</button>
                                        </>
                                    ) : (
                                        <button className="btn-ghost admin-btn" onClick={() => reject(a.id)}>Remove</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}