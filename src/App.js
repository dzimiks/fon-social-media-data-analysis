import React from 'react';
import './App.css';

import allUsers from './scripts/data/users.json';
import balkanUsers from './scripts/data/balkanUsers.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faShare,
  faPlay,
  faComment,
} from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-5">
              TikTok Scraper
            </h1>
          </div>
        </div>

        <div className="row">
          {balkanUsers.map((post) => (
            <div className="col-md-6 mb-3" key={post.id}>
              <div className="card card-shadow">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={post.authorMeta.avatar}
                      className="img-fluid rounded-circle card-image"
                      alt={post.text}
                    />

                    <a href={post.webVideoUrl} className="card-title-link">
                      <h5 className="card-title">
                        {post.authorMeta.name}
                      </h5>
                    </a>
                  </div>

                  <h6 className="card-subtitle mb-2 text-muted">
                    {post.authorMeta.signature}
                  </h6>

                  <p className="card-text">
                    {post.text}
                  </p>

                  <div className="d-flex card-meta mb-3">
                    <span>
                      <FontAwesomeIcon icon={faPlay} className="card-meta-icon" />
                      {post.playCount.toLocaleString()}
                    </span>

                    <span>
                      <FontAwesomeIcon icon={faHeart} className="card-meta-icon" />
                      {post.diggCount.toLocaleString()}
                    </span>

                    <span>
                      <FontAwesomeIcon icon={faComment} className="card-meta-icon" />
                      {post.commentCount.toLocaleString()}
                    </span>

                    <span>
                      <FontAwesomeIcon icon={faShare} className="card-meta-icon" />
                      {post.shareCount.toLocaleString()}
                    </span>
                  </div>

                  <video
                    width="100%"
                    height="600px"
                    src={post.videoUrl}
                    controls
                  />
                </div>

                <div className="card-footer text-muted">
                  {post.hashtags.length ? post.hashtags.map((hashtag) => (
                    <span className="badge badge-primary mr-1">
                      #{hashtag.name}
                    </span>
                  )) : (
                    <p className="m-0">No hashtags</p>
                  )}
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
