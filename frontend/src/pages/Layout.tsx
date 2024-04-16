import {
  LoaderFunctionArgs,
  Outlet,
  redirect,
  RouteObject
} from "react-router-dom";
import {authProvider} from "../auth.ts";
import {LOGIN_URL} from "./Login.tsx";

async function loader({request}: LoaderFunctionArgs) {
  if (authProvider.getUserName()) {
    return null;
  }

  const pathName = new URL(request.url).pathname;
  if (pathName === '/') {
    return redirect(LOGIN_URL);
  }

  const params = new URLSearchParams();
  params.set("from", pathName);

  return redirect(`${LOGIN_URL}?${params.toString()}`);
}

function Layout() {
  return (
    <div>
      <h1>App</h1>
      <Outlet/>
    </div>
  );
}

export const appLayoutRoute: RouteObject = {
  path: '/',
  loader,
  Component: Layout
};
