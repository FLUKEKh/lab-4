import React, { useState } from 'react';
import './ProfileCard.css';

function ProfileCard({ profile }) {
  // แสดงอักษรย่อของชื่อ
  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  // ------------------ States ------------------
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [favoriteHobbies, setFavoriteHobbies] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);

  // ------------------ Functions ------------------
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleCardClick = () => setViewCount(viewCount + 1);

  const toggleFavoriteHobby = (hobby) => {
    setFavoriteHobbies((fav) =>
      fav.includes(hobby) ? fav.filter((h) => h !== hobby) : [...fav, hobby]
    );
  };

  const handleContactClick = (e) => {
    e.stopPropagation();
    setShowContactForm(true);
  };

  const handleSkillClick = (skill) => {
    alert(`${profile.name} มีความเชี่ยวชาญใน ${skill}!`);
  };

  const cardClassName = `profile-card ${isDarkMode ? 'dark-mode' : ''}`;

  return (
    <div className={cardClassName} onClick={handleCardClick}>
      {/* View counter */}
      <div className="view-counter">👁️ Views: {viewCount}</div>

      {/* Sakura petals */}
      <span className="petal petal--1"></span>
      <span className="petal petal--2"></span>
      <span className="petal petal--3"></span>
      <span className="petal petal--4"></span>
      <span className="petal petal--5"></span>

      {/* Header */}
      <div className="profile-header">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? '🌞 Light' : '🌙 Dark'}
        </button>

        <div className="profile-avatar">{getInitials(profile.name)}</div>
        <h1 className="profile-name">{profile.name}</h1>
        <div className="student-id">{profile.studentId}</div>
      </div>

      {/* Info */}
      <div className="profile-info">
        <div className="info-item">
          <div className="info-label">สาขา</div>
          <div className="info-value">{profile.major}</div>
        </div>
        <div className="info-item">
          <div className="info-label">ชั้นปี</div>
          <div className="info-value">{profile.year}</div>
        </div>
        <div className="info-item">
          <div className="info-label">อายุ</div>
          <div className="info-value">{profile.age} ปี</div>
        </div>
        <div className="info-item">
          <div className="info-label">เกรด</div>
          <div className="info-value">
            {profile.gpa.toFixed(2)} {profile.gpa >= 3.5 && '🌟'}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="profile-section">
        <h3>🏆 Achievements</h3>
        <div className="achievements">
          {profile.gpa >= 3.5 && (
            <span className="achievement-badge">🌟 เกียรตินิยม</span>
          )}
          {profile.skills.length >= 5 && (
            <span className="achievement-badge">💪 Multi-skilled</span>
          )}
        </div>
      </div>

      {/* Hobbies */}
      <div className="profile-section">
        <h3>🎯 งานอดิเรก</h3>
        <ul className="hobbies-list">
          {profile.hobbies.map((hobby, index) => (
            <li
              key={index}
              className={`hobby-item ${
                favoriteHobbies.includes(hobby) ? 'favorite' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavoriteHobby(hobby);
              }}
            >
              {hobby} {favoriteHobbies.includes(hobby) && '💖'}
            </li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div className="profile-section">
        <h3>💻 ทักษะ</h3>
        <div className="skills">
          {profile.skills.map((skill, index) => (
            <div
              key={index}
              className="skill-tag"
              onClick={() => handleSkillClick(skill)}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      {profile.socialLinks && profile.socialLinks.length > 0 && (
        <div className="profile-section">
          <h3>🌐 Social Media</h3>
          <div className="social-links">
            {profile.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Contact Form */}
      {showContactForm && (
        <div className="contact-form">
          <h3>Contact {profile.name}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('ส่งข้อความเรียบร้อย!');
              setShowContactForm(false);
            }}
          >
            <input type="text" placeholder="ชื่อของคุณ" required />
            <input type="email" placeholder="อีเมลของคุณ" required />
            <textarea placeholder="ข้อความ..." required></textarea>
            <button type="submit">ส่ง</button>
          </form>
        </div>
      )}

      {/* Contact Button */}
      {!showContactForm && (
        <button className="contact-button" onClick={handleContactClick}>
          📧 ติดต่อ {profile.name}
        </button>
      )}
    </div>
  );
}

export default ProfileCard;
