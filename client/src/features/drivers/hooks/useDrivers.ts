import { useEffect, useState, useCallback } from "react";
import type { Chauffeur, CreateChauffeur, UpdateChauffeur } from "@/features/drivers/types";
import { driverService } from "../api/driverService";

export function useDrivers() {
  const [data, setData] = useState<Chauffeur[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const result = await driverService.getAll();
      setData(result ?? []);
    } catch {
      setError("Failed to load drivers");
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const refetch = useCallback(() => fetchData(true), [fetchData]);

  const getAll = useCallback(async () => {
    return await driverService.getAll();
  }, []);

  const getById = useCallback(async (id: string) => {
    return await driverService.getById(id);
  }, []);

  const create = useCallback(async (payload: CreateChauffeur) => {
    return await driverService.create(payload);
  }, []);

  const update = useCallback(async (id: string, payload: UpdateChauffeur) => {
    return await driverService.update(id, payload);
  }, []);

  const remove = useCallback(async (id: string) => {
    await driverService.remove(id);
    return true;
  }, []);

  return { data, loading, error, refetch, refreshing, getAll, getById, create, update, remove };
}
