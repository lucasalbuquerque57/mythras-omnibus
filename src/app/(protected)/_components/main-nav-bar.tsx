'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuList, navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import Link from "next/link"
import { cn } from "@/lib/cn";

export const NavBar = () => {
  return (
        <nav
            className={cn("fixed top-0 left-0 right-0 z-50 border px-4 py-4",
                "flex items-center justify-between")}
        >
          <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Bearnardo
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Personagens
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Campanhas
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
          </NavigationMenu>

        </nav>

    );
};

export default NavBar;


