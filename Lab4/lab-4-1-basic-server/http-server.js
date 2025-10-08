const http = require('http');
const url = require('url');

const PORT = 3000;

// ✅ ข้อมูลจำลอง students array
const students = [
    { id: 1, name: 'สมชาย ใจดี', major: 'วิศวกรรมคอมพิวเตอร์', year: 3 },
    { id: 2, name: 'สมหญิง แก้วใส', major: 'บริหารธุรกิจ', year: 2 },
    { id: 3, name: 'อนันต์ เทพสุด', major: 'วิศวกรรมไฟฟ้า', year: 4 }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;
    
    // ✅ ตั้งค่า CORS และประเภทข้อมูล
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // ✅ Route: GET /
    if (method === 'GET' && pathname === '/') {
        const message = {
            message: 'ยินดีต้อนรับสู่ Student API 🚀',
            endpoints: [
                { path: '/', description: 'แสดงข้อความต้อนรับและ endpoint ทั้งหมด' },
                { path: '/students', description: 'แสดงรายชื่อนักศึกษาทั้งหมด' },
                { path: '/students/:id', description: 'แสดงข้อมูลนักศึกษาตาม ID' },
                { path: '/students/major/:major', description: 'กรองนักศึกษาตามสาขา' }
            ]
        };
        res.writeHead(200);
        res.end(JSON.stringify(message, null, 2));
        return;
    }

    // ✅ Route: GET /students
    if (method === 'GET' && pathname === '/students') {
        res.writeHead(200);
        res.end(JSON.stringify(students, null, 2));
        return;
    }

    // ✅ Route: GET /students/:id
    if (method === 'GET' && pathname.startsWith('/students/')) {
        const parts = pathname.split('/'); // ['', 'students', '1']
        
        // ตรวจว่ามี /students/major/... หรือไม่ก่อน
        if (parts[2] === 'major') {
            const majorName = decodeURIComponent(parts[3]);
            const filtered = students.filter(s => s.major.includes(majorName));
            res.writeHead(200);
            res.end(JSON.stringify(filtered, null, 2));
            return;
        }

        const id = parseInt(parts[2]);
        const student = students.find(s => s.id === id);
        if (student) {
            res.writeHead(200);
            res.end(JSON.stringify(student, null, 2));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'ไม่พบนักศึกษาที่มี ID นี้' }));
        }
        return;
    }

    // ✅ Route: GET /students/major/:major
    if (method === 'GET' && pathname.startsWith('/students/major/')) {
        const majorName = decodeURIComponent(pathname.split('/')[3]);
        const filtered = students.filter(s => s.major.includes(majorName));
        res.writeHead(200);
        res.end(JSON.stringify(filtered, null, 2));
        return;
    }

    // ✅ 404 Not Found
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'ไม่พบหน้าที่คุณร้องขอ (404 Not Found)' }));
});

server.listen(PORT, () => {
    console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students');
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
});
