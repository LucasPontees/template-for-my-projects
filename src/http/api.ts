import ky from "ky";
import { env } from "@/env";

export const apiForm = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  retry: 0,
  timeout: 30000,
  hooks: {
    beforeRequest: [
      (request): void => {
        request.headers.set("Accept", "application/json");
      },
    ],
  },
});
