import  { FC } from "react";
import styles from "./ModalComponent.module.css";

interface ModalComponentProps {
  isOpen: boolean;
  toggleModal: () => void;
  history: Array<{ player: string; inputs: number[] }>;
}

const ModalComponent: FC<ModalComponentProps> = ({ isOpen, toggleModal, history }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={toggleModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.historyHeading}>History</h3>
        <ul className={styles.historyList}>
          {history.map((entry, index) => (
            <li className={styles.listItems} key={index}>
              {entry.player} - {entry.inputs.join(", ")}
            </li>
          ))}
        </ul>
        <button onClick={toggleModal} className={styles.submitButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
