import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    redirect("/auth/login");
  }
}
