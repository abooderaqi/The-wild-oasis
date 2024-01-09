/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers"
import { useState } from "react"
import { useDeleteCabin } from "./useDeleteCabin"

import Button from "../../ui/Button"
import styled from "styled-components"
import CreateCabinForm from "./CreateCabinForm"
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2"
import { useCreateCabin } from "./useCreateCabin"

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`
const MinipulateContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`
function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false)
  const { createCabin, isCreating } = useCreateCabin()
  const { deleteCabin, isDeleting } = useDeleteCabin()

  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin

  const editHandiling = () => {
    setShowForm((showForm) => !showForm)
  }
  const duplicateHandiling = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    })
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <MinipulateContainer>
          <Button variation="secondary" onClick={duplicateHandiling}>
            <HiSquare2Stack />
          </Button>
          <Button variation="secondary" onClick={editHandiling}>
            <HiPencil />
          </Button>
          <Button
            variation="danger"
            onClick={() => deleteCabin(cabinId)}
            disabled={isDeleting}
          >
            <HiTrash />
          </Button>
        </MinipulateContainer>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  )
}

export default CabinRow