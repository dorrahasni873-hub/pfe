import { useEffect, useState, useCallback } from "react";
import type { User, CreateUser, UpdateUser } from "@/features/users/types";
import { userService } from "../api/userService";

export function useUsers() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const result = await userService.getAll();
      setData(result ?? []);
    } catch {
      setError("Failed to load users");
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const refetch = useCallback(() => fetchData(true), [fetchData]);

  const create = useCallback(async (payload: CreateUser) => {
    return await userService.create(payload);
  }, []);

  const getAll = useCallback(async () => {
    return await userService.getAll();
  }, []);

  const getById = useCallback(async (id: string) => {
    return await userService.getById(id);
  }, []);

  const update = useCallback(async (id: string, payload: UpdateUser) => {
    return await userService.update(id, payload);
  }, []);

  const remove = useCallback(async (id: string) => {
    return await userService.remove(id);
  }, []);

  return { data, loading, error, refetch, refreshing, getAll, getById, create, update, remove };
}
