import { useEffect, useState, useCallback } from "react";
import type { CarnetDeBord, CreateCarnetDeBord, UpdateCarnetDeBord } from "@/features/logbooks/types";
import { logbookService } from "../api/logbookService";

export function useLogbooks() {
  const [data, setData] = useState<CarnetDeBord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const result = await logbookService.getAll();
      setData(result ?? []);
    } catch {
      setError("Failed to load logbooks");
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const refetch = useCallback(() => fetchData(true), [fetchData]);

  const getAll = useCallback(async () => {
    return await logbookService.getAll();
  }, []);

  const getById = useCallback(async (id: string) => {
    return await logbookService.getById(id);
  }, []);

  const create = useCallback(async (payload: CreateCarnetDeBord) => {
    return await logbookService.create(payload);
  }, []);

  const update = useCallback(async (id: string, payload: UpdateCarnetDeBord) => {
    return await logbookService.update(id, payload);
  }, []);

  const remove = useCallback(async (id: string) => {
    await logbookService.remove(id);
    return true;
  }, []);

  return { data, loading, error, refetch, refreshing, getAll, getById, create, update, remove };
}
