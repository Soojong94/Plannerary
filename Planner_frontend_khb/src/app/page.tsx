// app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/Home"); // 원하는 경로로 리다이렉션
}
