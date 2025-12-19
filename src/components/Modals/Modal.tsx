import React, { useEffect } from "react";

type ModalProps = {
  /** Controlla l’apertura/chiusura del modal */
  isOpen: boolean;
  /** Funzione da eseguire per chiudere il modal */
  onClose: () => void;
  /** Titolo opzionale da visualizzare in testa al modal */
  title?: string;
  /** Contenuto del modal */
  children: React.ReactNode;
  /** Se true, il modal occupa tutto lo schermo (default true).
   *  Se false, puoi adattarlo per un popover posizionato altrove.
   */
  fullScreen?: boolean;
};

/**
 * Componente Modal generico.
 * Visualizza un overlay scuro e centra il contenuto.
 * Chiude la finestra quando si clicca sull’overlay o si preme ESC.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  fullScreen = true,
}: ModalProps) {
  // Chiudi con ESC
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay: cliccandolo chiude il modal */}
      <div
        className={`fixed inset-0 bg-black/50 z-40`}
        onClick={onClose}
      ></div>

      {/* Contenitore del modal */}
      <div
        className={`fixed z-50 ${
          fullScreen
            ? "inset-0 flex items-center justify-center"
            : ""
        } pointer-events-none`}
      >
        <div
          className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full pointer-events-auto"
          // Se non vuoi il modal centrato, puoi passare delle classi extra via fullScreen=false e wrapper esterno
        >
          {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
          {children}
        </div>
      </div>
    </>
  );
}
