import styled from "styled-components";
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px; /* Increase the height for a larger container */

  @media (max-width: 768px) {
    /* Adjust styles for smaller screens */
    height: 300px; /* Adjust the height for smaller screens */
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
function ImageView({ imageUrl }) {
  return (
    <ImageContainer>
      <Image src={imageUrl} alt="Full Image" />
    </ImageContainer>
  );
}

export default ImageView;
