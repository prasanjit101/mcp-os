'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

export default function Dashboard() {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (!session && !isPending) {
			router.push('/login');
		}
	}, [session, isPending]);

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto">
			<h1 className="text-2xl font-bold">Connections</h1>
			<p>Connections will be listed here</p>
		</div>
	);
}
