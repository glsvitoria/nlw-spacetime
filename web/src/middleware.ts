import { NextRequest, NextResponse } from "next/server";

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    // Redirecionando direto para a rota de login para poder logar o usuário automaticamente
    return NextResponse.redirect(signInURL, {
      headers: {
        // HttpOnly -> o usuário não conseguirá ver, apenas a camada backend do next
        "Set-Cookie": `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`,
      },
    });
  }

  return NextResponse.next();
}

// Rotas que o usuário apenas poderá acessar quando tiver logado
export const config = {
  matcher: "/memories/:path*",
};
