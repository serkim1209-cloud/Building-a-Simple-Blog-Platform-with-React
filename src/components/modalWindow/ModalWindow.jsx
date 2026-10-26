import { useEffect } from "react";

function ModalWindow({ isModalOpen, setIsModalOpen, text }) {
  useEffect(() => {
    if (!isModalOpen) return;
    const hendleKeyDown = () => setIsModalOpen(false);
    window.addEventListener("keydown", hendleKeyDown);
    return () => {
      window.removeEventListener("keydown", hendleKeyDown);
    };
  }, [isModalOpen, setIsModalOpen]);
  if (!isModalOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="flex items-center justify-center bg-white gap-4 p-6 rounded-xl">
        <p>{text}</p>
      </div>
    </div>
  );
}
export default ModalWindow;
