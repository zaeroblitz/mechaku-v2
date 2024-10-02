/* eslint-disable no-unused-vars */
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAdminPermissions(adminId: string) {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    include: {
      role: {
        include: {
          rolesPermissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!admin) return [];

  return admin.role.rolesPermissions.map((rp) => rp.permission.name);
}

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to the login page
    if (request.nextUrl.pathname === "/admin") {
      return NextResponse.next();
    }

    // If there are no token, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Check if the user has the admin or superadmin role
    if (token.role !== "Admin" && token.role !== "Super Admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Special case for "/admin/admins" route
    if (
      (request.nextUrl.pathname === "/admin/admins" ||
        request.nextUrl.pathname === "/admin/roles" ||
        request.nextUrl.pathname === "/admin/permissions") &&
      token.role !== "Super Admin"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // For other routes, check permissions if needed
    // const permissions = await getAdminPermissions(token.id as string)

    // You can add more specific permission checks here if needed
    // For example:
    // if (request.nextUrl.pathname === '/admin/some-protected-route' && !permissions.includes('some-specific-permission')) {
    //   return NextResponse.redirect(new URL('/unauthorized', request.url))
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
