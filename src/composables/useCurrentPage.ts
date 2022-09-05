import { computed } from "vue";
import { useRoute } from "vue-router";

const useCurrentPage = () => {
  const route = useRoute();
  const routeQueryPage = route.query.page as string;
  return computed(() => Number.parseInt(routeQueryPage || "1"));
};

export default useCurrentPage;
