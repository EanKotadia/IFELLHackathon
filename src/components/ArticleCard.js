import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import './ArticleCard.css';

export default function ArticleCard({ article }) {
    const { id, title, excerpt, author, category } = article;

    return (
        /* Wrap the whole thing in a Link */
        <Link to={`/article/${id}`} className="article-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
            <article className="card">
                <div className="card__top">
                    <span className="category-pill">{category}</span>
                </div>
                <h3 className="card__title">{title}</h3>
                <p className="card__excerpt">{excerpt}</p>
                <div className="card__meta">
                    <span className="card__author">— {author || 'Anonymous'}</span>
                </div>
            </article>
        </Link>
    );
}