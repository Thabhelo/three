import { Link } from "wouter";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { isFirebaseConfigured } from "@/lib/firebase";

type AdminHintLinkProps = {
  loginHref: string;
};

export default function AdminHintLink({ loginHref }: AdminHintLinkProps) {
  const { user, signOutAdmin } = useAdminAuth();

  if (!isFirebaseConfigured()) return null;

  const className = "font-label text-[11px] text-white/25 transition-colors hover:text-white/50";

  if (user) {
    return (
      <button type="button" onClick={() => void signOutAdmin()} className={className}>
        signout
      </button>
    );
  }

  return (
    <Link href={loginHref} className={className}>
      admin?
    </Link>
  );
}
