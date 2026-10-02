// === Market-NS : ระบบทำงานเบื้องต้น ===

// เปลี่ยนหน้า
function goTo(page) {
  window.location.href = page + '.html';
}

// แสดงสถานะโหลด
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Market-NS พร้อมใช้งาน');
});

// ในอนาคตจะเพิ่ม: เชื่อมกระเป๋า Pi, สั่งซื้อ, ลงขาย
// ตัวอย่าง:
/*
async function connectWallet() {
  alert('🔌 กำลังเชื่อมต่อกระเป๋า Pi...');
  // จะใส่โค้ด Pi SDK ที่นี่เมื่อพร้อม
}
*/
