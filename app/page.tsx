import PiEntryButton from "./components/PiEntryButton";
export default function EntryPage() {
  return (
    <main className="entry-page">
      <section className="entry-card">
        <div className="entry-brand">
          <h1>Pi Market-NS</h1>
          <p>
            ตลาดซื้อขายสินค้าใน Pi Ecosystem
          </p>
        </div>
        <div className="entry-login">
          <h2>
            ยินดีต้อนรับ
          </h2>
          <p>
            เข้าสู่ระบบด้วยบัญชี Pi ของคุณ
          </p>
          <PiEntryButton />
        </div>
        <p className="entry-information">
          การเข้าสู่ระบบใช้ Pi Authentication
          <br />
          เพื่อยืนยันตัวตนก่อนเข้าสู่ Pi Market-NS
        </p>
      </section>
    </main>
  );
}
