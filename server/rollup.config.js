import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import { keys } from "ramda";

import * as pkg from "./package.json";

export default {
  input: "./index.ts",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [
    typescript({
      exclude: ["node_modules"],
    }),
    commonjs(),
    babel({ babelHelpers: "bundled" }),
    getBabelOutputPlugin({
      presets: ["@babel/preset-env"],
    }),
  ],
  output: [
    { file: "dist/bundle.cjs.js", format: "cjs" },
    { file: "dist/bundle.esm.js", format: "esm" },
  ],
  external: keys(pkg.dependencies),
};
