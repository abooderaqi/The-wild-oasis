import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import { toast } from "react-hot-toast"

export const useCheckout = () => {
  const queryClient = useQueryClient()

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: ({ id }) => {
      toast.success(`Booking #${id} successfully checked out`)

      queryClient.invalidateQueries({ active: true })
    },
    onError: (error) => {
      toast.error("There was an error while cheking in")
      console.error(error.message)
    },
  })
  return { checkOut, isCheckingOut }
}
