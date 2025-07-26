import { useQuery } from "@tanstack/react-query";
import { myProfile } from "../lib/auth.api";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: myProfile,
    retry: false,
  });
  return {isLoading:authUser.isLoading,authUser:authUser.data?.user}
};
export default useAuthUser;
