import { Link } from "wouter";
import { useAdminAuth } from "@/hooks/use-admin-auth";

type AdminHintLinkProps = {
  loginHref: string;
};

export default function AdminHintLink({ loginHref }: AdminHintLinkProps) {
  const { user, signOutAdmin } = useAdminAuth();

  const className = "font-label text-[11px] text-white/40 transition-colors hover:text-white/70";

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
