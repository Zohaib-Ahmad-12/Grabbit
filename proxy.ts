// import { NextResponse,NextRequest } from "next/server";
// import jwt from 'jsonwebtoken';


// export function proxy(req:NextRequest) {
    

//     const token=req.cookies.get('adminToken')?.value

//     if (!token){
//         console.log('no token found /////////////')
//         return NextResponse.redirect( new URL('/',req.url)  )
//     }

//     try {
//         jwt.verify(token,process.env.JWT_SECRET!)
//         return NextResponse.next()
//     } catch (error) {
//          return NextResponse.redirect( new URL('/',req.url)  )
//     }
//     }
// export const config = {
//     matcher: ["/authorized"],
// };
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

function hasValidToken(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loggedIn = hasValidToken(req);

  if (pathname === "/" && loggedIn) {
    return NextResponse.redirect(new URL("/authorized", req.url));
  }
  if (pathname.startsWith("/authorized") && !loggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/authorized/:path*"],
};