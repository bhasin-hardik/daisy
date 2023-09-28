import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import refrigerator from '../../assets/refrigerator.png';
import sinkImg from '../../assets/sink.png';
import range from '../../assets/range.png';
import dishwasher from '../../assets/dishwasher.png';
import { useLayoutContext } from '../Layout/LayoutContext';
import { useApplianceContext } from './ApplianceContext';
const Appliance: React.FC = () => {
  const navigate = useNavigate();
  const { calculateWallsNeeded, selectedLayout } = useLayoutContext();
  const { wallApplianceData, setApplianceError } = useApplianceContext();
  const numWalls = calculateWallsNeeded();
  const { count } = useParams<{ count: string }>();
  let wallIndex = 0;

  if (count !== undefined) {
    wallIndex = parseInt(count) - 1;
  }
  const {
    refrigeratorData,
    sinkData,
    rangeData,
    dishData,
    ApplianceError

  } = wallApplianceData[wallIndex];
  const [refrigeratorSelected, setrefrigeratorSelected] = useState(false);
  const [sinkSelected, setsinkSelected] = useState(false);
  const [rangeSelected, setrangeSelected] = useState(false);
  const [dishSelected, setdishSelected] = useState(false);

  const [refrigeratorHeight, setrefrigeratorHeight] = useState('');
  const [refrigeratorWidth, setrefrigeratorWidth] = useState('');
  const [refrigeratorCenter, setrefrigeratorCenter] = useState('');


  const [sinkWidth, setsinkWidth] = useState('');
  const [sinkCenter, setsinkCenter] = useState('');


  const [rangeWidth, setrangeWidth] = useState('');
  const [rangeCenter, setrangeCenter] = useState('');


  const [dishWidth, setdishWidth] = useState('');
  const [dishCenter, setdishCenter] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (refrigeratorSelected && (!refrigeratorHeight || !refrigeratorWidth || !refrigeratorCenter)) {
      setApplianceError('Please fill all refrigerator fields.', wallIndex);
      setError('Please fill all refrigerator fields.');
      return;
    }
    if (sinkSelected && (!sinkWidth || !sinkCenter)) {
      setApplianceError('Please fill all sink fields.', wallIndex);
      setError('Please fill all sink fields.');
      return;
    }
    if (rangeSelected && (!rangeWidth || !rangeCenter)) {
      setApplianceError('Please fill all range fields.', wallIndex);
      setError('Please fill all range fields.');
      return;
    }
    if (dishSelected && (!dishWidth || !dishCenter)) {
      setApplianceError('Please fill all dish fields.', wallIndex);
      setError('Please fill all dish fields.');
      return;
    }
    if (count) {
      const nextNumWalls = parseInt(count) + 1; // Increment the parameter
      if (numWalls > 1) {
        if (nextNumWalls <= numWalls) {
          navigate(`/appliance/${nextNumWalls}`); // Navigate to the next Obstruction component
        } else {
          navigate('/cabinet');
        }
      } else {
        navigate('/cabinet');
      }

    }
    else {
      navigate('/cabinet');
    }


  };
  const getWallHeading = (wallNumber: number) => {
    const wallAlphabet = String.fromCharCode(65 + wallNumber - 1);
    return `Wall ${wallAlphabet}`;
  };

  // Use the function to get the wall heading
  let wallHeading;
  if (count != undefined) {
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
      case 'refrigerator':
        setrefrigeratorSelected(!refrigeratorSelected);
        refrigeratorData.selected = !refrigeratorData.selected;
        if (!refrigeratorSelected) {
          // If refrigerator is deselected, clear input fields
          setrefrigeratorHeight('');
          setrefrigeratorWidth('');
          setrefrigeratorCenter('');
          refrigeratorData.height = '';
          refrigeratorData.center = '';
          refrigeratorData.width = '';
        }
        break;
      case 'sink':
        setsinkSelected(!sinkSelected);
        sinkData.selected = !sinkData.selected;
        if (!sinkSelected) {
          // If sink is deselected, clear input fields

          setsinkWidth('');
          setsinkCenter('');
          sinkData.center = '';
          sinkData.width = '';
        }
        break;
      case 'range':
        setrangeSelected(!rangeSelected);
        rangeData.selected = !rangeData.selected;
        if (!rangeSelected) {
          // If range is deselected, clear input fields
          rangeData.width = '';
          rangeData.center = '';
          setrangeWidth('');
          setrangeCenter('');
        }
        break;
      case 'dish':
        setdishSelected(!dishSelected);
        dishData.selected = !dishData.selected;
        if (!dishSelected) {
          // If dish is deselected, clear input fields

          setdishWidth('');
          setdishCenter('');
          dishData.width = '';
          dishData.center = '';
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 text-center" style={containerStyle}>
        <h1 style={headingStyle}>Appliances: {wallHeading}</h1>
        <p style={subheadingStyle}>Please select any obstructions on your wall.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={refrigerator}
            alt="refrigerator"
            style={refrigeratorSelected ? selectedImageStyle : unselectedImageStyle}
            onClick={() => toggleImageSelection('refrigerator')}
          />

        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="number"
            placeholder="Refrigerator height"
            style={inputStyle}
            value={refrigeratorHeight}
            onChange={(e) => {
              setrefrigeratorHeight(e.target.value);
              refrigeratorData.height= e.target.value;

            }}
          />

          <input
            type="number"
            placeholder="Refrigerator width"
            style={inputStyle}
            value={refrigeratorWidth}
            onChange={(e) => {
              setrefrigeratorWidth(e.target.value);
              refrigeratorData.width= e.target.value;

            }}
          />

          <input
            type="number"
            placeholder="Refrigerator center"
            style={inputStyle}
            value={refrigeratorCenter}
            onChange={(e) => {
              setrefrigeratorCenter(e.target.value);
              refrigeratorData.center= e.target.value;

            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={sinkImg}
            alt="sink"
            style={sinkSelected ? selectedImageStyle : unselectedImageStyle}
            onClick={() => toggleImageSelection('sink')}
          />

        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>


          <input
            type="number"
            placeholder="Sink width"
            style={inputStyle}
            value={sinkWidth}
            onChange={(e) => {
              setsinkWidth(e.target.value);
              sinkData.width= e.target.value;

            }}
          />

          <input
            type="number"
            placeholder="Sink center"
            style={inputStyle}
            value={sinkCenter}
            onChange={(e) => {
              setsinkCenter(e.target.value);
              sinkData.center= e.target.value;

            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={range}
            alt="range"
            style={rangeSelected ? selectedImageStyle : unselectedImageStyle}
            onClick={() => toggleImageSelection('range')}
          />

        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>


          <input
            type="number"
            placeholder="Range width"
            style={inputStyle}
            value={rangeWidth}
            onChange={(e) => {
              setrangeWidth(e.target.value);
              rangeData.width= e.target.value;

            }}
          />

          <input
            type="number"
            placeholder="Range center"
            style={inputStyle}
            value={rangeCenter}
            onChange={(e) => {
              setrangeCenter(e.target.value);
              rangeData.center= e.target.value;

            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={dishwasher}
            alt="dish"
            style={dishSelected ? selectedImageStyle : unselectedImageStyle}
            onClick={() => toggleImageSelection('dish')}
          />

        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>


          <input
            type="number"
            placeholder="Dish width"
            style={inputStyle}
            value={dishWidth}
            onChange={(e) => {
              setdishWidth(e.target.value);
              dishData.width= e.target.value;

            }}
          />

          <input
            type="number"
            placeholder="Dish center"
            style={inputStyle}
            value={dishCenter}
            onChange={(e) => {
              setdishCenter(e.target.value);
              dishData.center= e.target.value;

            }}
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

export default Appliance;
