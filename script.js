// === Pi Market-NS — Navigation Controller ===

// เปลี่ยนหน้าทำงานหลัก
function goToPage(pageName) {
  // ซ่อนทุกหน้า
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  //แสดงหน้าที่เลือก
  const targetPage = document.getElementById(`page-${pageName}`);
  if (targetPage) targetPage.classList.add('active');
  
  //อัปเดตสถานะเมนูล่าง
  document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.page === pageName) btn.classList.add('active');
  });
}

// เมื่อโหลดหน้าเสร็จ → ตั้งค่าเริ่มต้น
document.addEventListener('DOMContentLoaded', () => {
  // ผูกเหตุการณ์กับปุ่มเมนูล่าง
  document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      goToPage(btn.dataset.page);
    });
  });

  // ตั้งหน้าแรกเป็นค่าเริ่มต้น
  goToPage('home');
});

// === เตรียมรองรับ Pi Auth ในภายหลัง ===
/*
function initPiAuth() {
  if (typeof Pi !== 'undefined') {
    Pi.init({ version: "2.0", sandbox: false });
  }
}
*/
