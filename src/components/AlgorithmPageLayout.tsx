import React from 'react';
import { 
  Hero, 
  Container, 
  Title, 
  Subtitle, 
  Section, 
  Modal,
  Button 
} from 'react-bulma-components';

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
  onErrorDismiss
}) => {
  return (
    <div className="app-page">
      <Hero color="light" size="small">
        <Hero.Body>
          <Container>
            {title}
            {shortTitle}
          </Container>
        </Hero.Body>
      </Hero>
      
      <Section>
        <Container>
          {children}
        </Container>
      </Section>

      <Modal show={!!error} onClose={onErrorDismiss}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Error</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <p>{error}</p>
          </Modal.Card.Body>
          <Modal.Card.Footer>
            <Button color="primary" onClick={onErrorDismiss}>
              OK
            </Button>
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal>
    </div>
  );
};

export default AlgorithmPageLayout;