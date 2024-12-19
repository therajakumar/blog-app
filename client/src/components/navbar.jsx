import { getUserData, logout } from "@/lib/user";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/theme-utils";
import {
  LogOut,
  MenuIcon,
  Moon,
  PanelRightDashed,
  Paperclip,
  PlusCircle,
  Sun,
} from "lucide-react";
import { toast } from "sonner";

function Navbar() {
  const navigate = useNavigate();
  const { userid } = getUserData();

  const { theme, setTheme } = useTheme();

  return (
    <div className="p-5 bg-transparent w-full flex items-center justify-between  fixed top-0 z-10">
      <div className="text-2xl font-semibold flex gap-3">
        <MountainIcon />
        <div>
          <span className="text-rose-500">Lamp</span>Stack
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        {!userid && <Button onClick={() => navigate("/login")}>Login</Button>}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  if (userid) {
                    navigate("/addBlog");
                  } else {
                    navigate("/login");
                    toast.error("Please login to write a blog");
                  }
                }}
                className={userid ? "" : "text-muted-foreground"}
              >
                <Paperclip className="mr-2 h-4 w-4" />
                <span>Write a Blog</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/blogs")}>
                <PanelRightDashed className="mr-2 h-4 w-4" />
                <span>View All Blogs</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {theme === "light" ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  <span>
                    {theme.slice(0, 1).toLocaleUpperCase() + theme.slice(1)}
                  </span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            {userid && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default Navbar;
