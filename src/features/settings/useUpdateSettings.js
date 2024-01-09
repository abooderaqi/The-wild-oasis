import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting as updateSettingApi } from "../../services/apiSettings"
import { toast } from "react-hot-toast"

export const useUpadteSettings = () => {
  const queryClient = useQueryClient()
  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Hotel settings updated successfully"),
        queryClient.invalidateQueries({ queryKey: ["settings"] })
    },
    onError: (error) => toast.error(error.message),
  })
  return { updateSettings, isUpdating }
}
