import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { useUserStore } from "@/stores/useUserStore";

const useCurrentUser = () => {
  const router = useRouter();
  const { user, getUser } = useUserStore();

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const getCurrentUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (!data?.session) {
          router.push("/login");
        } else {
          if (!user?.id && data.session.user.email) {
            getUser(data.session?.user.email);
          }
        }
      } catch (error) {
        console.error("Error getting current user:", error);
      }
    };

    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
};

export default useCurrentUser;
