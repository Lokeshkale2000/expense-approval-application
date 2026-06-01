import { useExpense } from "../../context/ExpenseContext";
import Badge from "../ui/Badge";
import { formatAmount, isImageType } from "../../utils/helpers";
import "./BillItem.css";

export default function BillItem({
  bill,
  reportId,
  checked,
  onToggle,
  onViewDetails,
}) {
  const { approveBill, rejectBill } = useExpense();
  const isPending = bill.status === "pending";

  return (
    <div className="bi-item">
      {/* Checkbox */}
      <input
        type="checkbox"
        className="bi-checkbox"
        checked={checked}
        onChange={() => onToggle(bill.id)}
      />

      {/* Preview */}
      <div className="bi-preview">
        {bill.fileData ? (
          isImageType(bill.fileType) ? (
            <img src={bill.fileData} alt="bill" className="bi-previewImage" />
          ) : (
            <div className="bi-previewPlaceholder">
              <div>📄</div>
              <div>{bill.fileName}</div>
            </div>
          )
        ) : (
          <div className="bi-previewPlaceholder">Preview</div>
        )}
      </div>

      {/* Content section — Frame 1597882134 */}
      <div className="bi-content">
        {/* Left: meta + title + action buttons */}
        <div className="bi-titleSection">
          <span className="bi-meta">Uploaded on - {bill.uploadedOn}</span>

          <span className="bi-billTitle" onClick={() => onViewDetails(bill.id)}>
            {bill.title}
          </span>

          {isPending ? (
            <div className="bi-actionBtns">
              <button
                className="bi-btnReject"
                onClick={() => rejectBill(reportId, bill.id)}
              >
                Reject
              </button>
              <button
                className="bi-btnAccept"
                onClick={() => approveBill(reportId, bill.id)}
              >
                Accept
              </button>
            </div>
          ) : (
            <Badge status={bill.status} />
          )}
        </div>

        {/* Info grid — Frame 1597882137: 2×2, Wallet/Category top, Merchant bottom-left */}
        <div className="bi-info">
          <div className="bi-infoBlock">
            <span className="bi-detailLabel">Wallet</span>
            <span className="bi-detailValue">{bill.wallet}</span>
          </div>

          <div className="bi-infoBlock">
            <span className="bi-detailLabel">Category</span>
            <span className="bi-detailValue">{bill.category}</span>
          </div>

          <div className="bi-infoBlock">
            <span className="bi-detailLabel">Merchant</span>
            <span className="bi-detailValue">{bill.merchant}</span>
          </div>

          {/* Empty cell to preserve 2×2 grid shape */}
          <div className="bi-infoBlock" />
        </div>
      </div>

      {/* Amount column — Frame 1597882138: vertical, space-between */}
      <div className="bi-amountCol">
        <div className="bi-amountBlock">
          <span className="bi-detailLabel">Amount</span>
          <span className="bi-amountValue">{formatAmount(bill.amount)}</span>
        </div>

        <span className="bi-viewDetails" onClick={() => onViewDetails(bill.id)}>
          View Details
        </span>
      </div>
    </div>
  );
}
