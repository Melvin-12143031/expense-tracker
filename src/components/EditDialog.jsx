import categories from '../data/categories.json'

const EditDialog = ({
    dialogRef,
    editDescription,
    setEditDescription,
    editAmount,
    setEditAmount,
    editCategory,
    setEditCategory,
    editDate,
    setEditDate,
    saveEdit,
    closeEditDialog
}) => {
    return (
        <dialog className="dialog" ref={dialogRef}>

            <div className="dialog-header">
                <div>
                    <p className="eyebrow">EXPENSE</p>
                    <h2>Edit Expense</h2>
                </div>

                <button
                    className="dialog-close"
                    onClick={closeEditDialog}
                >
                    ×
                </button>
            </div>

            <input
                type="text"
                placeholder="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
            />

            <input
                type="text"
                inputMode="numeric"
                placeholder="Amount"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
            />
            <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
            >

                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}

            </select>

            <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
            />

            <div className="dialog-buttons">

                <button
                    className="cancel-button"
                    onClick={closeEditDialog}
                >
                    Cancel
                </button>

                <button
                    className="save-button"
                    onClick={saveEdit}
                >
                    Save Changes
                </button>

            </div>

        </dialog>
    );
};

export default EditDialog;