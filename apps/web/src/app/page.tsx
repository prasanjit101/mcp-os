'use client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { trpc } from '@/utils/trpc';

export default function Home() {
	const healthCheck = useQuery(trpc.healthCheck.queryOptions());

	return (
		<div className="container mx-auto max-w-3xl px-4 py-2">
			<div className="grid gap-6">
				<section className="rounded-lg border p-6 space-y-6 shadow-sm">
					<h1 className="text-3xl font-bold mb-3">Welcome to MCP OS</h1>
					<p className="text-lg">
						The MCP ecosystem is scattered. We want to change that.
					</p>
					<p>TLDR: MCP OS is a hosted MCP servers platform</p>
					<p>
						people can come in, authorize their external apps, obtain an MCP
						server URL, and use the url to connect their ai agents to external
						apps.
					</p>
					<ul className="list-disc pl-4 mb-4 space-y-1">
						<li>
							<span className="font-medium">Fast Integration:</span> Instantly
							connect your apps to hosted MCP servers with minimal setup.
						</li>
						<li>
							<span className="font-medium">Developer Friendly:</span> Built
							with TypeScript, Next.js, and modern tooling for a smooth
							developer experience.
						</li>
						<li>
							<span className="font-medium">Secure & Scalable:</span> Robust
							authentication, rate limiting, and API key management out of the
							box.
						</li>
						<li>
							<span className="font-medium">Open Source:</span> Join a growing
							community and contribute to the future of cloud integrations.
						</li>
					</ul>
					<div className="flex flex-col sm:flex-row gap-3 mt-4">
						<Button asChild>
							<a
								href="https://github.com/your-org/mcp-os"
								target="_blank"
								className="text-white"
								rel="noopener noreferrer"
							>
								Star on GitHub
							</a>
						</Button>
					</div>
				</section>
				<section className="rounded-lg border p-4">
					<h2 className="mb-2 font-medium">Health Check</h2>
					<div className="flex items-center gap-2">
						<div
							className={`h-2 w-2 rounded-full ${healthCheck.data ? 'bg-green-500' : 'bg-red-500'}`}
						/>
						<span className="text-sm text-muted-foreground">
							{healthCheck.isLoading
								? 'Checking...'
								: healthCheck.data
									? 'Connected'
									: 'Disconnected'}
						</span>
					</div>
				</section>
			</div>
		</div>
	);
}
