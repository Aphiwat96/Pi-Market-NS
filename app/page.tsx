import PiEntryButton from "./components/PiEntryButton";
export default function EntryPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 text-gray-900">
      <section className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        {/* Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-700">
            Pi Market-NS
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            ตลาดซื้อขายสินค้าใน Pi Ecosystem
          </p>
        </div>
        {/* Login */}
        <div>
          <h2 className="mb-2 text-center text-xl font-semibold">
            ยินดีต้อนรับ
          </h2>
          <p className="mb-6 text-center text-sm text-gray-500">
            เข้าสู่ระบบด้วยบัญชี Pi ของคุณ
          </p>
          <PiEntryButton />
        </div>
        {/* Information */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          การเข้าสู่ระบบใช้ Pi Authentication
          <br />
          เพื่อยืนยันตัวตนก่อนเข้าสู่ Pi Market-NS
        </p>
      </section>
    </main>
  );
}
