import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const redirectURL = new URL("/", request.url);

  // Limpando o cookie
  return NextResponse.redirect(redirectURL, {
    headers: {
      "Set-Cookie": `token=; Path=/; max-age=0;`,
    },
  });
}
