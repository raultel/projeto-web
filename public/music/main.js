import { renderReleases } from "./ui.js";

const res = await fetch("http://localhost:3000/api/releases");
console.log("Fetched response:", res);

const data = await res.json();

console.log("Fetched releases:", data);

renderReleases(data);
