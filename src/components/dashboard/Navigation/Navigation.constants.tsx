import { LayoutDashboard, Tags } from "lucide-react";

const NAVIGATION_CONSTANTS = [
  {
    key: "dashboard",
    label: "Dasboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
  },
  {
    key: "categories",
    label: "Categories",
    href: "/categories",
    icon: <Tags className="mr-2 h-4 w-4" />,
  },
];

export default NAVIGATION_CONSTANTS;
