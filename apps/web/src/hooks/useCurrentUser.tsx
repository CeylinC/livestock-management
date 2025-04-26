import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

const useCurrentUser = () => {
  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      console.log("Session Data:", data);
      console.log("Error:", error);

      if (!data?.session) {
        router.push("/login");
      }
    };

    getCurrentUser();
  }, [router]);
};

export default useCurrentUser;
