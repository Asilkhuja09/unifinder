import { useQuery } from "@tanstack/react-query";
import { getCampusPlace } from "@/lib/places.functions";
import type { CampusPlace } from "@/lib/placesCore";

/**
 * The university's place on Google Maps (id, address, photos), looked up by the server.
 * `place` stays null when the server has no Google key, finds no confident match or fails, and the
 * page then keeps using its text-search links and the Wikipedia photos.
 */
export function useCampusPlace(universityId: string, enabled = true): { place: CampusPlace | null; loading: boolean } {
  const query = useQuery({
    queryKey: ["campus-place", universityId],
    queryFn: () => getCampusPlace({ data: { id: universityId } }),
    enabled,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  return { place: query.data?.place ?? null, loading: enabled && query.isPending };
}
