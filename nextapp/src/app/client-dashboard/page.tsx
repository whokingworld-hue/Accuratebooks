import RequireRole from '@/components/RequireRole';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

export default function ClientDashboard() {
	return (
		<AuthProvider>
			<Navbar />
			<RequireRole roles={["client","staff","ca","admin"]}>
				<main className="max-w-6xl mx-auto p-6">
					<h1 className="text-2xl font-semibold">Client Dashboard</h1>
				</main>
			</RequireRole>
		</AuthProvider>
	);
}

