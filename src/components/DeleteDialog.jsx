const DeleteDialog = ({
  dialogRef,
  expenseToDelete,
  confirmDelete,
  closeDeleteDialog
}) => {
  return (
    <dialog className="dialog" ref={dialogRef}>

      <div className="dialog-header">
        <div>
          <p className="eyebrow">WARNING</p>
          <h2>Delete Expense?</h2>
        </div>

        <button
          className="dialog-close"
          onClick={closeDeleteDialog}
        >
          ×
        </button>
      </div>

      <p className="delete-message">
        Are you sure you want to delete{" "}
        <strong>
          "{expenseToDelete?.description}"
        </strong>
        ?
      </p>

      <div className="dialog-buttons">

        <button
          className="cancel-button"
          onClick={closeDeleteDialog}
        >
          Cancel
        </button>

        <button
          className="delete-dialog-button"
          onClick={confirmDelete}
        >
          Delete
        </button>

      </div>

    </dialog>
  );
};

export default DeleteDialog;