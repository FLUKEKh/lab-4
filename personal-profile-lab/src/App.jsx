import React from 'react';
import ProfileCard from './ProfileCard';

function App() {
  const myProfile = {
    name: "วรรธนะ คำมาลัย",
    studentId: "67543210023-7",
    major: "วิศวกรรมซอฟต์แวร์",
    year: 2,
    age: 19,
    gpa: 2.5,
    email: "อีเมลของคุณ",
    hobbies: [
      "เขียนโค้ด",
      "เล่นเกม",
      "ดูหนัง",
      "ฟังเพลง",
      "อ่านหนังสือ"
    ],
    skills: [
      "JavaScript",
      "React.js",
      "HTML/CSS",
      "Python",
      "Git",
      "Node.js"
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/FLUKEKh" },
      { platform: "facebook", url: "https://www.facebook.com/ok.fluke.2024?locale=th_TH" },
      { platform: "roblox", url: "https://www.roblox.com/users/2671751059/profile" },
      // เพิ่มเติมตามต้องการ
    ]
  };
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #f0f2f5 0%, #e8eaf6 100%)',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{
          color: '#333',
          fontSize: '32px',
          margin: '20px 0'
        }}>
          🎓 Personal Profile Card
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Lab 3.1 - ทำความรู้จักกับ React.js และ JSX
        </p>
      </div>

      <ProfileCard profile={myProfile} />
    </div>
  );
}

export default App;