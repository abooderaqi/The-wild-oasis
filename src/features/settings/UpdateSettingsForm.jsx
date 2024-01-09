/* eslint-disable no-unused-vars */
import { useSettings } from "./useSettings"
import { useUpadteSettings } from "./useUpdateSettings"

import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Form from "../../ui/Form"
import Spinner from "../../ui/Spinner"

function UpdateSettingsForm() {
  const { updateSettings, isUpdating } = useUpadteSettings()
  // This time we are using UNCONTROLLED fields, so we will NOT store state
  const {
    isLoading,
    settings: {
      breakfastPrice,
      maxBookingLength,
      minBookingLength,
      maxGuestPerBooking,
    } = {},
  } = useSettings()

  if (isLoading) return <Spinner />

  const handleUpdate = (e, fieldName) => {
    const { value } = e.target
    if (!value) return

    updateSettings({ [fieldName]: value })
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          id="min-nights"
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          id="max-nights"
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
          id="max-guests"
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
