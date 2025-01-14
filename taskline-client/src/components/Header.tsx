import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import AvatarMenu from "./AvatarMenu";
import { auth } from "@/authConfig";
import { ModeToggle } from "./ui/mode-toggle";

export default async function Header() {
  const session = await auth();
  return (
    <NavigationMenu className="px-4 md:px-48 py-3 max-w-full w-full shadow-md justify-between fixed top-0 right-0 border-b backdrop-opacity-75 backdrop-blur-lg">
      <Link href="/">
        <p className="bg-primary text-primary-foreground text-xl rounded-md px-2 py-1">
          Taskline
        </p>
      </Link>
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <Link href="/journal" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Journal
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/photos" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Photos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {session ? (
          <AvatarMenu user={session.user} />
        ) : (
          <NavigationMenuItem>
            <Link href="/auth/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Login
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
        <ModeToggle />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
