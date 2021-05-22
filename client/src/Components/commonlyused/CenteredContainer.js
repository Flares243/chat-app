import { Container } from 'react-bootstrap'

export default function CenteredContainer({ children }) {
   return (
      <Container className="d-flex align-items-center justify-content-center h-100vh">
         { children }
      </Container>
   )
}