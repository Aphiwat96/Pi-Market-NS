import PiEntryButton from "./components/PiEntryButton";
const categories = [
  "OTOP สินค้าชุมชน",
  "เกษตร",
  "สินค้าในครัวเรือน",
  "เครื่องเขียนและการเรียนรู้",
  "เสื้อผ้าและแฟชั่น",
  "เครื่องประดับ",
  "Electronics / IT",
  "เครื่องมือและอะไหล่",
  "ของเล่น",
  "มือสอง / Re-commerce",
];
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-green-700">
            Pi Market-NS
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="ค้นหา"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700"
            >
              Search
            </button>
            <button
              type="button"
              aria-label="แชต"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700"
            >
              Chat
            </button>
          </div>
        </div>
      </header>
      {/* Pi Entry */}
      <section className="px-4 pt-4">
        <PiEntryButton />
      </section>
      {/* Search */}
      <section className="px-4 pt-4">
        <input
          type="search"
          placeholder="ค้นหาสินค้า..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-green-600"
        />
      </section>
      {/* Categories */}
      <section className="px-4 pt-5">
        <h2 className="mb-3 text-lg font-bold">
          หมวดหมู่
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className="shrink-0 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700"
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      {/* Products */}
      <section className="px-4 pb-24 pt-6">
        <h2 className="mb-4 text-lg font-bold">
          สินค้า
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square rounded-xl border border-dashed border-gray-300 bg-gray-50" />
          <div className="aspect-square rounded-xl border border-dashed border-gray-300 bg-gray-50" />
        </div>
      </section>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
        <div className="grid grid-cols-4">
          <button
            type="button"
            className="py-3 text-center text-green-700"
          >
            <span className="text-sm font-medium">
              Home
            </span>
          </button>
          <button
            type="button"
            className="py-3 text-center text-gray-600"
          >
            <span className="text-sm font-medium">
              Cart
            </span>
          </button>
          <button
            type="button"
            className="py-3 text-center text-gray-600"
          >
            <span className="text-sm font-medium">
              Notifications
            </span>
          </button>
          <button
            type="button"
            className="py-3 text-center text-gray-600"
          >
            <span className="text-sm font-medium">
              Profile
            </span>
          </button>
        </div>
      </nav>
    </main>
  );
}
