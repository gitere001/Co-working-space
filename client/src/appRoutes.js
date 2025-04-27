import { lazy } from "react"

import LandingPage from "./pages/LandingPage"
const LoginPage = lazy(()=>import("./pages/Login"))
const SignUpPage = lazy(()=>import("./pages/Signup"))
const ForgetPasswordPage = lazy(()=>import("./pages/ForgetPassword"))
const NotFound = lazy(() => import("./pages/Notfound"))
const Home = lazy(() => import("./pages/Home"))
const Notification = lazy(() => import("./pages/Notifications"))
const Profiles = lazy(() => import("./pages/Profiles"))


export const appRoutes = [
	{ path: "/", component: LandingPage },
	{ path: "/login", component: LoginPage },
	{ path: "/signup", component: SignUpPage },
	{ path: "/reset-password", component: ForgetPasswordPage },
	{ path: "/About", component: LandingPage },
	{ path: "/featured", component: LandingPage },
	{ path: "/pricing", component: LandingPage },
	{ path: "/testimonials", component: LandingPage },
	{ path: "/home", component: Home, requireAuth: true },
	{ path: "/home/notifications", component: Notification, requireAuth: true},
	{ path: "/home/profiles", component: Profiles, requireAuth: true},
	{path: "*", component: NotFound}

]

