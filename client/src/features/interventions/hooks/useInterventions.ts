import { useEffect, useState, useCallback } from "react";
import type { Entretien, CreateEntretien, UpdateEntretien } from "@/features/interventions/types";
import { interventionService } from "../api/interventionService";

export function useInterventions() {
  const [data, setData] = useState<Entretien[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const result = await interventionService.getAll();
      setData(result ?? []);
    } catch {
      setError("Failed to load interventions");
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const refetch = useCallback(() => fetchData(true), [fetchData]);

  const getAll = useCallback(async () => {
    return await interventionService.getAll();
  }, []);

  const getById = useCallback(async (id: string) => {
    return await interventionService.getById(id);
  }, []);

  const create = useCallback(async (payload: CreateEntretien) => {
    return await interventionService.create(payload);
  }, []);

  const update = useCallback(async (id: string, payload: UpdateEntretien) => {
    return await interventionService.update(id, payload);
  }, []);

  const remove = useCallback(async (id: string) => {
    await interventionService.remove(id);
    return true;
  }, []);

  return { data, loading, error, refetch, refreshing, getAll, getById, create, update, remove };
}
