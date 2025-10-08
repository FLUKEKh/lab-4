export const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'electronics', name: 'อิเล็กทรอนิกส์' },
    { id: 'clothing', name: 'เสื้อผ้า' },
    { id: 'books', name: 'หนังสือ' }
];

export const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'electronics',
        price: 45900,
        originalPrice: 49900,
        discount: 8,
        image: '/src/assets/รูป/iphone15pro.jpg',
        description: 'สมาร์ทโฟนล่าสุดจาก Apple',
        inStock: true,
        rating: 4.8
    },
    {
        id: 2,
        name: 'เสื้อยืดผ้าฝ้าย',
        category: 'clothing',
        price: 299,
        originalPrice: 399,
        discount: 25,
        image: '/src/assets/รูป/เสื้อยืดผ้าฝ้าย.jpg',
        description: 'เสื้อยืดผ้าฝ้าย 100% นุ่มสบาย',
        inStock: true,
        rating: 4.2
    },
    {
        id: 3,
        name: 'หนังสือ React.js Guide',
        category: 'books',
        price: 650,
        originalPrice: 650,
        discount: 0,
        image: '/src/assets/รูป/หนังสือ React.js Guide.jpg',
        description: 'คู่มือเรียนรู้ React.js ฉบับสมบูรณ์',
        inStock: false,
        rating: 4.7
    },
    {
        id: 4,
        name: 'Smart Watch X2',
        category: 'electronics',
        price: 2590,
        originalPrice: 2990,
        discount: 13,
        image: '/src/assets/รูป/Smart Watch X2.jpg',
        description: 'นาฬิกาอัจฉริยะกันน้ำพร้อมวัดชีพจร',
        inStock: true,
        rating: 4.5
    },
    {
        id: 5,
        name: 'กางเกงยีนส์เท่ๆ',
        category: 'clothing',
        price: 890,
        originalPrice: 1190,
        discount: 25,
        image: '/src/assets/รูป/กางเกงยีนส์เท่ๆ.jpg',
        description: 'ยีนส์ผ้าดี สวมใส่สบาย เข้ากับทุกลุค',
        inStock: true,
        rating: 4.3
    },
    {
        id: 6,
        name: 'หูฟังไร้สาย AirPods Z',
        category: 'electronics',
        price: 5990,
        originalPrice: 6990,
        discount: 14,
        image: '/src/assets/รูป/หูฟังไร้สาย AirPods Z.jpg',
        description: 'หูฟังไร้สายคุณภาพสูง พร้อมตัดเสียงรบกวน',
        inStock: true,
        rating: 4.6
    },
    {
        id: 7,
        name: 'กระเป๋าสะพายหนังแท้',
        category: 'clothing',
        price: 1290,
        originalPrice: 1590,
        discount: 19,
        image: '/src/assets/รูป/กระเป๋าสะพายหนังแท้.jpg',
        description: 'กระเป๋าสะพายหนังแท้ สไตล์มินิมอล',
        inStock: true,
        rating: 4.4
    },
    {
        id: 8,
        name: 'หนังสือ JavaScript Mastery',
        category: 'books',
        price: 750,
        originalPrice: 850,
        discount: 12,
        image: '/src/assets/รูป/หนังสือ JavaScript Mastery.jpg',
        description: 'เรียนรู้ JavaScript ตั้งแต่พื้นฐานถึงขั้นสูง',
        inStock: true,
        rating: 4.9
    },
    {
        id: 9,
        name: 'รองเท้าผ้าใบ SportX',
        category: 'clothing',
        price: 1590,
        originalPrice: 1990,
        discount: 20,
        image: '/src/assets/รูป/รองเท้าผ้าใบ SportX.jpg',
        description: 'รองเท้าผ้าใบใส่สบาย เหมาะกับทุกกิจกรรม',
        inStock: true,
        rating: 4.5
    },
    {
        id: 10,
        name: 'แท็บเล็ต TabPro 10',
        category: 'electronics',
        price: 12990,
        originalPrice: 14990,
        discount: 13,
        image: '/src/assets/รูป/แท็บเล็ต TabPro 10.jpg',
        description: 'แท็บเล็ตหน้าจอ 10 นิ้ว รองรับปากกา Stylus',
        inStock: true,
        rating: 4.7
    }
];
