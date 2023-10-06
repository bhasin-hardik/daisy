import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



import { useApplianceContext } from './ApplianceContext';
const Appliance: React.FC = () => {
  const navigate = useNavigate();
  // const { calculateWallsNeeded, selectedLayout } = useLayoutContext();
  const { wallApplianceData, setApplianceError } = useApplianceContext();
  const wallsNeededFromStorage = JSON.parse(localStorage.getItem('wallsNeeded') || 'null');
  const numWalls = wallsNeededFromStorage;
  const { count } = useParams<{ count: string }>();
  let wallIndex = 0;
  const wallLetter = count ? String.fromCharCode(64 + parseInt(count)) : '';
  useEffect(() => {
    // Scroll to the top of the screen when the component mounts
    window.scrollTo(0, 0);
  }, [navigate]);


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
  const [wallApplianceDatafromLocal, setWallApplianceDatafromLocal] = useState(() => {
    // Initialize with data from local storage or default values
    const defaultData = {
      refrigerator: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      sink: {
        selected: false,

        width: '',
        center: '',
      },
      range: {
        selected: false,

        width: '',
        center: '',
      },
      dish: {
        selected: false,

        width: '',
        center: '',
      },
    };

    return JSON.parse(localStorage.getItem(`appliance_${wallLetter}`) || 'null') || defaultData;
  });

  const initializeLocalData = () => {
    const defaultData = {
      refrigerator: {
        selected: false,
        height: '',
        width: '',
        center: '',
      },
      sink: {
        selected: false,

        width: '',
        center: '',
      },
      range: {
        selected: false,

        width: '',
        center: '',
      },
      dish: {
        selected: false,

        width: '',
        center: '',
      }
    };
    localStorage.setItem(`appliance_${wallLetter}`, JSON.stringify(defaultData));
    return defaultData;

  };
 
  const updateLocalStorageData = (data: object) => {
    localStorage.setItem(`appliance_${wallLetter}`, JSON.stringify(data));
  };
  const applianceDataFromLocalStorage = JSON.parse(localStorage.getItem(`appliance_${wallLetter}`) || '{}');
  
  const refrigeratorLocal = applianceDataFromLocalStorage.refrigerator;
  const sinkLocal = applianceDataFromLocalStorage.sink;
  const rangeLocal = applianceDataFromLocalStorage.range;
  const dishLocal = applianceDataFromLocalStorage.dish;




  const [refrigeratorSelected, setrefrigeratorSelected] = useState(refrigeratorLocal.selected);
  const [sinkSelected, setsinkSelected] = useState(sinkLocal.selected);
  const [rangeSelected, setrangeSelected] = useState(rangeLocal.selected);
  const [dishSelected, setdishSelected] = useState(dishLocal.selected);

  const [refrigeratorHeight, setrefrigeratorHeight] = useState(refrigeratorLocal.height);
  const [refrigeratorWidth, setrefrigeratorWidth] = useState(refrigeratorLocal.width);
  const [refrigeratorCenter, setrefrigeratorCenter] = useState(refrigeratorLocal.center);


  const [sinkWidth, setsinkWidth] = useState(sinkLocal.width);
  const [sinkCenter, setsinkCenter] = useState(sinkLocal.center);


  const [rangeWidth, setrangeWidth] = useState(rangeLocal.width);
  const [rangeCenter, setrangeCenter] = useState(rangeLocal.center);


  const [dishWidth, setdishWidth] = useState(dishLocal.width);
  const [dishCenter, setdishCenter] = useState(dishLocal.center);

  const [error, setError] = useState('');
  const resetApplianceData = () => {
    // Reset state variables for selected options and inputs
    setrefrigeratorSelected(false);
    setsinkSelected(false);
    setrangeSelected(false);
    setdishSelected(false);
  
  
    setrefrigeratorHeight('');
    setrefrigeratorWidth('');
    setrefrigeratorCenter('');
  
    
    setsinkWidth('');
    setsinkCenter('');
  
    
    setdishWidth('');
    setdishCenter('');
  
   
    setrangeWidth('');
    setrangeCenter('');
  
    // Clear local storage data
    
  };

  const handleSubmit = () => {
    let hasError = false;

    if (refrigeratorSelected) {
      const refrigeratorHeightValue = parseFloat(refrigeratorLocal.height);
      const refrigeratorWidthValue = parseFloat(refrigeratorLocal.width);
      const refrigeratorCenterValue = parseFloat(refrigeratorLocal.center);

      if (
        isNaN(refrigeratorHeightValue) ||
        isNaN(refrigeratorWidthValue) ||
        isNaN(refrigeratorCenterValue) ||
        refrigeratorHeightValue < 0 ||
        refrigeratorWidthValue < 0 ||
        refrigeratorCenterValue < 0
      ) {
        setApplianceError('Please enter valid positive numbers for refrigerator fields.', wallIndex);
        setError('Please enter valid positive numbers for refrigerator fields.');
        hasError = true;
      }
    }

    if (sinkSelected) {
      const sinkWidthValue = parseFloat(sinkLocal.width);
      const sinkCenterValue = parseFloat(sinkLocal.center);

      if (
        isNaN(sinkWidthValue) ||
        isNaN(sinkCenterValue) ||
        sinkWidthValue < 0 ||
        sinkCenterValue < 0
      ) {
        setApplianceError('Please enter valid positive numbers for sink fields.', wallIndex);
        setError('Please enter valid positive numbers for sink fields.');
        hasError = true;
      }
    }

    if (rangeSelected) {
      const rangeWidthValue = parseFloat(rangeLocal.width);
      const rangeCenterValue = parseFloat(rangeLocal.center);

      if (
        isNaN(rangeWidthValue) ||
        isNaN(rangeCenterValue) ||
        rangeWidthValue < 0 ||
        rangeCenterValue < 0
      ) {
        setApplianceError('Please enter valid positive numbers for range fields.', wallIndex);
        setError('Please enter valid positive numbers for range fields.');
        hasError = true;
      }
    }

    if (dishSelected) {
      const dishWidthValue = parseFloat(dishLocal.width);
      const dishCenterValue = parseFloat(dishLocal.center);

      if (
        isNaN(dishWidthValue) ||
        isNaN(dishCenterValue) ||
        dishWidthValue < 0 ||
        dishCenterValue < 0
      ) {
        setApplianceError('Please enter valid positive numbers for dish fields.', wallIndex);
        setError('Please enter valid positive numbers for dish fields.');
        hasError = true;
      }
    }

    if (!hasError) {
      if (count) {
        const nextNumWalls = parseInt(count) + 1; // Increment the parameter
        if (numWalls > 1) {
          if (nextNumWalls <= numWalls) {
            resetApplianceData();
            navigate(`/appliance/${nextNumWalls}`); // Navigate to the next Obstruction component
          } else {
            navigate('/cabinet');
          }
        } else {
          navigate('/cabinet');
        }
      } else {
        navigate('/cabinet');
      }
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
    width: '100%',
    height: 'auto',
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

   const inputStyle = {
    width: '100%',
    height: 'auto',
    maxWidth: '295px',
    backgroundColor: '#F9FAFB',
    marginBottom: '10px',
    marginTop: '10px',
    padding: '20px',
    color: '#0E180A',
    fontSize: '16px',
  };
  const handleInputChange = (applianceType: string, field: string, value: string) => {
    setWallApplianceDatafromLocal((prevData: any) => {
      const newData = { ...prevData };
      newData[applianceType][field] = value;
      updateLocalStorageData(newData);
      return newData;
    });
  };

  const toggleImageSelection = (applianceType: string) => {
    setError(''); // Clear any previous error messages
    const updatedData = { ...wallApplianceDatafromLocal };
    updatedData[applianceType].selected = !updatedData[applianceType].selected;
    setWallApplianceDatafromLocal(updatedData);
    setWallApplianceDatafromLocal((prevData: any) => {
      const newData = { ...prevData };
      newData[applianceType].selected = !newData[applianceType].selected;
      updateLocalStorageData(newData);
      return newData;
    });

    switch (applianceType) {
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
    <div className="min-h-screen flex flex-col items-center justify-center" style={{marginLeft: '20px', marginTop: '30px'}}  >
      <div className="bg-white p-8 text-center" style={containerStyle}>
        <h1 style={headingStyle}>Appliances: {wallHeading}</h1>
        <p style={subheadingStyle}>Please select any obstructions on your wall.</p>
      </div>
  
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '222px' }}>
          <svg width="100%" height="auto" viewBox="0 0 222 213" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => toggleImageSelection('refrigerator')}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V206C222 209.866 218.866 213 215 213H7C3.134 213 0 209.866 0 206V7Z" fill={refrigeratorLocal.selected === true ? (error && refrigeratorLocal.selected ? '#FA6161' : '#84FFAE75') : "#F9FAFB"} />
            <path d="M77.4688 45.8157V166.634" stroke={refrigeratorLocal.selected === true ? 'black' : '#615D5A'} stroke-width="3" stroke-linecap="round" />
            <path d="M77.4688 45.8157L142.72 45.4957" stroke={refrigeratorLocal.selected === true ? 'black' : '#615D5A'} stroke-width="3" stroke-linecap="round" />
            <path d="M143.375 45.4844L142.647 166.634" stroke={refrigeratorLocal.selected === true ? 'black' : '#615D5A'} stroke-width="3" stroke-linecap="round" />
          </svg>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="number"
            placeholder="Refrigerator height"
            style={{
              ...inputStyle,
              border: refrigeratorLocal.selected ? '2px solid black' : 'none',
              backgroundColor: refrigeratorLocal.selected && !error ? '#84FFAE75' : '#F9FAFB',
            }}
            value={refrigeratorLocal.height}
            onChange={(e) => {
              setrefrigeratorHeight(e.target.value);
              refrigeratorData.height = e.target.value;
              handleInputChange('refrigerator', 'height', e.target.value);

            }}
          />

          <input
            type="number"
            placeholder="Refrigerator width"
            style={{
              ...inputStyle,
              border: refrigeratorLocal.selected ? '2px solid black' : 'none',
              backgroundColor: refrigeratorLocal.selected && !error ? '#84FFAE75' : '#F9FAFB',
            }}
            value={refrigeratorLocal.width}
            onChange={(e) => {
              setrefrigeratorWidth(e.target.value);
              refrigeratorData.width = e.target.value;
              handleInputChange('refrigerator', 'width', e.target.value);

            }}
          />

          <input
            type="number"
            placeholder="Refrigerator center"
            style={{
              ...inputStyle,
              border: refrigeratorLocal.selected ? '2px solid black' : 'none',
              backgroundColor: refrigeratorLocal.selected && !error ? '#84FFAE75' : '#F9FAFB',
            }}
            value={refrigeratorLocal.center}
            onChange={(e) => {
              setrefrigeratorCenter(e.target.value);
              refrigeratorData.center = e.target.value;
              handleInputChange('refrigerator', 'center', e.target.value);

            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' , marginTop:'20px',width: '100%', maxWidth: '222px'}}>
          <svg width="100%" height="auto" viewBox="0 0 222 213" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => toggleImageSelection('sink')}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V206C222 209.866 218.866 213 215 213H7C3.134 213 0 209.866 0 206V7Z" fill={sinkLocal.selected === true ? (error && sinkLocal.selected ? '#FA6161' : '#84FFAE75') : "#F9FAFB"} />
            <rect x="71.5312" y="79.7656" width="77.7812" height="53.4688" rx="3" fill="#F9FAFB" fill-opacity="0.46" stroke={sinkLocal.selected ===  true ? 'black' : '#615D5A'} stroke-width="2" />
            <path d="M115.25 106.5C115.25 108.805 113.131 110.747 110.422 110.747C107.712 110.747 105.594 108.805 105.594 106.5C105.594 104.195 107.712 102.253 110.422 102.253C113.131 102.253 115.25 104.195 115.25 106.5Z" fill="#F9FAFB" fill-opacity="0.46" stroke={sinkLocal.selected ===  true ? 'black' : '#615D5A'} stroke-width="0.75" />
          </svg>


        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>


          <input
            type="number"
            placeholder="Sink width"
            style={{
              ...inputStyle,
              border: sinkLocal.selected ? '2px solid black' : 'none',
              backgroundColor: sinkLocal.selected && !error ? '#84FFAE75' : '#F9FAFB',
            }}
            value={sinkLocal.width}
            onChange={(e) => {
              setsinkWidth(e.target.value);
              sinkData.width = e.target.value;
              handleInputChange('sink', 'width', e.target.value);

            }}
          />

          <input
            type="number"
            placeholder="Sink center"
            style={{
              ...inputStyle,
              border: sinkLocal.selected ? '2px solid black' : 'none',
              backgroundColor: sinkLocal.selected && !error ? '#84FFAE75' : '#F9FAFB',
            }}
            value={sinkLocal.center}
            onChange={(e) => {
              setsinkCenter(e.target.value);
              sinkData.center = e.target.value;
              handleInputChange('sink', 'center', e.target.value);

            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' , marginTop:'20px', width: '100%', maxWidth: '222px'}}>
          <svg width="100%" height="auto" viewBox="0 0 222 213" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => toggleImageSelection('range')}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V206C222 209.866 218.866 213 215 213H7C3.134 213 0 209.866 0 206V7Z" fill={rangeLocal.selected === true ? (error && rangeLocal.selected ? '#FA6161' : '#84FFAE75') : "#F9FAFB"} />
            <rect x="76.1562" y="78.6562" width="69.6875" height="55.6875" rx="3" stroke={rangeLocal.selected === true ? 'black' : '#615D5A'} stroke-width="2" />
            <path d="M134.06 93.9591C134.06 98.5676 129.942 102.363 124.785 102.363C119.628 102.363 115.51 98.5676 115.51 93.9591C115.51 89.3506 119.628 85.5556 124.785 85.5556C129.942 85.5556 134.06 89.3506 134.06 93.9591Z" stroke={rangeLocal.selected === true ? 'black' : '#615D5A'} stroke-width="0.75" />
            <path d="M134.06 119.041C134.06 123.649 129.942 127.444 124.785 127.444C119.628 127.444 115.51 123.649 115.51 119.041C115.51 114.432 119.628 110.637 124.785 110.637C129.942 110.637 134.06 114.432 134.06 119.041Z" stroke={rangeLocal.selected === true ? 'black' : '#615D5A'} stroke-width="0.75" />
            <path d="M106.489 93.9592C106.489 98.5677 102.37 102.363 97.2137 102.363C92.0569 102.363 87.9385 98.5677 87.9385 93.9592C87.9385 89.3507 92.0569 85.5557 97.2137 85.5557C102.37 85.5557 106.489 89.3507 106.489 93.9592Z" stroke={rangeLocal.selected === true ? 'black' : '#615D5A'} stroke-width="0.75" />
            <path d="M106.489 119.041C106.489 123.649 102.37 127.444 97.2137 127.444C92.0569 127.444 87.9385 123.649 87.9385 119.041C87.9385 114.432 92.0569 110.637 97.2137 110.637C102.37 110.637 106.489 114.432 106.489 119.041Z" stroke={rangeLocal.selected === true ? 'black' : '#615D5A'} stroke-width="0.75" />
          </svg>


        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>


          <input
            type="number"
            placeholder="Range width"
            style={{
              ...inputStyle,
              border: rangeLocal.selected ? '2px solid black' : 'none',
              backgroundColor: rangeLocal.selected && !error ? '#84FFAE75' : '#F9FAFB',
            }}
            value={rangeLocal.width}
            onChange={(e) => {
              setrangeWidth(e.target.value);
              rangeData.width = e.target.value;
              handleInputChange('range', 'width', e.target.value);

            }}
          />

          <input
            type="number"
            placeholder="Range center"
            style={{
              ...inputStyle,
              border: rangeLocal.selected ? '2px solid black' : 'none',
              backgroundColor: rangeLocal.selected && !error ? '#84FFAE75' : '#F9FAFB',
            }}
            value={rangeLocal.center}
            onChange={(e) => {
              setrangeCenter(e.target.value);
              rangeData.center = e.target.value;
              handleInputChange('range', 'center', e.target.value);

            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' , marginTop:'20px', width: '100%', maxWidth: '222px'}}>
          <svg width="100%" height="auto" viewBox="0 0 222 213" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => toggleImageSelection('dish')}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V206C222 209.866 218.866 213 215 213H7C3.134 213 0 209.866 0 206V7Z" fill={dishLocal.selected === true ? (error &&  dishLocal.selected ? '#FA6161' : '#84FFAE75') : "#F9FAFB"} />
            <path d="M77.4688 74.5016V137.791" stroke={dishLocal.selected === true ? 'black' : '#615D5A'} stroke-width="3" stroke-linecap="round" />
            <path d="M77.4688 74.5016L142.72 74.334" stroke={dishLocal.selected === true ? 'black' : '#615D5A'} stroke-width="3" stroke-linecap="round" />
            <path d="M143.375 74.3281L142.657 137.791" stroke={dishLocal.selected === true ? 'black' : '#615D5A'} stroke-width="3" stroke-linecap="round" />
            <path d="M77.8994 93.2704L142.219 93.1875" stroke={dishLocal.selected === true ? 'black' : '#615D5A'} stroke-width="3" stroke-linecap="round" />
          </svg>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>


          <input
            type="number"
            placeholder="Dish width"
            style={{
              ...inputStyle,
              border: dishLocal.selected ? '2px solid black' : 'none',
              backgroundColor: dishLocal.selected && !error ? '#84FFAE75' : '#F9FAFB',
            }}
            value={dishLocal.width}
            onChange={(e) => {
              setdishWidth(e.target.value);
              dishData.width = e.target.value;
              handleInputChange('dish', 'width', e.target.value);

            }}
          />

          <input
            type="number"
            placeholder="Dish center"
            style={{
              ...inputStyle,
              border: dishLocal.selected ? '2px solid black' : 'none',
              backgroundColor: dishLocal.selected && !error ? '#84FFAE75' : '#F9FAFB',
            }}
            value={dishLocal.center}
            onChange={(e) => {
              setdishCenter(e.target.value);
              dishData.center = e.target.value;
              handleInputChange('dish', 'center', e.target.value);

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
