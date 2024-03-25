"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import Container from "../Container/Container";
import { Heart, List, LogOut, Plus, User } from "lucide-react";
import { signOut } from "next-auth/react";

type Props = {
  user?: {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
};

export default function Navbar({ user }: Props) {
  const segments = useSelectedLayoutSegments();

  return (
    <nav>
      <Container className="flex items-center justify-between py-10">
        <Link href="/">MM</Link>

        {!user && (
          <Link className="btn btn-primary" href="/auth">
            Inicia sesión
          </Link>
        )}

        {user && (
          <div className="flex items-center gap-6">
            {segments?.length !== 2 && !segments.includes("new") && (
              <Link href="/posts/new" className="btn btn-primary">
                <Plus />
                Publicar anuncio
              </Link>
            )}

            <div className="dropdown dropdown-end">
              <div className="avatar" tabIndex={0} role="button">
                <div className="w-12 rounded-full">
                  <img src={user?.image as string} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content mt-4 z-[1] menu p-2 shadow-md rounded-box w-64 text-base border border-gray-100"
              >
                <li className="py-1">
                  <Link href="account">
                    <User className="mr-0.5" />
                    Mi cuenta
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="posts/mine">
                    <List className="mr-0.5" /> Mis anuncios
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="posts/liked">
                    <Heart className="mr-0.5" /> Anuncios guardados
                  </Link>
                </li>
                <li className="py-1">
                  <p onClick={() => signOut()}>
                    <LogOut className="mr-0.5" /> Cerrar sesión
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
