import { renderIllustrations } from "./ui.js";

const res = await fetch("http://localhost:3000/api/illustrations");
console.log("Fetched response:", res);

const data = await res.json();

console.log("Fetched illustrations:", data);

renderIllustrations(data);
