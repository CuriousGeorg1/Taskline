"use client";
// imprts icons for the sidebar
import {
  Camera,
  Settings,
  ClipboardList,
  LogOut,
  Briefcase,
} from "lucide-react";

// Imports the necessary components for the sidebar
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { signOut } from "next-auth/react";

/* Group: Application.
 * This group contains the main application links.
 * Each item has a title, URL, and an icon.
 */
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Briefcase,
  },
  {
    title: "Photos",
    url: "/photos",
    icon: Camera,
  },
  {
    title: "Journal",
    url: "/journal",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

// Group: Actions.
// This group can be used for actions like sign out.

const actions = [
  {
    title: "Sign Out",
    action: signOut,
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {actions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={async () => item.action()}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
