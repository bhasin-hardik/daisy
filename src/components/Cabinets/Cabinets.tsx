import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cab1 from '../../assets/cab1.png';
import cab2 from '../../assets/cab2.png';
import cab3 from '../../assets/cab3.png';
import cab4 from '../../assets/cab4.png';
import a from '../../assets/a.png';
import b from '../../assets/b.png';
import either from '../../assets/either.png';

const Cabinets: React.FC = () => {
  const imageSpacing = 10; // Adjust this value as needed
  const navigate = useNavigate();
  // State variables to keep track of selected images for each cabinet
  const [isSelectedA1, setIsSelectedA1] = useState(false);
  const [isSelectedB1, setIsSelectedB1] = useState(false);
  const [isSelectedEither1, setIsSelectedEither1] = useState(false);

  const [isSelectedA2, setIsSelectedA2] = useState(false);
  const [isSelectedB2, setIsSelectedB2] = useState(false);
  const [isSelectedEither2, setIsSelectedEither2] = useState(false);

  const [isSelectedA3, setIsSelectedA3] = useState(false);
  const [isSelectedB3, setIsSelectedB3] = useState(false);
  const [isSelectedEither3, setIsSelectedEither3] = useState(false);

  const [isSelectedA4, setIsSelectedA4] = useState(false);
  const [isSelectedB4, setIsSelectedB4] = useState(false);
  const [isSelectedEither4, setIsSelectedEither4] = useState(false);

  // Function to toggle the selection status of an image for cabinet 1
  const toggleSelection1 = (image: string) => {
    setIsSelectedA1(false);
    setIsSelectedB1(false);
    setIsSelectedEither1(false);

    switch (image) {
      case 'a':
        setIsSelectedA1(true);
        break;
      case 'b':
        setIsSelectedB1(true);
        break;
      case 'either':
        setIsSelectedEither1(true);
        break;
      default:
        break;
    }
  };

  // Function to toggle the selection status of an image for cabinet 2
  const toggleSelection2 = (image: string) => {
    setIsSelectedA2(false);
    setIsSelectedB2(false);
    setIsSelectedEither2(false);

    switch (image) {
      case 'a':
        setIsSelectedA2(true);
        break;
      case 'b':
        setIsSelectedB2(true);
        break;
      case 'either':
        setIsSelectedEither2(true);
        break;
      default:
        break;
    }
  };

  // Function to toggle the selection status of an image for cabinet 3
  const toggleSelection3 = (image: string) => {
    setIsSelectedA3(false);
    setIsSelectedB3(false);
    setIsSelectedEither3(false);

    switch (image) {
      case 'a':
        setIsSelectedA3(true);
        break;
      case 'b':
        setIsSelectedB3(true);
        break;
      case 'either':
        setIsSelectedEither3(true);
        break;
      default:
        break;
    }
  };

  // Function to toggle the selection status of an image for cabinet 4
  const toggleSelection4 = (image: string) => {
    setIsSelectedA4(false);
    setIsSelectedB4(false);
    setIsSelectedEither4(false);

    switch (image) {
      case 'a':
        setIsSelectedA4(true);
        break;
      case 'b':
        setIsSelectedB4(true);
        break;
      case 'either':
        setIsSelectedEither4(true);
        break;
      default:
        break;
    }
  };

  const selectedImage: React.CSSProperties = {
    border: "2px solid #007bff",
  };

  const deselectedImage: React.CSSProperties = {
    border: '2px solid transparent',
  };

 


  // Function to get the CSS class for selected or deselected images
  const getImageClass = (isSelected: boolean) => {
    return isSelected ? 'selectedImage' : 'deselectedImage';
  };
  const handleSubmit = () => {
    navigate('/nextPage');
  }

  // Styles for the outermost box
  const outerBoxStyle: React.CSSProperties = {
    width: '1101px',
    height: '90px',
    marginTop: '180px',
    marginLeft: '169px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '28px',
  };

  // Styles for the first inner box
  const innerBox1Style: React.CSSProperties = {
    width: '449px',
    height: '88px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const innerBox2Style: React.CSSProperties = {
    width: '449px',
    height: '52px',
    background: 'none',
    fontFamily: 'Actor',
    fontSize: '30px',
    fontWeight: 400,
    lineHeight: '36px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
  };

  const innerBox3Style: React.CSSProperties = {
    width: '426px',
    height: '36px',
    background: 'none',
    fontFamily: 'Actor',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '26px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
    color: '#656362',
  };

  // Styles for the new inner box below the outer box
  const newInnerBoxStyle: React.CSSProperties = {
    width: '137px',
    height: '21px',
    marginTop: '70px',
    top: '365px',
    left: '475px',
    fontFamily: 'Actor',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
    position: 'absolute', // Add position:absolute for precise placement
  };

  const otherInnerBoxStyle: React.CSSProperties = {
    width: '105px',
    height: '21px',
    marginTop: '70px',
    top: '365px',
    left: '871px',
    fontFamily: 'Actor',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
    position: 'absolute', // Add position:absolute for precise placement
  };
  const newImageBoxStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '490px',
    left: '830px',
    gap: '40px'
  };
  const newImageBoxStyle2: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '570px',
    left: '830px',
    gap: '40px'
  };
  const newImageBoxStyle3: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '650px',
    left: '830px',
    gap: '40px'
  };
  const newImageBoxStyle4: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '720px',
    left: '830px',
    gap: '40px'
  };

  return (
    <div className="flex items-center justify-center">
    <div style={outerBoxStyle} className="bg-white p-8 rounded-lg">
      <div style={innerBox1Style}>
        <div style={innerBox2Style}>Specialty Cabinets:</div>
        <div style={innerBox3Style}>Please select any specialty cabinets you would like to add to your kitchen.</div>
      </div>
      <div style={newInnerBoxStyle}>Specialty Cabinet</div>
      <div style={otherInnerBoxStyle}>Wall preference</div>

      <div style={newImageBoxStyle}>
        <img
          src={a}
          alt="a"
          style={isSelectedA1 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection1('a')}
        />
        <img
          src={b}
          alt="b"
          style={isSelectedB1 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection1('b')}
        />
        <img
          src={either}
          alt="either"
          style={isSelectedEither1 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection1('either')}
        />
      </div>
      <div style={{ position: 'absolute', top: '490px', left: '475px' }}>
        <img src={cab1} alt="pullout" />
      </div>

      <div style={newImageBoxStyle2}>
        <img
          src={a}
          alt="a"
          style={isSelectedA2 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection2('a')}
        />
        <img
          src={b}
          alt="b"
          style={isSelectedB2 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection2('b')}
        />
        <img
          src={either}
          alt="either"
          style={isSelectedEither2 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection2('either')}
        />
      </div>
      <div style={{ position: 'absolute', top: '570px', left: '475px' }}>
        <img src={cab2} alt="rack" />
      </div>

      <div style={newImageBoxStyle3}>
        <img
          src={a}
          alt="a"
          style={isSelectedA3 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection3('a')}
        />
        <img
          src={b}
          alt="b"
          style={isSelectedB3 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection3('b')}
        />
        <img
          src={either}
          alt="either"
          style={isSelectedEither3 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection3('either')}
        />
      </div>
      <div style={{ position: 'absolute', top: '650px', left: '475px' }}>
        <img src={cab3} alt="pantry" />
      </div>

      <div style={newImageBoxStyle4}>
        <img
          src={a}
          alt="a"
          style={isSelectedA4 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection4('a')}
        />
        <img
          src={b}
          alt="b"
          style={isSelectedB4 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection4('b')}
        />
        <img
          src={either}
          alt="either"
          style={isSelectedEither4 ? selectedImage : deselectedImage}
          onClick={() => toggleSelection4('either')}
        />
      </div>
      <div style={{ position: 'absolute', top: '730px', left: '475px' }}>
        <img src={cab4} alt="other" />
      </div>
      
        </div>
        <button
          onClick={handleSubmit}
          className="w-80 h-12 mt-4 rounded-md text-white"
          style={{ background: '#7F56D9', position: 'absolute',top:'850px', bottom: '20px', left: '800px', transform: 'translateX(-50%)' }}
        >
          Submit Details
        </button>
    </div>
  );
};

export default Cabinets;
