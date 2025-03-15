'use client'
import { useWorkspaceRedirect } from "@/features/workspace/hooks/useWorkspaceRedirect";


export default function Home() {
  useWorkspaceRedirect();

  return <div>Loading...</div>;
}
