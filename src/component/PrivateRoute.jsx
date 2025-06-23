import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../hooks/supabase";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        alert("로그인이 필요합니다");
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  return children;
}
