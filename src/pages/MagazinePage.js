import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ArticleCard from '../components/ArticleCard';
import './MagazinePage.css';

const CATEGORIES = [
  { key: 'all',          label: 'All Stories' },
  { key: 'first-love',   label: 'First Love' },
  { key: 'heartbreak',   label: 'Heartbreak' },
  { key: 'long-distance',label: 'Long Distance' },
  { key: 'unrequited',   label: 'Unrequited' },
  { key: 'self-love',    label: 'Self Love' },
  { key: 'soulmates',    label: 'Soulmates' },
];

export default function MagazinePage() {
  const [articles, setArticles]     = useState([]);
  const [filtered, setFiltered]     = useState([]);
  const [activeTab, setActiveTab]   = useState('all');
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (activeTab === 'all') {
      setFiltered(articles);
    } else {
      setFiltered(articles.filter(a => a.category === activeTab));
    }
  }, [activeTab, articles]);

  async function fetchArticles() {
    setLoading(true);
    try {
      const { data, error: err } = await supabase
        .from('articles')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });
      if (err) throw err;
      setArticles(data || []);
      setFiltered(data || []);
    } catch (e) {
      setError('Could not load stories. Please check your Supabase connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper magazine">
      <div className="container">

        <header className="mag-header fade-up">
          <span className="manifesto__label">Stories</span>
          <h1 className="mag-title">Love, in every form.</h1>
          <p className="mag-subtitle">
            Real stories from real people. Curated with care.
          </p>
        </header>

        {/* Category tabs */}
        <div className="mag-tabs fade-up">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              className={`mag-tab ${activeTab === cat.key ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading && (
          <div className="mag-state">
            <div className="pulse-dots">
              <span /><span /><span />
            </div>
            <p>Loading stories…</p>
          </div>
        )}

        {error && !loading && (
          <div className="mag-state mag-state--error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="mag-state">
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '48px' }}>♥</p>
            <p>No stories here yet. Be the first to share.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="mag-grid">
            {filtered.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
