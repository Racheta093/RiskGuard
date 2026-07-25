const ModalShell = ({ children, onClose, widthClass = "max-w-lg" }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${widthClass} bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalShell;
