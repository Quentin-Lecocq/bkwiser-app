'use client';

import { BookOpen, Bot, Settings2, SquareTerminal } from 'lucide-react';
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

// This is sample data.
const data = {
  user: {
    name: 'john doe',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },

  navMain: [
    {
      title: 'Bankrolls',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'All Bankrolls',
          url: '/bankroll',
        },
        {
          title: 'Create Bankroll',
          url: '/bankroll/new',
        },
      ],
    },
    {
      title: 'Bets',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'My Bets',
          url: '/bets',
        },
        {
          title: 'New Bet',
          url: '/bets/new',
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
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
