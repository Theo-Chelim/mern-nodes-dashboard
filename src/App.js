import './App.css';
import { Card, Button, Navbar, Nav, Container, Row, Col, ButtonGroup } from "react-bootstrap"
import { MDBBadge } from 'mdb-react-ui-kit';

import { FaReact, FaPowerOff, FaBurn } from "react-icons/fa";

function App() {

  const physical_edges_id = [...Array(10).keys()];

  const physical_items = [];
  for (let i = 0; i < physical_edges_id.length; i += 6) {
    const items = [];
    for (let j = i; j < i + 6 && j < physical_edges_id.length; j++) {
      items.push(
        <Col xs={12} md={2}>
          <Card className="shadow h-100">
            <Card.Body>
              <Card.Title>Node {j + 1}</Card.Title>
              <Card.Subtitle className="text-muted mb-2">192.168.1.{j + 1}</Card.Subtitle>
              <Card.Text className="text-center">
                <MDBBadge color="success" > Available </MDBBadge>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="secondary"><FaPowerOff /></Button> <Button variant="secondary"><FaBurn /></Button>
            </Card.Footer>
          </Card>
        </Col>
      );
    }

    physical_items.push(<div><Row className="show-grid">{items}</Row><br /></div>)
  }

  const virtual_edges_id = [...Array(240).keys()];

  const virtual_items = [];
  for (let i = 0; i < virtual_edges_id.length; i += 6) {
    const items = [];
    for (let j = i; j < i + 6 && j < virtual_edges_id.length; j++) {
      items.push(
        <Col xs={12} md={2}>
          <Card className="shadow h-100">
            <Card.Body>
              <Card.Title>Node {j + 11}</Card.Title>
              <Card.Subtitle className="text-muted mb-2">192.168.1.{j + 11}</Card.Subtitle>
              <Card.Text className="text-center">
                <MDBBadge color="success" > Available </MDBBadge>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="secondary"><FaPowerOff /></Button> <Button variant="secondary"><FaBurn /></Button>
            </Card.Footer>
          </Card>
        </Col>
      );
    }

    virtual_items.push(<div><Row className="show-grid">{items}</Row><br /></div>)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Navbar fill justify bg="primary" variant="dark">
          <Container>
            <Nav>
              <Nav.Item>
                <Nav.Link href="#"> Dashboard </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="#"> Metrics </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="#"> Storage </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <body>

        <Container  >
          <br />
          <h1> Dashboard <FaReact /></h1>
          <br />

          <Card>
            <Card.Header><h2>Physicals edges</h2></Card.Header>
            <Card.Body>
              {physical_items}
            </Card.Body>
          </Card>
          <br />
          <Card>
            <Card.Header><h2>Virtual edges</h2></Card.Header>
            <Card.Body>
              {virtual_items}
            </Card.Body>
          </Card>
        </Container>

      </body>
    </div>
  );
}

export default App;
