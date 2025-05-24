import React from "react";

interface AlgorithmPageLayoutProps {
  children: React.ReactNode;
  error: string | null;
  onErrorDismiss: () => void;
}

const AlgorithmPageLayout: React.FC<AlgorithmPageLayoutProps> = ({
  children,
  error,
  onErrorDismiss,
}) => {
  return (
    <div className="app-page">

          {children}


      {error && (
        <div className="modal is-active">
          <div className="modal-background" onClick={onErrorDismiss}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Error</p>
              <button
                className="delete"
                aria-label="close"
                onClick={onErrorDismiss}
              ></button>
            </header>
            <section className="modal-card-body">
              <p>{error}</p>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-primary" onClick={onErrorDismiss}>
                OK
              </button>
            </footer>
          </div>
        </div>
      )}

    </div>
  );
};

export default AlgorithmPageLayout;
