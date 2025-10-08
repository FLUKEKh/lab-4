# 🔍 Comparison: Node.js HTTP Server vs Express.js

1. Node.js แบบพื้นฐาน (`http` module)
2. Express.js framework  


## 1️⃣ Node.js HTTP Server (`http` module)

### ✅ ข้อดี
- ใช้โมดูล built-in ไม่ต้องติดตั้งแพ็กเกจเพิ่ม
- เข้าใจการทำงานพื้นฐานของ Node.js server และ HTTP request/response
- เหมาะสำหรับการเรียนรู้ low-level HTTP concepts

### ❌ ข้อเสีย
- ต้องเขียน route, headers, JSON parsing เองทั้งหมด
- โค้ดยาวและซ้ำซ้อนเมื่อมีหลาย route
- ไม่มี middleware ช่วยจัดการ request/response
- การจัดการ error ต้องเขียนเอง

## 2️⃣ Express.js

### ✅ ข้อดี
- เขียนโค้ดสั้นและอ่านง่าย
- มีระบบ routing และ middleware ในตัว
- รองรับ JSON parsing, error handling, CORS ได้ง่าย
- เหมาะสำหรับสร้าง REST API จริงจัง

## ❌ ข้อเสีย
- ต้องติดตั้งแพ็กเกจ express
- ถ้าใช้ middleware เยอะเกินไป อาจซับซ้อน