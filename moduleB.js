import { publicFn as fn, publicVal as val } from "./moduleA.js";
fn();
fn();
fn();
console.log(val++);
console.log(val++);
console.log(val++);
fn();