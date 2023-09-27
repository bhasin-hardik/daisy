import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import door from '../../assets/door.png';
import windowImg from '../../assets/window.png';
import beam from '../../assets/beam.png';
import other from '../../assets/other.png';
import { useLayoutContext } from '../Layout/LayoutContext';

const Obstruction: React.FC = () => {
  const navigate = useNavigate();
  const { calculateWallsNeeded, selectedLayout } = useLayoutContext();
  const numWalls = calculateWallsNeeded();
  const { count } = useParams<{ count: string }>();
  const [doorSelected, setDoorSelected] = useState(false);
  const [windowSelected, setWindowSelected] = useState(false);
  const [beamSelected, setBeamSelected] = useState(false);
  const [otherSelected, setOtherSelected] = useState(false);

  const [doorHeight, setDoorHeight] = useState('');
  const [doorWidth, setDoorWidth] = useState('');
  const [doorCenter, setDoorCenter] = useState('');

  const [windowHeight, setWindowHeight] = useState('');
  const [windowWidth, setWindowWidth] = useState('');
  const [windowCenter, setWindowCenter] = useState('');

  const [beamHeight, setBeamHeight] = useState('');
  const [beamWidth, setBeamWidth] = useState('');
  const [beamCenter, setBeamCenter] = useState('');

  const [otherHeight, setOtherHeight] = useState('');
  const [otherWidth, setOtherWidth] = useState('');
  const [otherCenter, setOtherCenter] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (doorSelected && (!doorHeight || !doorWidth || !doorCenter)) {
      setError('Please fill all door fields.');
      return;
    }
    if (windowSelected && (!windowHeight || !windowWidth || !windowCenter)) {
      setError('Please fill all window fields.');
      return;
    }
    if (beamSelected && (!beamHeight || !beamWidth || !beamCenter)) {
      setError('Please fill all beam fields.');
      return;
    }
    if (otherSelected && (!otherHeight || !otherWidth || !otherCenter)) {
      setError('Please fill all other fields.');
      return;
    }
   if(count){
    const nextNumWalls = parseInt(count) + 1; // Increment the parameter
    if (numWalls > 1) {
      if (nextNumWalls <= numWalls) {
        navigate(`/obstruction/${nextNumWalls}`); // Navigate to the next Obstruction component
      } else {
        navigate('/appliance/1');
      }
    } else {
      navigate('/appliance/1');
    }

   }
   else{
    navigate('/');
   }
    
    
  };
  const getWallHeading = (wallNumber: number) => {
    const wallAlphabet = String.fromCharCode(65 + wallNumber - 1);
    return `Wall ${wallAlphabet}`;
  };

  // Use the function to get the wall heading
  let wallHeading;
  if(count != undefined){
     wallHeading = getWallHeading(parseInt(count));

  }
  

  const containerStyle: React.CSSProperties = {
    width: '1101px',
    height: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '28px',
    marginTop: '40px',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: 'Actor',
    fontSize: '30px',
    fontWeight: 400,
    lineHeight: '36px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
  };

  const subheadingStyle: React.CSSProperties = {
    fontFamily: 'Actor',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '26px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
    color: '#656362',
  };

  const selectedImageStyle: React.CSSProperties = {
    width: '222px',
    height: '213px',
    marginTop: '20px',
    border: '2px solid #7F56D9',
  };

  const unselectedImageStyle: React.CSSProperties = {
    width: '222px',
    height: '213px',
    marginTop: '20px',
  };
  const otherselectedImageStyle: React.CSSProperties = {
    width: '222px',
    height: '53px',
    marginTop: '20px',
    border: '2px solid #7F56D9',
  };

  const otherunselectedImageStyle: React.CSSProperties = {
    width: '222px',
    height: '53px',
    marginTop: '20px',
  };

  const inputStyle = {
    width: '295px',
    height: '58px',
    backgroundColor: '#F9FAFB',
    marginBottom: '10px',
    marginTop: '10px',
    padding: '20px',
    color: '#0E180A',
    fontSize: '16px',
  };

  const toggleImageSelection = (obstructionType: string) => {
    setError(''); // Clear any previous error messages

    switch (obstructionType) {
      case 'door':
        setDoorSelected(!doorSelected);
        if (!doorSelected) {
          // If door is deselected, clear input fields
          setDoorHeight('');
          setDoorWidth('');
          setDoorCenter('');
        }
        break;
      case 'window':
        setWindowSelected(!windowSelected);
        if (!windowSelected) {
          // If window is deselected, clear input fields
          setWindowHeight('');
          setWindowWidth('');
          setWindowCenter('');
        }
        break;
      case 'beam':
        setBeamSelected(!beamSelected);
        if (!beamSelected) {
          // If beam is deselected, clear input fields
          setBeamHeight('');
          setBeamWidth('');
          setBeamCenter('');
        }
        break;
      case 'other':
        setOtherSelected(!otherSelected);
        if (!otherSelected) {
          // If other is deselected, clear input fields
          setOtherHeight('');
          setOtherWidth('');
          setOtherCenter('');
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 text-center" style={containerStyle}>
        <h1 style={headingStyle}>Obstructions: {wallHeading}</h1>
        <p style={subheadingStyle}>Please select any obstructions on your wall.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={door}
            alt="door"
            style={doorSelected ? selectedImageStyle : unselectedImageStyle}
            onClick={() => toggleImageSelection('door')}
          />
        
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="number"
            placeholder="Door height"
            style={inputStyle}
            value={doorHeight}
            onChange={(e) => setDoorHeight(e.target.value)}
          />

          <input
            type="number"
            placeholder="Door width"
            style={inputStyle}
            value={doorWidth}
            onChange={(e) => setDoorWidth(e.target.value)}
          />

          <input
            type="number"
            placeholder="Door center"
            style={inputStyle}
            value={doorCenter}
            onChange={(e) => setDoorCenter(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={windowImg}
            alt="window"
            style={windowSelected ? selectedImageStyle : unselectedImageStyle}
            onClick={() => toggleImageSelection('window')}
          />
        
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="number"
            placeholder="Window height"
            style={inputStyle}
            value={windowHeight}
            onChange={(e) => setWindowHeight(e.target.value)}
          />

          <input
            type="number"
            placeholder="Window width"
            style={inputStyle}
            value={windowWidth}
            onChange={(e) => setWindowWidth(e.target.value)}
          />

          <input
            type="number"
            placeholder="Window center"
            style={inputStyle}
            value={windowCenter}
            onChange={(e) => setWindowCenter(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={beam}
            alt="beam"
            style={beamSelected ? selectedImageStyle : unselectedImageStyle}
            onClick={() => toggleImageSelection('beam')}
          />
         
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="number"
            placeholder="Beam height"
            style={inputStyle}
            value={beamHeight}
            onChange={(e) => setBeamHeight(e.target.value)}
          />

          <input
            type="number"
            placeholder="Beam width"
            style={inputStyle}
            value={beamWidth}
            onChange={(e) => setBeamWidth(e.target.value)}
          />

          <input
            type="number"
            placeholder="Beam center"
            style={inputStyle}
            value={beamCenter}
            onChange={(e) => setBeamCenter(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={other}
            alt="other"
            style={otherSelected ? otherselectedImageStyle : otherunselectedImageStyle}
            onClick={() => toggleImageSelection('other')}
          />
          <p
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'Actor',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '20px',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            Other
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="number"
            placeholder="Other height"
            style={inputStyle}
            value={otherHeight}
            onChange={(e) => setOtherHeight(e.target.value)}
          />

          <input
            type="number"
            placeholder="Other width"
            style={inputStyle}
            value={otherWidth}
            onChange={(e) => setOtherWidth(e.target.value)}
          />

          <input
            type="number"
            placeholder="Other center"
            style={inputStyle}
            value={otherCenter}
            onChange={(e) => setOtherCenter(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
      )}
    
      <button
        onClick={handleSubmit}
        className="w-80 h-12 mt-4 rounded-md text-white"
        style={{ background: '#7F56D9' }}
      >
        Submit Details
      </button>
    </div>
  );
};

export default Obstruction;
