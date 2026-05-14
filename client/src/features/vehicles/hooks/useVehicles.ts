import { useEffect, useState, useCallback } from "react";
import type { Vehicule, VehiculePayload } from "@/features/vehicles/types";
import { vehicleService } from "../api/vehicleService";

export function useVehicles() {
  const [data, setData] = useState<Vehicule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const result = await vehicleService.getAll();
      setData(result ?? []);
    } catch {
      setError("Failed to load vehicles");
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const refetch = useCallback(() => fetchData(true), [fetchData]);

  const create = useCallback(async (payload: VehiculePayload) => {
    return await vehicleService.create(payload);
  }, []);

  const getAll = useCallback(async () => {
    return await vehicleService.getAll();
  }, []);

  const getById = useCallback(async (matricule: string) => {
    return await vehicleService.getByMatricule(matricule);
  }, []);

  const update = useCallback(async (matricule: string, payload: Partial<VehiculePayload>) => {
    return await vehicleService.update(matricule, payload);
  }, []);

  const remove = useCallback(async (matricule: string) => {
    await vehicleService.remove(matricule);
    return true;
  }, []);

  return { data, loading, error, refetch, refreshing, getAll, getById, create, update, remove };
}
