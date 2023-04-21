import type { Session } from "next-auth";
import { signIn, SignInResponse, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { z } from "zod";

const UUID_KEY = "uuid";

type Provider = "google" | "github";

interface Auth {
  signIn: (provider?: Provider) => any;
  signOut: () => any;
  status: "authenticated" | "unauthenticated" | "loading";
  session: Session | null;
}

export function useAuth(): Auth {
  const { data: session, status } = useSession();
  //const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    if (status != "authenticated" || !session?.user) return;

    const user = session.user;
    z.string()
      .uuid()
      .parseAsync(user.email)
      .then((uuid) => window.localStorage.setItem(UUID_KEY, uuid))

    // Fetch CSRF token
    /*fetch("/api/csrf-token")
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch(() => setCsrfToken(""));
      .catch(() => undefined);
  }, [session, status]);*/
})

  const handleSignIn = async () => await signIn();
  //const handleSignIn = async () => await signIn("google", { update: true, csrfToken });

  const handleSignOut = async () => {
    return await signOut({
      callbackUrl: "/",
    }).catch();
  };

  return {
    signIn: handleSignIn,
    signOut: handleSignOut,
    status,
    session,
  };
}
