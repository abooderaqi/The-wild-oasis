/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCabin } from "../../services/apiCabins"
import toast from "react-hot-toast"

export const useCreateCabin = () => {
  const queryClient = useQueryClient()
  // Create cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin created successfully")
      queryClient.invalidateQueries({ queryKey: ["cabins"] })
    },
    onError: (err) => toast.error(err.message),
  })

  // Edit cabin

  return { createCabin, isCreating }
}
