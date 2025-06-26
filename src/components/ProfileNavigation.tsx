import Link from 'next/link';

export default function ProfileNavigation() {
  return (
    <nav className="flex flex-col gap-2">
      <Link href="/" className="text-blue-500 underline">Home</Link>
      <Link href="/about" className="text-blue-500 underline">About private</Link>
      <Link href="/myProfile" className="text-blue-500 underline">My Profile</Link>
    </nav>
  );
}
