/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers"
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2"
import { useCreateCabin } from "./useCreateCabin"
import { useDeleteCabin } from "./useDeleteCabin"

import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import CreateCabinForm from "./CreateCabinForm"
import styled from "styled-components"
import ConfirmDelete from "../../ui/ConfirmDelete"
import Table from "../../ui/Table"

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

const CrudContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`

function CabinRow({ cabin }) {
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
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <CrudContainer>
        <Button variation="secondary" onClick={duplicateHandiling}>
          <HiSquare2Stack />
        </Button>

        <Modal>
          <Modal.Open opens="edit-cabin">
            <Button variation="secondary">
              <HiPencil />
            </Button>
          </Modal.Open>
          <Modal.Window name="edit-cabin">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="delete-cabin">
            <Button variation="danger">
              <HiTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name="delete-cabin">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </CrudContainer>
    </Table.Row>
  )
}

export default CabinRow
