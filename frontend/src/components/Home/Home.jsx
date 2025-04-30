import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router';

const App = () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:7000/jobs/patwari') // Your backend endpoint
      .then(res => res.json())
      .then(data => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Welcome to Our Library</h1>
        <p>Discover, Read, Learn</p>
        <input type="text" placeholder="Search for books" className="search-input" />
      </header>

      {/* Navigation */}
      <section className="nav-section">
        <div className="nav-box">Browse by Genre</div>
        <div className="nav-box">New Arrivals</div>
        <div className="nav-box">E-Books</div>
        <div className="nav-box">Community Events</div>
      </section>

      {/* Government Job Alerts */}
      <section className="jobs-section">
              <h2>Latest Government Job Openings</h2>
              <p>Stay updated with the latest government recruitment opportunities.</p>
              <div className="jobs-grid">
                <div className="job-card">
                  <h3>UPSC Civil Services Exam 2025</h3>
                  <p>Apply by: May 21, 2025</p>
                  <a href="https://www.upsc.gov.in/" target="_blank" rel="noreferrer">View Details</a>
                </div>
                <div className="job-card">
                  <h3>SSC CHSL Recruitment</h3>
                  <p>Apply by: June 10, 2025</p>
                  <a href="https://ssc.nic.in/" target="_blank" rel="noreferrer">View Details</a>
                </div>
                <div className="job-card">
                  <h3>Rajasthan Patwari Vacancy</h3>
                  <p>Apply by: July 1, 2025</p>
                  <a href="https://rsmssb.rajasthan.gov.in/" target="_blank" rel="noreferrer">View Details</a>
                </div>
              </div>
      </section>

      {/* Library Gallery Section */}
        <section className="gallery-section">
        <h2>Explore Our Library</h2>
        <p>Take a look at the spaces, shelves, and reading corners that make our library special.</p>
        <div className="gallery-grid">
            <img src="https://www.voicesofruralindia.org/wp-content/uploads/2020/11/ylswjsy7stw-scaled.jpg" alt="Library Shelf" />
            <img src="" alt="Reading Corner" />
            <img src="https://www.voicesofruralindia.org/wp-content/uploads/2020/11/ylswjsy7stw-scaled.jpg" alt="Study Area" />
            <img src="" alt="Front Desk" />
        </div>
        </section>

      {/* Upcoming Events */}
      {/* <section className="events-section">
        <div className="events-header">
          <h2>Upcoming Events</h2>
          <button className="view-all">View All</button>
        </div>
        <div className="events-grid">
          <div className="event-card">
            <h3>Book Reading</h3>
            <p className="event-date">April 25</p>
            <p>Join us for a reading of a popular novel.</p>
          </div>
          <div className="event-card">
            <h3>Writing Workshop</h3>
            <p className="event-date">May 3</p>
            <p>Get tips and feedback on your writing.</p>
          </div>
          <div className="event-card">
            <h3>Author Talk</h3>
            <p className="event-date">May 12</p>
            <p>Meet the author and discuss their latest book.</p>
          </div>
        </div>
      </section> */}

      {/* Membership */}
      <section className="membership-section">
        <h2>Become a Member</h2>
        <p>
          Get access to exclusive resources, events, and more. Enjoy extended borrowing privileges and online services.
        </p>
        <Link className="join-btn" to="/add-new-member">Join Now</Link>
        {/* <button className="join-btn">Join Now</button> */}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h3>Library</h3>
            <p>Near Neelkant Mahadev Mandir</p>
            <p>Bandanwara, 305621</p>
          </div>
          <div>
            <h3>Opening Hours</h3>
            <p>Mon - Sun: 8am - 11pm</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <p>Catalog</p>
            <p>Membership</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
