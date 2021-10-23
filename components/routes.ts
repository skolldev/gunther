import { HomeIcon, UsersIcon } from "@heroicons/react/solid";

const topbarNavigation: { name: string; href: string }[] = [];

const sidebarNavigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Contacts", href: "/contacts", icon: UsersIcon },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

export { topbarNavigation, sidebarNavigation, userNavigation };
