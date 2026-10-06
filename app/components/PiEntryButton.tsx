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
          console.warn(
            "พบการชำระเงินที่ยังไม่เสร็จสมบูรณ์:",
            payment
          );
        }
      );
      console.log("Pi Authentication สำเร็จ");
      const verifyResponse = await fetch(
        "/api/v1/auth/pi/verify",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authResult.accessToken}`,
          },
        }
      );
      const verifyData = await verifyResponse.json();
      if (!verifyResponse.ok || !verifyData?.success) {
        console.error(
          "Backend ตรวจสอบ Pi Authentication ไม่สำเร็จ:",
          verifyData
        );
        return;
      }
      console.log("Backend ตรวจสอบ Pi Authentication สำเร็จ");
      console.log("Verified Pi UID:", verifyData.user.uid);
      console.log("Verified Pi Username:", verifyData.user.username);
    } catch (error) {
      console.error(
        "Pi Authentication หรือ Backend Verification ไม่สำเร็จ:",
        error
      );
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
