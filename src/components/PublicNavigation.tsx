import Link from 'next/link';

export default function PublicNavigation() {
  return (
    <nav className="flex gap-4">
      <Link href="/" className="text-blue-500 underline">Home</Link>
      <Link href="/about" className="text-blue-500 underline">About public</Link>
      <Link href="/myProfile" className="text-blue-500 underline">My Profile</Link>
    </nav>
  );
}
