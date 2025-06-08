"use client";
import { useEffect } from "react";

export default function ThemeScript() {
	useEffect(() => {
		const hour = new Date().getHours();
		if (hour >= 19) {
			document.documentElement.setAttribute("data-theme", "dark");
		} else {
			document.documentElement.removeAttribute("data-theme");
		}
	}, []);
	return null;
}
