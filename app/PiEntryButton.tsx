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
      className="w-full rounded-xl bg-green-700 px-5 py-3 text-center text-base font-semibold text-white transition hover:bg-green-800 active:scale-[0.99]"
    >
      เข้าสู่ Pi Market-NS
    </button>
  );
}
