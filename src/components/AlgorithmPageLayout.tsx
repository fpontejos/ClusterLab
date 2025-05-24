import React from "react";

interface AlgorithmPageLayoutProps {
  title: string;
  shortTitle: string;
  children: React.ReactNode;
  error: string | null;
  onErrorDismiss: () => void;
}

const AlgorithmPageLayout: React.FC<AlgorithmPageLayoutProps> = ({
  title,
  shortTitle,
  children,
  error,
  onErrorDismiss,
}) => {
  return (
    <div className="app-page">
      <section class="hero is-light is-medium">
        <div class="container">
          <p class="title">{title}</p>
        </div>
      </section>
      <div class="container">
        {children}
      </div>


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
