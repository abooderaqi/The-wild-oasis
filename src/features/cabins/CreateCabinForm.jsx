/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useCreateCabin } from "./useCreateCabin"
import { useEditCabin } from "./useEditCabin"
import { useForm } from "react-hook-form"

import Input from "../../ui/Input"
import Form from "../../ui/Form"
import Button from "../../ui/Button"
import FileInput from "../../ui/FileInput"
import Textarea from "../../ui/Textarea"
import FormRow from "../../ui/FormRow"

function CreateCabinForm({ cabinToEdit = {} }) {
  // Custom hooks for create/edit cabins
  const { createCabin, isCreating } = useCreateCabin()
  const { editCabin, isEditing } = useEditCabin()

  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  // useForm hook
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  })
  const { errors } = formState

  const isWorking = isCreating || isEditing

  // onSubmit handler
  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0]

    if (isEditSession)
      editCabin(
        {
          newCabinData: {
            ...data,
            image,
          },
          id: editId,
        },
        {
          onSuccess: (data) => reset(),
        }
      )
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => reset(),
        }
      )
  }
  const onError = (errors) => {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Desription for webiste"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
