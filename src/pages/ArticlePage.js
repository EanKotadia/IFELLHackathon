import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getArticle() {
            const { data } = await supabase
                .from('articles')
                .select('*')
                .eq('id', id)
                .single();
            if (data) setArticle(data);
            setLoading(false);
        }
        getArticle();
    }, [id]);

    if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Loading...</div>;
    if (!article) return <div style={{padding: '100px', textAlign: 'center'}}>Story not found.</div>;

    return (
        <div className="page-wrapper" style={{padding: '120px 20px', maxWidth: '800px', margin: '0 auto'}}>
            <span className="category-pill">{article.category}</span>
            <h1 style={{fontSize: '3rem', margin: '20px 0'}}>{article.title}</h1>
            <p>By {article.author || 'Anonymous'}</p>
            <hr style={{margin: '40px 0', opacity: 0.1}} />
            <div style={{whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '1.2rem'}}>
                {article.body}
            </div>
        </div>
    );
}