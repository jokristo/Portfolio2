import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { CV_PATH } from "@/content/profile";

/** True when the CV PDF is present in public/, so the download button can be shown. */
export const cvAvailable = () => CV_PATH !== "" && existsSync(join(process.cwd(), "public", CV_PATH));
