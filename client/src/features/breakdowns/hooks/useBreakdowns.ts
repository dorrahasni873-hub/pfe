import { useEffect, useState, useCallback } from "react";
import type { Panne, CreatePanne, UpdatePanne } from "@/features/breakdowns/types";
import { breakdownService } from "../api/breakdownService";

export function useBreakdowns() {
  const [data, setData] = useState<Panne[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await breakdownService.getAll();
      setData(result ?? []);
    } catch {
      setError("Failed to load breakdowns");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const getAll = useCallback(async () => {
    return await breakdownService.getAll();
  }, []);

  const getById = useCallback(async (id: string) => {
    return await breakdownService.getById(id);
  }, []);

  const create = useCallback(async (payload: CreatePanne) => {
    return await breakdownService.create(payload);
  }, []);

  const update = useCallback(async (id: string, payload: UpdatePanne) => {
    return await breakdownService.update(id, payload);
  }, []);

  const remove = useCallback(async (id: string) => {
    await breakdownService.remove(id);
    return true;
  }, []);

  return { data, loading, error, refetch: fetchData, getAll, getById, create, update, remove };
}
