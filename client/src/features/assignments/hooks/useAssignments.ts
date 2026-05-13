import { useEffect, useState, useCallback } from "react";
import type { Affectation, AffectationPayload } from "@/features/assignments/types";
import { assignmentService } from "../api/assignmentService";

export function useAssignments() {
  const [data, setData] = useState<Affectation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await assignmentService.getAll();
      setData(result ?? []);
    } catch {
      setError("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const create = useCallback(async (payload: AffectationPayload) => {
    return await assignmentService.create(payload);
  }, []);

  const getAll = useCallback(async () => {
    return await assignmentService.getAll();
  }, []);

  const getById = useCallback(async (id: string) => {
    return await assignmentService.getById(id);
  }, []);

  const update = useCallback(async (id: string, payload: Partial<AffectationPayload>) => {
    return await assignmentService.update(id, payload);
  }, []);

  const remove = useCallback(async (id: string) => {
    await assignmentService.remove(id);
    return true;
  }, []);

  return { data, loading, error, refetch: fetchData, getAll, getById, create, update, remove };
}
