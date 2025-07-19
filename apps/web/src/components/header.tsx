"use client";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  const links = [
			{ to: '/', label: 'Home' },
			{ to: '/dashboard', label: 'Dashboard' },
			{ to: '/connections', label: 'Connections' },
		];

  return (
			<div className="flex flex-row items-center justify-between border-b px-4 py-2">
				<nav className="flex gap-4 text-lg">
					{links.map(({ to, label }) => {
						return (
							<Link key={to} href={to}>
								{label}
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</div>
		);
}
