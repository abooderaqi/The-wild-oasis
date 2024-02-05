/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export const useLogin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => {
      console.log(isPending)
      return loginApi({ email, password })
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user)
      navigate("/dashboard", { replace: true })
    },
    onError: (error) => {
      console.error(error.message)
      toast.error("Invalid login credentials")
    },
  })

  return { login, isPending }
}
