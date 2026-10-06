import { NextResponse } from "next/server";
const PI_ME_URL = "https://api.minepi.com/v2/me";
export async function POST(request: Request) {
  try {
    const authorization = request.headers.get("authorization");
    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing Pi Access Token",
        },
        { status: 401 }
      );
    }
    const accessToken = authorization.slice("Bearer ".length).trim();
    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Pi Access Token",
        },
        { status: 401 }
      );
    }
    const piResponse = await fetch(PI_ME_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    if (!piResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Pi Authentication verification failed",
        },
        { status: 401 }
      );
    }
    const piData = await piResponse.json();
    if (
      !piData?.user?.uid ||
      !piData?.user?.username
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid response from Pi Platform API",
        },
        { status: 502 }
      );
    }
    return NextResponse.json({
      success: true,
      user: {
        uid: piData.user.uid,
        username: piData.user.username,
      },
    });
  } catch (error) {
    console.error("Pi verification error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
