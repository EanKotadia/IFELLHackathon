import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './SubmitPage.css';

const CATEGORIES = [
  { value: 'first-love',    label: '🌹 First Love' },
  { value: 'heartbreak',    label: '💔 Heartbreak' },
  { value: 'long-distance', label: '✈️ Long Distance' },
  { value: 'unrequited',    label: '🕯️ Unrequited' },
  { value: 'self-love',     label: '🪞 Self Love' },
  { value: 'soulmates',     label: '∞ Soulmates' },
];

const EMPTY = { title: '', author: '', category: '', excerpt: '', body: '' };

export default function SubmitPage() {
  const [form, setForm]       = useState(EMPTY);
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title || !form.category || !form.body) {
      setStatus('error');
      setMessage('Please fill in the title, category, and your story.');
      return;
    }
    setStatus('loading');
    try {
      const { error } = await supabase
        .from('articles')
        .insert([{ ...form, approved: false }]);
      if (error) throw error;
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="page-wrapper submit">
        <div className="container submit__success fade-up">
          <span className="submit__heart">♥</span>
          <h2>Thank you for sharing.</h2>
          <p>Your story has been submitted and is pending review. We'll feature it on the platform soon.</p>
          <button className="btn-ghost" onClick={() => setStatus('idle')}>Submit another story</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper submit">
      <div className="container">
        <header className="submit__header fade-up">
          <span className="manifesto__label">Share a Story</span>
          <h1 className="submit__title">Your story matters.</h1>
          <p className="submit__subtitle">
            No credentials needed. No perfect writing required.
            Just something true.
          </p>
        </header>

        <form className="submit__form fade-up" onSubmit={handleSubmit} noValidate>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title <span className="req">*</span></label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Give your story a title"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Your Name</label>
              <input
                id="author"
                name="author"
                type="text"
                placeholder="Anonymous if you prefer"
                value={form.author}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category <span className="req">*</span></label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">— Choose a theme —</option>
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">One-line teaser</label>
            <input
              id="excerpt"
              name="excerpt"
              type="text"
              placeholder="A single sentence that captures the feeling"
              value={form.excerpt}
              onChange={handleChange}
            />
          </div>

          <div className="form-group form-group--full">
            <label htmlFor="body">Your Story <span className="req">*</span></label>
            <textarea
              id="body"
              name="body"
              rows={12}
              placeholder="Write freely. This is your space."
              value={form.body}
              onChange={handleChange}
            />
            <span className="form-hint">{form.body.length} characters</span>
          </div>

          {status === 'error' && (
            <div className="form-error">{message}</div>
          )}

          <button type="submit" className="btn-primary submit__cta" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting…' : 'Submit Your Story →'}
          </button>

        </form>
      </div>
    </div>
  );
}
