'use client';

import { useState } from 'react';

type P = {
  id: string;
  title: string;
  price?: string;
  extracted_price?: number | null;
  source?: string;
  rating?: number;
  reviews?: number;
  image?: string;
  link?: string;
  match: number;
  checks: any[];
  snippet?: string;
};

export default function Home() {
  const [q, setQ] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  async function research() {
    if (!q.trim()) return;
    setLoading(true);
    setErr('');
    setData(null);

    try {
      const r = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setData(j);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleEvidence(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <main>
      <div className="wrap">
        <nav className="nav">
          <div className="brand">✦ ShopIntel</div>
          <span className="pill">SerpApi powered</span>
        </nav>

        <section className="hero">
          <span className="tag">AI SHOPPING INTELLIGENCE</span>
          <h1>
            Research products.
            <br />
            Not just prices.
          </h1>
          <p>
            Search live shopping results, check requirements, compare trade-offs and keep evidence close.
          </p>

          <div className="search">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && research()}
              placeholder="Laptop for coding, AI/ML and gaming under Rs. 80,000, 16GB RAM, 512GB SSD"
            />
            <button onClick={research}>Research products →</button>
          </div>

          {loading && (
            <div className="status">
              <p>Searching Google Shopping and evaluating requirements...</p>
              <div className="bar">
                <i />
              </div>
            </div>
          )}

          {err && <div className="error">{err}</div>}
        </section>

        {data && (
          <>
            <section className="section">
              <h2>Requirement profile</h2>
              <div className="card profile-card">
                {data.requirements.budget && (
                  <span className="tag">Budget Rs. {Number(data.requirements.budget).toLocaleString('en-IN')}</span>
                )}
                {data.requirements.ram && <span className="tag">&ge; {data.requirements.ram}GB RAM</span>}
                {data.requirements.storage && <span className="tag">{data.requirements.storage}</span>}
                {data.requirements.gpu && <span className="tag">GPU required</span>}
                <p className="muted">
                  Results are ranked by explicit requirement matches. Unknown specs are not treated as verified.
                </p>
              </div>
            </section>

            <section className="section">
              <h2>Research results</h2>

              {data.products?.length ? (
                <div className="grid">
                  {data.products.map((p: P) => (
                    <article className="product-card" key={p.id}>
                      <div className="product-image">
                        <img src={p.image || '/placeholder.png'} alt={p.title} />
                      </div>

                      <div className="product-body">
                        <div className="source-row">
                          <span className="source">{p.source}</span>
                          <span className="match">{p.match}% match</span>
                        </div>

                        <h3>{p.title}</h3>

                        <div className="price-row">
                          <div className="price">
                            {p.extracted_price
                              ? `Rs. ${Number(p.extracted_price).toLocaleString('en-IN')}`
                              : p.price || 'Price unavailable'}
                          </div>

                          {p.rating && (
                            <div className="rating">
                              ★ {p.rating}
                              {p.reviews ? ` (${p.reviews})` : ''}
                            </div>
                          )}
                        </div>

                        {p.snippet && <p className="snippet">{p.snippet}</p>}

                        <div className="product-actions">
                          {p.link && (
                            <a className="btn secondary" href={p.link} target="_blank" rel="noreferrer">
                              Open product
                            </a>
                          )}
                          <button className="btn ghost" onClick={() => toggleEvidence(p.id)}>
                            {expanded[p.id] ? 'Hide evidence' : 'View evidence'}
                          </button>
                        </div>

                        {expanded[p.id] && (
                          <div className="evidence">
                            {p.checks?.length ? (
                              p.checks.map((check: any, i: number) => (
                                <div
                                  key={`${p.id}-${i}`}
                                  className={`check ${check.pass === true ? 'pass' : check.pass === false ? 'fail' : 'neutral'}`}
                                >
                                  <span className="check-status">
                                    {check.pass === true ? '✓' : check.pass === false ? 'x' : '•'}
                                  </span>
                                  <span>{check.name}</span>
                                </div>
                              ))
                            ) : (
                              <div className="check neutral">
                                <span className="check-status">•</span>
                                <span>No evidence available</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty">No results matched your query yet.</div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
