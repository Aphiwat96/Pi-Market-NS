"use client";
import { useState } from "react";
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
  const [status, setStatus] = useState(
    "พร้อมเข้าสู่ระบบด้วย Pi"
  );
  async function handlePiEntry() {
    try {
      setStatus("กำลังตรวจสอบ Pi SDK...");
      if (!window.Pi) {
        setStatus("ไม่พบ Pi SDK");
        return;
      }
      setStatus("กำลังเข้าสู่ระบบด้วย Pi...");
      const authResult = await window.Pi.authenticate(
        ["username"],
        (payment) => {
          console.warn(
            "พบการชำระเงินที่ยังไม่เสร็จสมบูรณ์:",
            payment
          );
        }
      );
      setStatus("Pi Authentication สำเร็จ");
      setStatus(
        "กำลังส่งข้อมูลให้ Pi Market-NS ตรวจสอบ..."
      );
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
        setStatus(
          `Backend ตรวจสอบไม่สำเร็จ: ${
            verifyData?.error ?? "Unknown error"
          }`
        );
        return;
      }
      setStatus(
        `เข้าสู่ระบบสำเร็จ: @${verifyData.user.username}`
      );
      console.log(
        "Verified Pi UID:",
        verifyData.user.uid
      );
    } catch (error) {
      console.error(
        "Pi Authentication หรือ Backend Verification ไม่สำเร็จ:",
        error
      );
      setStatus(
        "การเข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่"
      );
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={handlePiEntry}
        className="pi-entry-button"
      >
        เข้าสู่ Pi Market-NS
      </button>
      <p
        style={{
          marginTop: "12px",
          textAlign: "center",
          fontSize: "13px",
          color: "#374151",
        }}
      >
        {status}
      </p>
    </div>
  );
}
