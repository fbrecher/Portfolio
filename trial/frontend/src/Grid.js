import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MoreInfo from './MoreInfo';
import { useState } from 'react';
export default function Grid({data}){
  const [details, setDetails] = useState();

  const returnval = ()=>{details? <Row md={4}><Col>{details}</Col></Row>:(
    <Container>
      <Row md={4}>
        <Col>{data['Latin name']}</Col>
        <Col xs={6}>{data.Categories}</Col>
        <Col>{data.Family}</Col>
        <Col><MoreInfo id={data.id} setDetails={setDetails} details={details}></MoreInfo></Col>
    </Row>
    </Container>)}
return (
  <>
 {returnval}
    </>
  );
}

