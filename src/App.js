import React from 'react';
import './App.css';

// import allUsers from './scripts/data/users.json';
import balkanUsers from './scripts/data/balkanUsers.json';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">
              TikTok Scraper
            </h1>
          </div>
        </div>

        <div className="row">
          {balkanUsers.map((post) => (
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {post.authorMeta.name}
                  </h5>

                  <h6 className="card-subtitle mb-2 text-muted">
                    {post.authorMeta.signature}
                  </h6>

                  <p className="card-text">
                    {post.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
