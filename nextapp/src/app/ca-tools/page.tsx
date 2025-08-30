import RequireRole from '@/components/RequireRole';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

export default function CaToolsPage() {
	return (
		<AuthProvider>
			<Navbar />
			<RequireRole roles={["ca","admin"]}>
				<main className="max-w-6xl mx-auto p-6">
					<h1 className="text-2xl font-semibold">CA Tools</h1>
				</main>
			</RequireRole>
		</AuthProvider>
	);
}

