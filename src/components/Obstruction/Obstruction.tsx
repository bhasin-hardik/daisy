import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// import { useLayoutContext } from '../Layout/LayoutContext';
import { useObstructionContext } from './ObstructionContext';

const Obstruction: React.FC = () => {
  const navigate = useNavigate();


  const { wallObstructionData, setObstructionError } = useObstructionContext();
  // const { calculateWallsNeeded, selectedLayout } = useLayoutContext();


  const wallsNeededFromStorage = JSON.parse(localStorage.getItem('wallsNeeded') || 'null');

  const numWalls = wallsNeededFromStorage;
  const { count } = useParams<{ count: string }>();
  const wallLetter = count ? String.fromCharCode(64 + parseInt(count)) : '';
  
  let wallIndex = 0;

  if (count !== undefined) {
    wallIndex = parseInt(count) - 1;
  }
  console.log('Wall Index:', wallIndex);

  const {
    doorData,
    windowData,
    beamData,
    otherData,
    Obstructionerror,
  } = wallObstructionData[wallIndex];
  const [wallObstructionDatafromLocal, setWallObstructionDatafromLocal] = useState(() => {
    // Initialize with data from local storage or default values
    const defaultData = {
      door: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      window: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      beam: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      other: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
    };

    return JSON.parse(localStorage.getItem(`obstruction_${wallLetter}`) || 'null') || defaultData;
  });
  const initializeLocalData = () => {

    const defaultData = {
      door: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      window: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      beam: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      other: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
    };
    localStorage.setItem(`obstruction_${wallLetter}`, JSON.stringify(defaultData));
    return defaultData;
  };

  useEffect(() => {
    initializeLocalData();
  }, [count, wallLetter]);
  const updateLocalStorageData = (data: object) => {
    localStorage.setItem(`obstruction_${wallLetter}`, JSON.stringify(data));
  };

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
    setError(''); // Clear any previous error messages

    const doorHeightValue = parseFloat(doorHeight);
    const doorWidthValue = parseFloat(doorWidth);
    const doorCenterValue = parseFloat(doorCenter);

    const windowHeightValue = parseFloat(windowHeight);
    const windowWidthValue = parseFloat(windowWidth);
    const windowCenterValue = parseFloat(windowCenter);

    const beamHeightValue = parseFloat(beamHeight);
    const beamWidthValue = parseFloat(beamWidth);
    const beamCenterValue = parseFloat(beamCenter);

    const otherHeightValue = parseFloat(otherHeight);
    const otherWidthValue = parseFloat(otherWidth);
    const otherCenterValue = parseFloat(otherCenter);

    const isDoorValid =
      doorSelected && doorHeightValue >= 0 && doorWidthValue >= 0 && doorCenterValue >= 0;
    const isWindowValid =
      windowSelected && windowHeightValue >= 0 && windowWidthValue >= 0 && windowCenterValue >= 0;
    const isBeamValid =
      beamSelected && beamHeightValue >= 0 && beamWidthValue >= 0 && beamCenterValue >= 0;
    const isOtherValid =
      otherSelected && otherHeightValue >= 0 && otherWidthValue >= 0 && otherCenterValue >= 0;

    if (!isDoorValid && doorSelected) {
      setObstructionError('Please fill all door fields with positive values.', wallIndex);
      setError('Please fill all door fields with positive values.');
      return;
    }
    if (!isWindowValid && windowSelected) {
      setObstructionError('Please fill all window fields with positive values.', wallIndex);
      setError('Please fill all window fields with positive values.');
      return;
    }
    if (!isBeamValid && beamSelected) {
      setObstructionError('Please fill all beam fields with positive values.', wallIndex);
      setError('Please fill all beam fields with positive values.');
      return;
    }
    if (!isOtherValid && otherSelected) {
      setObstructionError('Please fill all other fields with positive values.', wallIndex);
      setError('Please fill all other fields with positive values.');
      return;
    }


    if (count) {

      const nextNumWalls = parseInt(count) + 1; // Increment the parameter
      if (numWalls > 1) {
        if (count && nextNumWalls <= numWalls) {
          navigate(`/obstruction/${nextNumWalls}`); // Navigate to the next Obstruction component
        } else {
          navigate('/appliance/1');
        }
      } else {
        navigate('/appliance/1');
      }
    } else {
      navigate('/');
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
  const handleInputChange = (obstructionType: string, field: string, value: string) => {
    setWallObstructionDatafromLocal((prevData) => {
      const newData = { ...prevData };
      newData[obstructionType][field] = value;
      updateLocalStorageData(newData);
      return newData;
    });
  };
  const toggleImageSelection = (obstructionType: string) => {
    setError(''); // Clear any previous error messages
    const updatedData = { ...wallObstructionDatafromLocal };
    updatedData[obstructionType].selected = !updatedData[obstructionType].selected;
    setWallObstructionDatafromLocal(updatedData);
    setWallObstructionDatafromLocal((prevData) => {
      const newData = { ...prevData };
      newData[obstructionType].selected = !newData[obstructionType].selected;
      updateLocalStorageData(newData);
      return newData;
    });

    switch (obstructionType) {
      case 'door':
        setDoorSelected(!doorSelected);
        doorData.selected = !doorData.selected;
        if (!doorSelected) {
          // If door is deselected, clear input fields
          setDoorHeight('');
          setDoorWidth('');
          setDoorCenter('');
          doorData.height = '';
          doorData.width = '';
          doorData.center = '';
        }
        break;
      case 'window':
        setWindowSelected(!windowSelected);
        windowData.selected = !windowData.selected;
        if (!windowSelected) {
          // If window is deselected, clear input fields
          setWindowHeight('');
          setWindowWidth('');
          setWindowCenter('');
          windowData.height = '';
          windowData.width = '';
          windowData.center = '';
        }
        break;
      case 'beam':
        setBeamSelected(!beamSelected);
        beamData.selected = !beamData.selected;
        beamData.selected = true;
        if (!beamSelected) {
          // If beam is deselected, clear input fields
          setBeamHeight('');
          setBeamWidth('');
          setBeamCenter('');
          beamData.height = '';
          beamData.width = '';
          beamData.center = '';
        }
        break;
      case 'other':
        setOtherSelected(!otherSelected);
        otherData.selected = !otherData.selected;
        if (!otherSelected) {
          // If other is deselected, clear input fields
          setOtherHeight('');
          setOtherWidth('');
          setOtherCenter('');
          otherData.height = '';
          otherData.width = '';
          otherData.center = '';
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{marginLeft: '20px'}}>
      <div className="bg-white p-8 text-center" style={containerStyle}>
        <h1 style={headingStyle}>Obstructions: {wallHeading}</h1>
        <p style={subheadingStyle}>Please select any obstructions on your wall.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <svg width="222" height="213" viewBox="0 0 222 213" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => toggleImageSelection('door')}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V206C222 209.866 218.866 213 215 213H7C3.134 213 0 209.866 0 206V7Z" fill={doorSelected === true ? '#84FFAE75' : "#F9FAFB"} />
            <path d="M77.4688 45.8155V166.634" stroke="#615D5A" stroke-width="3" stroke-linecap="round" />
            <path d="M77.4688 45.8155L142.72 45.4941" stroke="#615D5A" stroke-width="3" stroke-linecap="round" />
            <path d="M143.375 45.4844L142.657 166.634" stroke="#615D5A" stroke-width="3" stroke-linecap="round" />
            <path d="M137.233 100.587C137.233 101.476 136.423 102.198 135.422 102.198C134.422 102.198 133.611 101.476 133.611 100.587C133.611 99.6971 134.422 98.9758 135.422 98.9758C136.423 98.9758 137.233 99.3839 137.233 100.587Z" fill="#615D5A" />
          </svg>


        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="number"
            placeholder="Door height"
            style={{
              ...inputStyle,
              border: doorSelected ? '2px solid black' : 'none',
              backgroundColor: doorSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={doorHeight}
            onChange={(e) => {
              setDoorHeight(e.target.value);
              doorData.height = e.target.value;
              handleInputChange('door', 'height', e.target.value);
            }}
          />

          <input
            type="number"
            placeholder="Door width"
            style={{
              ...inputStyle,
              border: doorSelected ? '2px solid black' : 'none',
              backgroundColor: doorSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={doorWidth}
            onChange={(e) => {
              // Update the context directly here
              setDoorWidth(e.target.value);
              doorData.width = e.target.value;
              handleInputChange('door', 'width', e.target.value);
            }}
          />

          <input
            type="number"
            placeholder="Door center"
            style={{
              ...inputStyle,
              border: doorSelected ? '2px solid black' : 'none',
              backgroundColor: doorSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={doorCenter}
            onChange={(e) => {
              setDoorCenter(e.target.value);
              doorData.center = e.target.value;
              handleInputChange('door', 'center', e.target.value);
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <svg width="222" height="213" viewBox="0 0 222 213" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => toggleImageSelection('window')}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V206C222 209.866 218.866 213 215 213H7C3.134 213 0 209.866 0 206V7Z" fill={windowSelected === true ? '#84FFAE75' : "#F9FAFB"} />
            <path d="M62.4375 80.0127V132.005" stroke="#615D5A" stroke-width="3" stroke-linecap="round" />
            <path d="M62.4375 80.0127L160.063 79.875" stroke="#615D5A" stroke-width="3" stroke-linecap="round" />
            <path d="M160.063 132.965V80.9732" stroke="#615D5A" stroke-width="3" stroke-linecap="round" />
            <path d="M160.063 132.965L62.4373 133.103" stroke="#615D5A" stroke-width="3" stroke-linecap="round" />
          </svg>



        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="number"
            placeholder="Window height"
            style={{
              ...inputStyle,
              border: windowSelected ? '2px solid black' : 'none',
              backgroundColor: windowSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={windowHeight}
            onChange={(e) => {
              setWindowHeight(e.target.value);
              windowData.height = e.target.value;
              handleInputChange('window', 'height', e.target.value);
            }}
          />

          <input
            type="number"
            placeholder="Window width"
            style={{
              ...inputStyle,
              border: windowSelected ? '2px solid black' : 'none',
              backgroundColor: windowSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={windowWidth}
            onChange={(e) => {
              setWindowWidth(e.target.value);
              windowData.width = e.target.value;
              handleInputChange('window', 'width', e.target.value);
            }}
          />

          <input
            type="number"
            placeholder="Window center"
            style={{
              ...inputStyle,
              border: windowSelected ? '2px solid black' : 'none',
              backgroundColor: windowSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={windowCenter}
            onChange={(e) => {
              // Update the context directly here
              setWindowCenter(e.target.value);
              windowData.center = e.target.value;
              handleInputChange('window', 'center', e.target.value);
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <svg width="222" height="213" viewBox="0 0 222 213" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            onClick={() => toggleImageSelection('beam')}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V206C222 209.866 218.866 213 215 213H7C3.134 213 0 209.866 0 206V7Z" fill={beamSelected === true ? '#84FFAE75' : "#F9FAFB"} />
            <rect x="60.125" y="64.3438" width="101.75" height="84.3125" rx="20" fill="url(#pattern0)" />
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use href="#image0_531_106399" transform="matrix(0.00555556 0 0 0.00670455 0 -0.10341)" />
              </pattern>
              <image id="image0_531_106399" width="180" height="180" href="data:image/jpeg;base64,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" />
            </defs>
          </svg>


        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="number"
            placeholder="Beam height"
            style={{
              ...inputStyle,
              border: beamSelected ? '2px solid black' : 'none',
              backgroundColor: beamSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={beamHeight}
            onChange={(e) => {
              // Update the context directly here
              setBeamHeight(e.target.value);
              beamData.height = e.target.value;
              handleInputChange('beam', 'height', e.target.value);
            }}
          />

          <input
            type="number"
            placeholder="Beam width"
            style={{
              ...inputStyle,
              border: beamSelected ? '2px solid black' : 'none',
              backgroundColor: beamSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={beamWidth}
            onChange={(e) => {
              // Update the context directly here
              setBeamWidth(e.target.value);
              beamData.width = e.target.value;
              handleInputChange('beam', 'width', e.target.value);
            }}
          />

          <input
            type="number"
            placeholder="Beam center"
            style={{
              ...inputStyle,
              border: beamSelected ? '2px solid black' : 'none',
              backgroundColor: beamSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={beamCenter}
            onChange={(e) => {
              // Update the context directly here
              setBeamCenter(e.target.value);
              beamData.center = e.target.value;
              handleInputChange('beam', 'center', e.target.value);
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <svg width="222" height="53" viewBox="0 0 222 53" fill="none" xmlns="http://www.w3.org/2000/svg"
          onClick={() => toggleImageSelection('other')}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V46C222 49.866 218.866 53 215 53H7C3.134 53 0 49.866 0 46V7Z" fill={otherSelected === true ? '#84FFAE75' : "#F9FAFB"} />
          </svg>

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
            style={{
              ...inputStyle,
              border: otherSelected ? '2px solid black' : 'none',
              backgroundColor: otherSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={otherHeight}
            onChange={(e) => {
              // Update the context directly here
              setOtherHeight(e.target.value);
              otherData.height = e.target.value;
              handleInputChange('other', 'height', e.target.value);
            }}
          />

          <input
            type="number"
            placeholder="Other width"
            style={{
              ...inputStyle,
              border: otherSelected ? '2px solid black' : 'none',
              backgroundColor: otherSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={otherWidth}
            onChange={(e) => {
              // Update the context directly here
              setOtherWidth(e.target.value);
              otherData.width = e.target.value;
              handleInputChange('other', 'width', e.target.value);
            }}
          />

          <input
            type="number"
            placeholder="Other center"
            style={{
              ...inputStyle,
              border: otherSelected ? '2px solid black' : 'none',
              backgroundColor: otherSelected ? '#84FFAE75' : '#F9FAFB',
            }}
            value={otherCenter}
            onChange={(e) => {
              // Update the context directly here
              setOtherCenter(e.target.value);
              otherData.center = e.target.value;
              handleInputChange('other', 'center', e.target.value);
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

export default Obstruction;
