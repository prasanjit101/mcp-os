'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { trpc } from '@/utils/trpc';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

export default function ApiKeyManager() {
	const { data: session } = authClient.useSession();
	const userId = session?.user.id;
	const [name, setName] = useState('');

	// List API keys
	const apiKeysQuery = useQuery(
		trpc.apiKey.list.queryOptions(
			{ userId: userId || '' },
			{ enabled: !!userId },
		),
	);

	// Create API key
	const createApiKey = useMutation(
		trpc.apiKey.create.mutationOptions({
			onSuccess: () => {
				setName('');
				apiKeysQuery.refetch();
			},
		}),
	);

	// Delete API key
	const deleteApiKey = useMutation(
		trpc.apiKey.delete.mutationOptions({
			onSuccess: () => apiKeysQuery.refetch(),
		}),
	);

	if (!userId)
		return <div className="my-4">Please log in to manage API keys.</div>;

	return (
		<Card className="p-6 my-8 w-full max-w-2xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">API Keys</h2>
			{/* Create API Key Form */}
			<form
				className="flex gap-2 mb-6"
				onSubmit={(e) => {
					e.preventDefault();
					createApiKey.mutate({ name, userId, key: '', id: '' });
				}}
			>
				<Input
					placeholder="API Key Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<Button type="submit" disabled={createApiKey.isPending || !name}>
					{createApiKey.isPending ? 'Creating...' : 'Create Key'}
				</Button>
			</form>

			{/* List API Keys */}
			<div className="overflow-x-auto">
				<table className="min-w-full border text-sm">
					<thead>
						<tr className="bg-neutral-800">
							<th className="px-3 py-2 text-left">Name</th>
							<th className="px-3 py-2 text-left">Key ID</th>
							<th className="px-3 py-2 text-left">Created</th>
							<th className="px-3 py-2 text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{apiKeysQuery.data?.map((key) => (
							<tr key={key.id} className="border-t">
								<td className="px-3 py-2">{key.name}</td>
								<td className="px-3 py-2 font-mono text-xs">{key.id}</td>
								<td className="px-3 py-2">
									{key.createdAt
										? new Date(key.createdAt).toLocaleString()
										: 'N/A'}
								</td>
								<td className="px-3 py-2">
									<Button
										variant="destructive"
										size="sm"
										onClick={() =>
											deleteApiKey.mutate({ keyId: key.id, userId })
										}
										disabled={deleteApiKey.isPending}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
						{apiKeysQuery.data?.length === 0 && (
							<tr>
								<td colSpan={4} className="text-center py-4 text-gray-500">
									No API keys found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</Card>
	);
}
