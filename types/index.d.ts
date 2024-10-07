import { selectedIcons } from "@/components/admin/Icon";

export interface SidebarLink {
  icon: keyof typeof selectedIcons;
  route: string;
  label: string;
  children?: SidebarLink[];
}

export default interface BaseResponse {
  success: boolean;
  data: any;
  message: string;
}

export interface ParamsProps {
  params: { id: string };
}

export interface ParamsSlugProps {
  params: { slug: string };
}
