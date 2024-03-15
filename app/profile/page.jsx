"use client";

import { Card, Icon } from "@/components/card";
import { PfCard } from "@/components/PfCard";
import NavBar from "@/components/navbar";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  return (
    user && (
      <div>
        <NavBar />
      </div>
    )
  );
}
