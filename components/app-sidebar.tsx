'use client';

import { Bot, LayoutDashboard, SquareTerminal } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const data = {
    user: {
      name: 'john doe',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
        isActive: pathname === '/dashboard',
      },
      {
        title: 'Bankrolls',
        url: '#',
        icon: SquareTerminal,
        items: [
          {
            title: 'All Bankrolls',
            url: '/bankrolls',
            isActive: pathname === '/bankrolls',
          },
          {
            title: 'Create Bankroll',
            url: '/bankrolls/new',
            isActive: pathname === '/bankrolls/new',
          },
        ],
      },
      {
        title: 'Transactions',
        url: '#',
        icon: Bot,
        items: [
          {
            title: 'Deposit / Withdraw',
            url: '/transactions',
            isActive: pathname === '/transactions',
          },
        ],
      },
      // {
      //   title: 'Settings',
      //   url: '#',
      //   icon: Settings2,
      //   isActive: pathname.startsWith('/settings'),
      //   items: [
      //     {
      //       title: 'General',
      //       url: '#',
      //     },
      //     {
      //       title: 'Billing',
      //       url: '#',
      //     },
      //     {
      //       title: 'Limits',
      //       url: '#',
      //     },
      //   ],
      // },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/dashboard">BkWiser</Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
