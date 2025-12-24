import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useRecordVisit() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.visits.record.path, {
        method: api.visits.record.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}), // Schema omits everything, so empty object is valid
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error("Failed to record visit");
      }
      
      return api.visits.record.responses[201].parse(await res.json());
    },
  });
}
