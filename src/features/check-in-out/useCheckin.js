import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

export const useCheckin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: checkIn, isLoading: isChekingIn } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked-in",
        ...breakfast,
      }),
    onSuccess: ({ id }) => {
      toast.success(`Booking #${id} successfully checked in`)
      //   queryClient.invalidateQueries({ queryKey: ["bookings"] }) or
      queryClient.invalidateQueries({ active: true })
      navigate("/")
    },
    onError: (error) => {
      toast.error("There was an error while cheking in")
      console.error(error.message)
    },
  })
  return { checkIn, isChekingIn }
}
