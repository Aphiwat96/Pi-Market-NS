"use client";
export default function PiEntryButton() {
  function handlePiEntry() {
    // Pi Authentication จะเชื่อมในขั้นถัดไป
    console.log("Pi Market-NS: เริ่มเข้าสู่ระบบ Pi");
  }
  return (
    <button
      type="button"
      onClick={handlePiEntry}
      className="pi-entry-button"
    >
      เข้าสู่ Pi Market-NS
    </button>
  );
}
