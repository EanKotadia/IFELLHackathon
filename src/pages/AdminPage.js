import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFullArticle() {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('id', id)
                .single();

            if (!error) setArticle(data);
            setLoading(false);
        }
        fetchFullArticle();
    }, [id]);

    if (loading) return <div className="loader">Loading...</div>;
    if (!article) return <div className="error">Story not found.</div>;

    return (
        <div className="page-wrapper">
            <div className="container" style={{ maxWidth: '700px', marginTop: '100px' }}>
                <span className="category-pill">{article.category}</span>
                <h1 style={{ fontSize: '3rem', margin: '20px 0' }}>{article.title}</h1>
                <p style={{ fontStyle: 'italic', marginBottom: '40px' }}>By {article.author || 'Anonymous'}</p>

                {/* pre-wrap ensures line breaks from the database show up */}
                <div className="article-body" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '1.2rem' }}>
                    {article.body}
                </div>
            </div>
        </div>
    );
}