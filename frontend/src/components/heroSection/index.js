import "../../styles/chanudi/heroSection.css";
import Carousel from 'react-bootstrap/Carousel';

export default function HeroSection() {


    const image = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2F12abe94c-ecad-42a0-831b-2e1c60f23d42.__CR0%2C0%2C970%2C300_PT0_SX970_V1___.jpg?alt=media&token=e35f938d-8a8c-4e4b-8f33-3efe6d22d8b9";
    const image2 = "https://firebasestorage.googleapis.com/v0/b/beheth-kade-6ds3w9c.appspot.com/o/asserts%2F7e7a5aa7-f34f-48da-9b84-fa5ad75a08b1.__CR0%2C0%2C970%2C300_PT0_SX970_V1___.jpg?alt=media&token=d0ff8683-753e-4cda-a2ed-24f83254f89a";

    return (
        <Carousel>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src={image}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                    className="d-block w-100"
                    src={image2}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={image}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
