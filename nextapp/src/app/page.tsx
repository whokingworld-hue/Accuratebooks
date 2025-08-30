import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Welcome to AccurateBooks</h1>
        <p className="text-gray-500 mt-2">Please login to continue.</p>
      </main>
    </AuthProvider>
  );
}
