"use client";
declare global {
  interface Window {
    Pi?: {
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound: (payment: unknown) => void
      ) => Promise<{
        accessToken: string;
        user: {
          uid: string;
          username: string;
        };
      }>;
    };
  }
}
export default function PiEntryButton() {
  async function handlePiEntry() {
    try {
      if (!window.Pi) {
        console.error("Pi SDK ยังไม่พร้อมใช้งาน");
        return;
      }
      const authResult = await window.Pi.authenticate(
        ["username"],
        (payment) => {
          console.warn("พบการชำระเงินที่ยังไม่เสร็จสมบูรณ์:", payment);
        }
      );
      console.log("Pi Authentication สำเร็จ");
      console.log("Pi UID:", authResult.user.uid);
      console.log("Pi Username:", authResult.user.username);
      console.log("Access Token:", authResult.accessToken);
    } catch (error) {
      console.error("Pi Authentication ไม่สำเร็จ:", error);
    }
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
