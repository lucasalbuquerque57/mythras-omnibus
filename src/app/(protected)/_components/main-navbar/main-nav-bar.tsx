'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList, navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ProfileDropdowns } from "@/app/(protected)/_components/main-navbar/profile-drop";
import {ModeToggle} from "@/app/(protected)/_components/main-navbar/toggle-darkmode";


export const NavBar = () => {
  return (
        <nav
            className={cn("fixed top-0 left-0 right-0 z-50 border-b px-4 py-4 h-14",
                "flex items-center justify-between bg-background")}
        >
          <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/settings" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "text-2xl hover:bg-transparent focus:bg-transparent flex items-center gap-2 font-semibold", // Add custom styles
                        )}
                    >
                      Bearnardo
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/settings" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Atual
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/character/new" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "text-muted-foreground",
                        )}
                    >
                      Personagens
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/settings" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "text-muted-foreground",
                        )}
                    >
                      Campanhas
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
          </NavigationMenu>

          {/*SEARCH PORTION*/}

          {/*<div>
            <Input
                type="search"
                placeholder="Procurar..."
                className="md:w-[100px] lg:w-[300px]"
            />
          </div>*/}

          {/*PROFILE PORTION*/}
          <div className="flex items-center gap-4">
            <ModeToggle/>
            <ProfileDropdowns/>
          </div>
        </nav>

    );
};

export default NavBar;


