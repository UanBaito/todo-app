import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function getUserData() {
  const navigate = useNavigate();
  const userDataQuery = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/users/", {
        credentials: "include",
      });

      if (res.status === 401) {
        navigate("/login");
      } else if (!res.ok) {
        console.log("error fetching user");
        throw new Error();
      }
      const data = res.json();
      return data;
    },
  });
  return userDataQuery;
}
