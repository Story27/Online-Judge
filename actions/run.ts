"use server";

import { generateFile } from "./generateFile";
import { generateInputFile } from "./generateInputFile";
import { executeCpp } from "./executeCpp";
import fs from "fs";

export async function runCode(language: string, code: string, input: string) {
  if (!code) {
    throw new Error("Empty code!");
  }

  try {
    console.log("Generating file...");
    const filePath = await generateFile(language, code);
    console.log("File generated:", filePath);

    console.log("Generating input file...");
    const inputFilePath = await generateInputFile(input);
    console.log("Input file generated:", inputFilePath);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Generated file not found: ${filePath}`);
    }
    if (!fs.existsSync(inputFilePath)) {
      throw new Error(`Generated input file not found: ${inputFilePath}`);
    }

    console.log("Executing C++...");
    const output = await executeCpp(filePath, inputFilePath);
    console.log("Execution complete");

    return output;
  } catch (error) {
    console.error("Error in runCode:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
