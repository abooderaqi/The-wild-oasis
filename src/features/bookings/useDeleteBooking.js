import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"

export const useDeleteBooking = () => {
  const queryClient = useQueryClient()

  const { mutate: deleteBookingById, isLoading: isDeletingBooking } =
    useMutation({
      mutationFn: (bookingId) => deleteBooking(bookingId),
      onSuccess: () => {
        toast.success(`Booking has deleted successfully`)
        queryClient.invalidateQueries({ queryKey: ["bookings"] })
      },
      onError: () => {
        toast.error("Something went wrong while deleting booking")
      },
    })
  return { deleteBookingById, isDeletingBooking }
}
