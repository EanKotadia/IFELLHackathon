import React from 'react';
import './ArticleCard.css';

const CATEGORY_LABELS = {
  'first-love':    'First Love',
  'heartbreak':    'Heartbreak',
  'long-distance': 'Long Distance',
  'unrequited':    'Unrequited',
  'self-love':     'Self Love',
  'soulmates':     'Soulmates',
};

export default function ArticleCard({ article }) {
  const { title, excerpt, author, category, created_at } = article;
  const label = CATEGORY_LABELS[category] || category;
  const date = created_at
    ? new Date(created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <article className="card">
      <div className="card__top">
        <span className="category-pill">{label}</span>
      </div>
      <h3 className="card__title">{title}</h3>
      {excerpt && <p className="card__excerpt">{excerpt}</p>}
      <div className="card__meta">
        <span className="card__author">— {author || 'Anonymous'}</span>
        {date && <span className="card__date">{date}</span>}
      </div>
    </article>
  );
}
