import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { useUserStore } from "@/stores/useUserStore";

const useCurrentUser = () => {
  const router = useRouter();
  const {user, getUser} = useUserStore()

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data?.session) {
        router.push("/login");
      } else {
        if(!user?.id && data.session.user.email) {
          getUser(data.session?.user.email)
        }
      }
    };

    getCurrentUser();
  }, [router]);
};

export default useCurrentUser;
