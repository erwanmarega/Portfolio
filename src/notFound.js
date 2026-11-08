import "./assets/main.css";
import { createAsciiRenderer, effects } from "./lib/ascii";

const canvas = document.getElementById("shark");
if (canvas) createAsciiRenderer(canvas, effects.pixelShark({ loop: true }));
