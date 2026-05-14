import { useEffect, useState, useCallback } from "react";
import type { Maintenance, CreateMaintenance, UpdateMaintenance } from "@/features/maintenance/types";
import { maintenanceService } from "../api/maintenanceService";

export function useMaintenance() {
  const [data, setData] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const result = await maintenanceService.getAll();
      setData(result ?? []);
    } catch {
      setError("Failed to load maintenance records");
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const refetch = useCallback(() => fetchData(true), [fetchData]);

  const getAll = useCallback(async () => {
    return await maintenanceService.getAll();
  }, []);

  const getById = useCallback(async (id: string) => {
    return await maintenanceService.getById(id);
  }, []);

  const create = useCallback(async (payload: CreateMaintenance) => {
    return await maintenanceService.create(payload);
  }, []);

  const update = useCallback(async (id: string, payload: UpdateMaintenance) => {
    return await maintenanceService.update(id, payload);
  }, []);

  const remove = useCallback(async (id: string) => {
    await maintenanceService.remove(id);
    return true;
  }, []);

  return { data, loading, error, refetch, refreshing, getAll, getById, create, update, remove };
}
