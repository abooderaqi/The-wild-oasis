import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout as logoutApi } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries()
      navigate("/login", { replace: true })
    },
    onError: (err) => {
      throw new Error(err.message)
    },
  })
  return { logout, isPending }
}
