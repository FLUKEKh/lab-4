const express = require('express');
const app = express();
const PORT = 3001;

// ✅ ข้อมูลจำลอง students array (เหมือนใน http-server.js)
const students = [
    { id: 1, name: 'สมชาย ใจดี', major: 'วิศวกรรมคอมพิวเตอร์', year: 3 },
    { id: 2, name: 'สมหญิง แก้วใส', major: 'บริหารธุรกิจ', year: 2 },
    { id: 3, name: 'อนันต์ เทพสุด', major: 'วิศวกรรมไฟฟ้า', year: 4 },
    { id: 4, name: 'พิมพ์ชนก น่ารัก', major: 'วิศวกรรมคอมพิวเตอร์', year: 1 },
];

// ✅ Middleware
app.use(express.json());

// ✅ Route GET / 
app.get('/', (req, res) => {
    res.json({
        message: 'ยินดีต้อนรับสู่ Student API (Express) 🚀',
        endpoints: [
            { path: '/', description: 'แสดงข้อความต้อนรับและ endpoint ทั้งหมด' },
            { path: '/students', description: 'แสดงรายชื่อนักศึกษาทั้งหมด' },
            { path: '/students/:id', description: 'แสดงข้อมูลนักศึกษาตาม ID' },
            { path: '/students/major/:major', description: 'กรองนักศึกษาตามสาขา' },
            { path: '/stats', description: 'แสดงสถิติจำนวนและสาขาของนักศึกษา' }
        ]
    });
});

// ✅ Route GET /students
app.get('/students', (req, res) => {
    res.json(students);
});

// ✅ Route GET /students/:id
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: 'ไม่พบนักศึกษาที่มี ID นี้' });
    }
});

// ✅ Route GET /students/major/:major  
app.get('/students/major/:major', (req, res) => {
    const majorName = req.params.major;
    const filtered = students.filter(s => s.major.includes(majorName));
    res.json(filtered);
});

// ✅ Route GET /stats  
app.get('/stats', (req, res) => {
    const total = students.length;
    
    // นับจำนวนนักศึกษาตามสาขา
    const majors = {};
    students.forEach(s => {
        majors[s.major] = (majors[s.major] || 0) + 1;
    });

    res.json({
        total_students: total,
        students_by_major: majors
    });
});

// ✅ Middleware จัดการ 404
app.use((req, res) => {
    res.status(404).json({ error: 'ไม่พบหน้าที่คุณร้องขอ (404 Not Found)' });
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Express Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students'); 
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
    console.log('  GET /stats');
});
