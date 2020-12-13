import React, { useState } from 'react';
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
import { Bar } from 'react-chartjs-2';
import { SORT_INDICATOR } from './scripts/consts';

function App() {
  const [sortValue, setSortValue] = useState('playCount');
  const [limit, setLimit] = useState(5);

  const handleSort = (event) => {
    setSortValue(event.target.value);
  };

  const handleLimit = (event) => {
    setLimit(event.target.value);
  };

  const customSortCompare = (a, b, value) => {
    if (a[value] > b[value]) {
      return -1;
    } else if (a[value] < b[value]) {
      return 1;
    }

    return 0;
  };

  const usersChartData = balkanUsers
    .sort((a, b) => customSortCompare(a, b, sortValue))
    .slice(0, limit)
    .map((post) => ({
      data: post[sortValue],
      username: post.authorMeta.name,
    }));

  const chartData = {
    labels: usersChartData.map((post) => post.username),
    datasets: [
      {
        label: `Top ${limit} by ${SORT_INDICATOR[sortValue]}`,
        data: usersChartData.map((post) => post.data),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      }
    ]
  };

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
          <div className="col-12 mb-3">
            <Bar
              data={chartData}
              width={100}
              height={400}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-3">
            <h3>Filters - Showing {limit} posts</h3>

            <div className="d-flex align-items-center">
              <label htmlFor="sortFilter" className="mr-2">Sort By:</label>

              <select
                className="form-control w-25 mr-3"
                id="sortFilter"
                onChange={handleSort}
              >
                <option value="playCount">Views</option>
                <option value="diggCount">Likes</option>
                <option value="commentCount">Comments</option>
                <option value="shareCount">Shares</option>
              </select>

              <label htmlFor="limitFilter" className="mr-2">Limit By:</label>

              <select
                className="form-control w-25 mr-3"
                id="limitFilter"
                onChange={handleLimit}
              >
                <option value="5">Top 5</option>
                <option value="10">Top 10</option>
                <option value="20">Top 20</option>
                <option value={balkanUsers.length}>All</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {balkanUsers
            .sort((a, b) => customSortCompare(a, b, sortValue))
            .slice(0, limit)
            .map((post) => (
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
