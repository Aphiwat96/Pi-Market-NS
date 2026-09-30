# Pi-Market-NS
Pi Market-NS — A Pi Browser marketplace platform for buying and selling products, starting in Nakhon Sawan and expanding nationwide.
.github/workflows/bootstrap-build1.yml
name: Bootstrap Pi Market-NS Build 1

on:
  workflow_dispatch:

permissions:
  contents: write

jobs:
  bootstrap:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Create Pi Market-NS Build 1
        shell: bash
        run: |
          set -e

          mkdir -p app/api/health
          mkdir -p app/api/auth/pi
          mkdir -p app/api/me
          mkdir -p app/profile
          mkdir -p app/cart
          mkdir -p app/chat
          mkdir -p app/lib
          mkdir -p lib
          mkdir -p types
          mkdir -p public

          cat > package.json <<'EOF'
          {
            "name": "pi-market-ns",
            "version": "1.0.0",
            "private": true,
            "scripts": {
              "dev": "next dev",
              "build": "next build",
              "start": "next start",
              "lint": "eslint ."
            },
            "dependencies": {
              "next": "16.0.0",
              "react": "19.2.0",
              "react-dom": "19.2.0"
            },
            "devDependencies": {
              "@types/node": "^22.0.0",
              "@types/react": "^19.0.0",
              "@types/react-dom": "^19.0.0",
              "eslint": "^9.0.0",
              "eslint-config-next": "16.0.0",
              "typescript": "^5.0.0"
            }
          }
          EOF

          cat > tsconfig.json <<'EOF'
          {
            "compilerOptions": {
              "target": "ES2017",
              "lib": ["dom", "dom.iterable", "esnext"],
              "allowJs": false,
              "skipLibCheck": true,
              "strict": true,
              "noEmit": true,
              "esModuleInterop": true,
              "module": "esnext",
              "moduleResolution": "bundler",
              "resolveJsonModule": true,
              "isolatedModules": true,
              "jsx": "react-jsx",
              "incremental": true,
              "plugins": [
                {
                  "name": "next"
                }
              ],
              "paths": {
                "@/*": ["./*"]
              }
            },
            "include": [
              "next-env.d.ts",
              ".next/types/**/*.ts",
              "**/*.ts",
              "**/*.tsx"
            ],
            "exclude": ["node_modules"]
          }
          EOF

          cat > next-env.d.ts <<'EOF'
          /// <reference types="next" />
          /// <reference types="next/image-types/global" />

          // NOTE: This file should not be edited
          // see https://nextjs.org/docs/app/api-reference/config/typescript
          EOF

          cat > next.config.ts <<'EOF'
          import type { NextConfig } from "next";

          const nextConfig: NextConfig = {
            reactStrictMode: true
          };

          export default nextConfig;
          EOF

          cat > .gitignore <<'EOF'
          node_modules/
          .next/
          out/
          .env
          .env.local
          .env.development.local
          .env.test.local
          .env.production.local
          npm-debug.log*
          yarn-debug.log*
          yarn-error.log*
          pnpm-debug.log*
          .DS_Store
          EOF

          cat > .env.example <<'EOF'
          # Pi Market-NS
          # Never commit real secrets.

          NEXT_PUBLIC_PI_SANDBOX=true

          PI_API_BASE_URL=https://api.minepi.com
          PI_API_KEY=
          PI_SANDBOX=false

          # Future database
          DATABASE_URL=
          EOF

          cat > types/account.ts <<'EOF'
          export type AccountStatus =
            | "ACTIVE"
            | "SUSPENDED"
            | "BANNED"
            | "CANCELLED";

          export type Role =
            | "MEMBER"
            | "VENDOR"
            | "ADMIN"
            | "FOUNDER";

          export interface Account {
            accountId: string;
            piUid: string;
            piUsername: string | null;
            status: AccountStatus;
            roles: Role[];
            createdAt: string;
            updatedAt: string;
          }
          EOF

          cat > types/product.ts <<'EOF'
          export interface Product {
            id: string;
            name: string;
            category: string;
            pricePi: number;
            image: string;
            status: "ACTIVE";
          }

          export const MARKETPLACE_CATEGORIES = [
            "OTOP / ชุมชน / สินค้าแปรรูป",
            "การเกษตร",
            "บ้านและเครื่องใช้ไฟฟ้า",
            "เครื่องเขียน / การเรียนรู้",
            "เสื้อผ้า / แฟชั่น",
            "เครื่องประดับ",
            "อิเล็กทรอนิกส์ / IT",
            "เครื่องมือ / อะไหล่",
            "ของเล่น",
            "มือสอง / Re-commerce"
          ] as const;
          EOF

          cat > lib/products.ts <<'EOF'
          import type { Product } from "@/types/product";

          /*
           * Build 1 only uses non-transactional display seed data.
           * These are NOT orders, payments, balances or financial records.
           */

          export const demoProducts: Product[] = [
            {
              id: "DEMO-PRODUCT-001",
              name: "สินค้าตัวอย่าง Pi Market-NS",
              category: "OTOP / ชุมชน / สินค้าแปรรูป",
              pricePi: 10,
              image: "/product-placeholder.svg",
              status: "ACTIVE"
            },
            {
              id: "DEMO-PRODUCT-002",
              name: "สินค้าชุมชนตัวอย่าง",
              category: "การเกษตร",
              pricePi: 15,
              image: "/product-placeholder.svg",
              status: "ACTIVE"
            }
          ];
          EOF

          cat > app/globals.css <<'EOF'
          :root {
            --background: #f7f8fa;
            --surface: #ffffff;
            --text: #17191c;
            --muted: #707780;
            --border: #e5e7eb;
            --primary: #5b3cc4;
            --primary-dark: #472b9e;
            --danger: #c62828;
          }

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
            min-height: 100%;
            background: var(--background);
            color: var(--text);
            font-family:
              Arial,
              Helvetica,
              sans-serif;
          }

          body {
            padding-bottom: 78px;
          }

          button,
          input {
            font: inherit;
          }

          button {
            cursor: pointer;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .app {
            width: 100%;
            max-width: 640px;
            margin: 0 auto;
            min-height: 100vh;
          }

          .topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            background: var(--surface);
            border-bottom: 1px solid var(--border);
            position: sticky;
            top: 0;
            z-index: 20;
          }

          .brand {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 800;
            font-size: 18px;
          }

          .brand-mark {
            width: 34px;
            height: 34px;
            border-radius: 10px;
            background: var(--primary);
            color: white;
            display: grid;
            place-items: center;
            font-weight: 900;
          }

          .icon-button {
            width: 40px;
            height: 40px;
            border: 0;
            background: transparent;
            border-radius: 50%;
            font-size: 21px;
          }

          .content {
            padding: 16px;
          }

          .welcome {
            margin: 4px 0 16px;
          }

          .welcome h1 {
            margin: 0 0 4px;
            font-size: 23px;
          }

          .welcome p {
            margin: 0;
            color: var(--muted);
          }

          .search {
            width: 100%;
            border: 1px solid var(--border);
            background: white;
            border-radius: 14px;
            padding: 13px 15px;
            outline: none;
          }

          .search:focus {
            border-color: var(--primary);
          }

          .section {
            margin-top: 22px;
          }

          .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 11px;
          }

          .section-header h2 {
            margin: 0;
            font-size: 17px;
          }

          .category-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 9px;
          }

          .category {
            padding: 13px 10px;
            border: 1px solid var(--border);
            background: white;
            border-radius: 13px;
            font-size: 13px;
            text-align: left;
          }

          .category:hover {
            border-color: var(--primary);
          }

          .product-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .product {
            background: white;
            border: 1px solid var(--border);
            border-radius: 15px;
            overflow: hidden;
          }

          .product-image {
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            background: #eceef2;
          }

          .product-body {
            padding: 11px;
          }

          .product-name {
            font-size: 14px;
            line-height: 1.35;
            min-height: 38px;
          }

          .product-category {
            color: var(--muted);
            font-size: 11px;
            margin-top: 5px;
          }

          .price {
            margin-top: 8px;
            font-weight: 800;
          }

          .pi {
            color: var(--primary);
          }

          .notice {
            margin-top: 22px;
            padding: 14px;
            border-radius: 14px;
            background: white;
            border: 1px solid var(--border);
            color: var(--muted);
            font-size: 13px;
            line-height: 1.5;
          }

          .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            max-width: 640px;
            height: 70px;
            background: rgba(255, 255, 255, 0.97);
            border-top: 1px solid var(--border);
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            z-index: 50;
          }

          .nav-item {
            border: 0;
            background: transparent;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            font-size: 11px;
            color: var(--muted);
          }

          .nav-item.active {
            color: var(--primary);
            font-weight: 700;
          }

          .nav-icon {
            font-size: 20px;
          }

          .profile-card {
            background: white;
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 18px;
          }

          .profile-row {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            padding: 12px 0;
            border-bottom: 1px solid var(--border);
          }

          .profile-row:last-child {
            border-bottom: 0;
          }

          .label {
            color: var(--muted);
            font-size: 13px;
          }

          .value {
            font-weight: 700;
            text-align: right;
          }

          .login-button {
            width: 100%;
            border: 0;
            border-radius: 14px;
            padding: 14px;
            background: var(--primary);
            color: white;
            font-weight: 800;
          }

          .login-button:disabled {
            opacity: 0.6;
          }

          .error {
            margin-top: 12px;
            color: var(--danger);
            font-size: 13px;
            line-height: 1.5;
          }

          .loading {
            padding: 40px 16px;
            text-align: center;
            color: var(--muted);
          }

          @media (min-width: 641px) {
            .bottom-nav {
              border-left: 1px solid var(--border);
              border-right: 1px solid var(--border);
            }
          }
          EOF

          cat > app/layout.tsx <<'EOF'
          import type { Metadata } from "next";
          import "./globals.css";

          export const metadata: Metadata = {
            title: "Pi Market-NS",
            description: "Pi Ecosystem Marketplace by Pi Market-NS"
          };

          export default function RootLayout({
            children
          }: Readonly<{
            children: React.ReactNode;
          }>) {
            return (
              <html lang="th">
                <body>{children}</body>
              </html>
            );
          }
          EOF

          cat > app/page.tsx <<'EOF'
          "use client";

          import { useEffect, useState } from "react";
          import Link from "next/link";
          import { MARKETPLACE_CATEGORIES } from "@/types/product";
          import { demoProducts } from "@/lib/products";

          declare global {
            interface Window {
              Pi?: {
                init: (options: {
                  version: string;
                  sandbox?: boolean;
                }) => void;
                authenticate: (
                  scopes: string[],
                  onIncompletePaymentFound: (payment: unknown) => void
                ) => Promise<{
                  accessToken: string;
                  user: {
                    uid: string;
                    username?: string;
                  };
                }>;
              };
            }
          }

          export default function HomePage() {
            const [piReady, setPiReady] = useState(false);
            const [username, setUsername] = useState<string | null>(null);
            const [search, setSearch] = useState("");
            const [loginError, setLoginError] = useState<string | null>(null);
            const [loggingIn, setLoggingIn] = useState(false);

            useEffect(() => {
              const script = document.createElement("script");
              script.src = "https://sdk.minepi.com/pi-sdk.js";
              script.async = true;

              script.onload = () => {
                if (!window.Pi) return;

                window.Pi.init({
                  version: "2.0",
                  sandbox:
                    process.env.NEXT_PUBLIC_PI_SANDBOX === "true"
                });

                setPiReady(true);
              };

              script.onerror = () => {
                setLoginError("ไม่สามารถโหลด Pi SDK ได้");
              };

              document.head.appendChild(script);

              return () => {
                document.head.removeChild(script);
              };
            }, []);

            async function loginWithPi() {
              if (!window.Pi) {
                setLoginError("Pi SDK ยังไม่พร้อม");
                return;
              }

              setLoggingIn(true);
              setLoginError(null);

              try {
                const auth = await window.Pi.authenticate(
                  ["username"],
                  () => {
                    // Build 1 records no payment here.
                    // Incomplete payment handling will be implemented
                    // in the Payment Build.
                  }
                );

                const response = await fetch("/api/auth/pi", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    accessToken: auth.accessToken
                  })
                });

                const data = await response.json();

                if (!response.ok) {
                  throw new Error(
                    data?.message || "Pi Authentication ไม่สำเร็จ"
                  );
                }

                setUsername(data.account.piUsername ?? null);
              } catch (error) {
                setLoginError(
                  error instanceof Error
                    ? error.message
                    : "เกิดข้อผิดพลาดในการเข้าสู่ระบบ"
                );
              } finally {
                setLoggingIn(false);
              }
            }

            const filteredProducts = demoProducts.filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase())
            );

            return (
              <main className="app">
                <header className="topbar">
                  <div className="brand">
                    <div className="brand-mark">π</div>
                    <span>Pi Market-NS</span>
                  </div>

                  <button
                    className="icon-button"
                    aria-label="Notifications"
                    title="การแจ้งเตือน"
                  >
                    🔔
                  </button>
                </header>

                <div className="content">
                  <section className="welcome">
                    <h1>
                      {username
                        ? `สวัสดี, ${username}`
                        : "ยินดีต้อนรับสู่ Pi Market-NS"}
                    </h1>
                    <p>ตลาดซื้อขายสินค้าในระบบ Pi Ecosystem</p>
                  </section>

                  {!username && (
                    <section>
                      <button
                        className="login-button"
                        onClick={loginWithPi}
                        disabled={!piReady || loggingIn}
                      >
                        {!piReady
                          ? "กำลังเตรียม Pi Authentication..."
                          : loggingIn
                            ? "กำลังยืนยันตัวตน..."
                            : "เข้าสู่ระบบด้วย Pi"}
                      </button>

                      {loginError && (
                        <div className="error">{loginError}</div>
                      )}
                    </section>
                  )}

                  <section className="section">
                    <input
                      className="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="ค้นหาสินค้า..."
                      aria-label="ค้นหาสินค้า"
                    />
                  </section>

                  <section className="section">
                    <div className="section-header">
                      <h2>หมวดหมู่สินค้า</h2>
                    </div>

                    <div className="category-grid">
                      {MARKETPLACE_CATEGORIES.map((category) => (
                        <button className="category" key={category}>
                          {category}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="section">
                    <div className="section-header">
                      <h2>สินค้าแนะนำ</h2>
                    </div>

                    <div className="product-grid">
                      {filteredProducts.map((product) => (
                        <article className="product" key={product.id}>
                          <img
                            className="product-image"
                            src={product.image}
                            alt={product.name}
                          />

                          <div className="product-body">
                            <div className="product-name">
                              {product.name}
                            </div>

                            <div className="product-category">
                              {product.category}
                            </div>

                            <div className="price">
                              <span className="pi">π</span>{" "}
                              {product.pricePi}
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="notice">
                    Build 1 ยังไม่มีการสั่งซื้อ การชำระเงิน ยอดคงเหลือ
                    หรือธุรกรรมทางการเงินจริง ข้อมูลสินค้าที่แสดงในหน้านี้
                    เป็นข้อมูลตัวอย่างสำหรับโครงสร้าง Marketplace เท่านั้น
                  </section>
                </div>

                <nav className="bottom-nav">
                  <Link className="nav-item active" href="/">
                    <span className="nav-icon">⌂</span>
                    <span>Home</span>
                  </Link>

                  <Link className="nav-item" href="/cart">
                    <span className="nav-icon">🛒</span>
                    <span>Cart</span>
                  </Link>

                  <Link className="nav-item" href="/chat">
                    <span className="nav-icon">💬</span>
                    <span>Chat</span>
                  </Link>

                  <Link className="nav-item" href="/profile">
                    <span className="nav-icon">👤</span>
                    <span>Profile</span>
                  </Link>
                </nav>
              </main>
            );
          }
          EOF

          cat > app/api/health/route.ts <<'EOF'
          export async function GET() {
            return Response.json({
              ok: true,
              service: "pi-market-ns",
              build: "Build 1",
              timestamp: new Date().toISOString()
            });
          }
          EOF

          cat > app/api/auth/pi/route.ts <<'EOF'
          import { randomUUID } from "crypto";

          interface PiMeResponse {
            uid?: string;
            username?: string;
          }

          /*
           * Build 1 persistence adapter.
           *
           * IMPORTANT:
           * This in-memory implementation is intentionally temporary.
           * It is NOT the production database and must not be used for
           * financial or historical data.
           *
           * The API contract is kept stable so a real database can replace
           * this adapter without changing the frontend authentication flow.
           */

          type StoredAccount = {
            accountId: string;
            piUid: string;
            piUsername: string | null;
            status: "ACTIVE" | "SUSPENDED" | "BANNED" | "CANCELLED";
            roles: Array<"MEMBER" | "VENDOR" | "ADMIN" | "FOUNDER">;
            createdAt: string;
            updatedAt: string;
          };

          const accounts = new Map<string, StoredAccount>();

          function generateAccountId() {
            const suffix = randomUUID()
              .replace(/-/g, "")
              .slice(0, 8)
              .toUpperCase();

            return `PM-${suffix}`;
          }

          export async function POST(request: Request) {
            try {
              const body = await request.json();
              const accessToken = body?.accessToken;

              if (
                typeof accessToken !== "string" ||
                accessToken.length < 10
              ) {
                return Response.json(
                  {
                    ok: false,
                    message: "Invalid Pi Access Token"
                  },
                  { status: 400 }
                );
              }

              const baseUrl =
                process.env.PI_API_BASE_URL || "https://api.minepi.com";

              const apiKey = process.env.PI_API_KEY;

              if (!apiKey) {
                return Response.json(
                  {
                    ok: false,
                    message:
                      "Pi API ยังไม่ได้ตั้งค่า PI_API_KEY บน Backend"
                  },
                  { status: 503 }
                );
              }

              const piResponse = await fetch(`${baseUrl}/v2/me`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "X-API-Key": apiKey,
                  Accept: "application/json"
                },
                cache: "no-store"
              });

              if (!piResponse.ok) {
                return Response.json(
                  {
                    ok: false,
                    message: "Pi Access Token verification failed"
                  },
                  { status: 401 }
                );
              }

              const piUser =
                (await piResponse.json()) as PiMeResponse;

              if (!piUser.uid) {
                return Response.json(
                  {
                    ok: false,
                    message: "Pi verification did not return a UID"
                  },
                  { status: 401 }
                );
              }

              let account = accounts.get(piUser.uid);

              if (!account) {
                const now = new Date().toISOString();

                account = {
                  accountId: generateAccountId(),
                  piUid: piUser.uid,
                  piUsername: piUser.username ?? null,
                  status: "ACTIVE",
                  roles: ["MEMBER"],
                  createdAt: now,
                  updatedAt: now
                };

                accounts.set(piUser.uid, account);
              } else {
                account.piUsername = piUser.username ?? account.piUsername;
                account.updatedAt = new Date().toISOString();
              }

              if (account.status !== "ACTIVE") {
                return Response.json(
                  {
                    ok: false,
                    message: "Account is not active",
                    accountStatus: account.status
                  },
                  { status: 403 }
                );
              }

              return Response.json({
                ok: true,
                account: {
                  accountId: account.accountId,
                  piUsername: account.piUsername,
                  status: account.status,
                  roles: account.roles
                }
              });
            } catch {
              return Response.json(
                {
                  ok: false,
                  message: "Authentication service error"
                },
                { status: 500 }
              );
            }
          }
          EOF

          cat > app/api/me/route.ts <<'EOF'
          export async function GET() {
            return Response.json({
              ok: false,
              message:
                "Session endpoint is reserved for the persistent Account/Session layer."
            });
          }
          EOF

          cat > app/profile/page.tsx <<'EOF'
          "use client";

          import Link from "next/link";

          export default function ProfilePage() {
            return (
              <main className="app">
                <header className="topbar">
                  <div className="brand">
                    <div className="brand-mark">π</div>
                    <span>Profile</span>
                  </div>
                </header>

                <div className="content">
                  <div className="profile-card">
                    <div className="profile-row">
                      <span className="label">Account</span>
                      <span className="value">
                        Pi Market-NS Account
                      </span>
                    </div>

                    <div className="profile-row">
                      <span className="label">Member ID</span>
                      <span className="value">
                        จะแสดงหลัง Pi Authentication
                      </span>
                    </div>

                    <div className="profile-row">
                      <span className="label">Role</span>
                      <span className="value">Member</span>
                    </div>
                  </div>
                </div>

                <nav className="bottom-nav">
                  <Link className="nav-item" href="/">
                    <span className="nav-icon">⌂</span>
                    <span>Home</span>
                  </Link>

                  <Link className="nav-item" href="/cart">
                    <span className="nav-icon">🛒</span>
                    <span>Cart</span>
                  </Link>

                  <Link className="nav-item" href="/chat">
                    <span className="nav-icon">💬</span>
                    <span>Chat</span>
                  </Link>

                  <Link className="nav-item active" href="/profile">
                    <span className="nav-icon">👤</span>
                    <span>Profile</span>
                  </Link>
                </nav>
              </main>
            );
          }
          EOF

          cat > app/cart/page.tsx <<'EOF'
          import Link from "next/link";

          export default function CartPage() {
            return (
              <main className="app">
                <header className="topbar">
                  <div className="brand">
                    <div className="brand-mark">π</div>
                    <span>Cart</span>
                  </div>
                </header>

                <div className="content">
                  <div className="notice">
                    ตะกร้าสินค้าจะถูกเชื่อมกับ Cart/Checkout Backend
                    ใน Build ที่เปิดใช้ความสามารถนี้จริง
                    ตอนนี้ยังไม่มีการจอง Stock หรือ Lock ราคา
                  </div>
                </div>

                <nav className="bottom-nav">
                  <Link className="nav-item" href="/">
                    <span className="nav-icon">⌂</span>
                    <span>Home</span>
                  </Link>

                  <Link className="nav-item active" href="/cart">
                    <span className="nav-icon">🛒</span>
                    <span>Cart</span>
                  </Link>

                  <Link className="nav-item" href="/chat">
                    <span className="nav-icon">💬</span>
                    <span>Chat</span>
                  </Link>

                  <Link className="nav-item" href="/profile">
                    <span className="nav-icon">👤</span>
                    <span>Profile</span>
                  </Link>
                </nav>
              </main>
            );
          }
          EOF

          cat > app/chat/page.tsx <<'EOF'
          import Link from "next/link";

          export default function ChatPage() {
            return (
              <main className="app">
                <header className="topbar">
                  <div className="brand">
                    <div className="brand-mark">π</div>
                    <span>Chat</span>
                  </div>
                </header>

                <div className="content">
                  <div className="notice">
                    Shop Chat และ Pi Market Help
                    จะเชื่อมกับระบบ Chat จริงใน Build ที่เกี่ยวข้อง
                    โดย Chat จะไม่เป็น Source of Truth ของ Order,
                    Payment หรือ Financial Ledger
                  </div>
                </div>

                <nav className="bottom-nav">
                  <Link className="nav-item" href="/">
                    <span className="nav-icon">⌂</span>
                    <span>Home</span>
                  </Link>

                  <Link className="nav-item" href="/cart">
                    <span className="nav-icon">🛒</span>
                    <span>Cart</span>
                  </Link>

                  <Link className="nav-item active" href="/chat">
                    <span className="nav-icon">💬</span>
                    <span>Chat</span>
                  </Link>

                  <Link className="nav-item" href="/profile">
                    <span className="nav-icon">👤</span>
                    <span>Profile</span>
                  </Link>
                </nav>
              </main>
            );
          }
          EOF

          cat > public/product-placeholder.svg <<'EOF'
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
            <rect width="600" height="600" fill="#eceef2"/>
            <circle cx="300" cy="240" r="90" fill="#5b3cc4"/>
            <text
              x="300"
              y="270"
              text-anchor="middle"
              font-family="Arial"
              font-size="110"
              fill="white"
              font-weight="700"
            >π</text>
            <text
              x="300"
              y="390"
              text-anchor="middle"
              font-family="Arial"
              font-size="34"
              fill="#555"
            >Pi Market-NS</text>
          </svg>
          EOF

          cat > README_BUILD1.md <<'EOF'
          # Pi Market-NS — Build 1

          Build 1 establishes the foundation for:

          - Pi Authentication
          - Verified Pi UID mapping
          - Internal Account ID PM-XXXXXXXX
          - Member role foundation
          - Account status foundation
          - Home Marketplace UI
          - Search UI
          - 10 official marketplace categories
          - Cart / Chat / Profile navigation
          - Backend API boundary

          ## Important

          Build 1 does NOT create:

          - fake payments
          - fake orders
          - fake balances
          - fake financial transactions
          - fake blockchain transaction IDs

          Demo products are display-only seed data.

          ## Authentication

          Frontend:

          Pi Browser
          -> Pi SDK
          -> Pi.authenticate()
          -> Access Token

          Backend:

          Access Token
          -> Pi Platform /v2/me
          -> Verified Pi UID
          -> Internal Account
          -> PM-XXXXXXXX

          ## Future relationship

          Account
          -> Vendor
          -> Shop
          -> Product
          -> Stock
          -> Cart
          -> Checkout
          -> Order
          -> Payment
          -> Shipping
          -> Settlement
          -> Vendor Payout
          -> Financial Ledger

          Account
          -> Admin
          -> Permission
          -> Scope
          -> Action
          -> Audit Log

          Account
          -> Founder
          -> Governance
          -> Change Control
          EOF

          npm install
          npm run build

          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

          git add .
          git commit -m "build: bootstrap Pi Market-NS Build 1" || echo "Nothing to commit"
          git push

      - name: Build 1 completed
        run: |
          echo "Pi Market-NS Build 1 bootstrap completed."
