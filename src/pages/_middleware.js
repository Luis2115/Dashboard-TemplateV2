import { NextResponse } from "next/server";
import React from "react";
import Cookies from "js-cookie";

export default function middleware(req) {
  // const { cookies } = req;
  // const url = req.url;
  // const tokens = cookies.token;
  // const validation = [
  //   "/dashboard",
  //   "/settings",
  //   "/account",
  //   "/customers",
  // ];
  // if (validation.some((value) => url.includes(value))) {
  //   if (tokens === undefined) {
  //     return NextResponse.redirect("/");
  //   }
  //   try {
  //     return NextResponse.next();
  //   } catch (error) {
  //     return NextResponse.redirect("/");
  //   }
  // }
  // return NextResponse.next();
}
