import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Appliance.css'
import { motion } from 'framer-motion';
const Appliance: React.FC = () => {
  const navigate = useNavigate();
  const wallsNeededFromStorage = JSON.parse(localStorage.getItem('wallsNeeded') ?? 'null');
  const numWalls = wallsNeededFromStorage;
  const { count } = useParams<{ count: string }>();
  let wallIndex = 0;
  console.log(wallIndex);
  const wallLetter = count ? String.fromCharCode(64 + parseInt(count)) : '';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  if (count !== undefined) {
    wallIndex = parseInt(count) - 1;
  }
  const defaultData = {
    refrigerator: {
      selected: false,
      height: '',
      width: '',
      center: ''
    },
    sink: {
      selected: false,

      width: '',
      center: ''
    },
    range: {
      selected: false,

      width: '',
      center: ''
    },
    dish: {
      selected: false,

      width: '',
      center: ''
    }
  };

  const [wallApplianceDatafromLocal, setWallApplianceDatafromLocal] = useState(defaultData);

  const [refFieldsFocused, setrefFieldFocused] = useState(false);
  const [sinkFieldsFocused, setsinkFieldFocused] = useState(false);
  const [rangeFieldsFocused, setrangeFieldFocused] = useState(false);
  const [dishFieldsFocused, setdishFieldFocused] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(`appliance_${wallLetter}`);
    if (savedData) {
      setWallApplianceDatafromLocal(JSON.parse(savedData));
    } else {
      setWallApplianceDatafromLocal(defaultData);
    }
  }, [wallLetter]);

  const updateLocalStorageData = (data: object) => {
    localStorage.setItem(`appliance_${wallLetter}`, JSON.stringify(data));
  };
  const applianceDataFromLocalStorage = wallApplianceDatafromLocal;

  const refrigeratorLocal = applianceDataFromLocalStorage.refrigerator || {};
  const sinkLocal = applianceDataFromLocalStorage.sink || {};
  const rangeLocal = applianceDataFromLocalStorage.range || {};
  const dishLocal = applianceDataFromLocalStorage.dish || {};

  const [refrigeratorSelected, setrefrigeratorSelected] = useState(refrigeratorLocal.selected || false);
  const [sinkSelected, setsinkSelected] = useState(sinkLocal.selected || false);
  const [rangeSelected, setrangeSelected] = useState(rangeLocal.selected || false);
  const [dishSelected, setdishSelected] = useState(dishLocal.selected || false);

  const [refrigeratorHeight, setrefrigeratorHeight] = useState(refrigeratorLocal.height || '');
  const [refrigeratorWidth, setrefrigeratorWidth] = useState(refrigeratorLocal.width || '');
  const [refrigeratorCenter, setrefrigeratorCenter] = useState(refrigeratorLocal.center || '');

  const [sinkWidth, setsinkWidth] = useState(sinkLocal.width || '');
  const [sinkCenter, setsinkCenter] = useState(sinkLocal.center || '');

  const [rangeWidth, setrangeWidth] = useState(rangeLocal.width || '');
  const [rangeCenter, setrangeCenter] = useState(rangeLocal.center || '');

  const [dishWidth, setdishWidth] = useState(dishLocal.width || '');
  const [dishCenter, setdishCenter] = useState(dishLocal.center || '');

  const [referror, setrefError] = useState('');
  const [sinkerror, setsinkError] = useState('');
  const [rangeerror, setrangeError] = useState('');
  const [disherror, setdishError] = useState('');
  console.log(refrigeratorHeight);
  console.log(refrigeratorWidth);
  console.log(refrigeratorCenter);

  console.log(sinkWidth);
  console.log(sinkCenter);

  console.log(rangeCenter);
  console.log(rangeWidth);

  console.log(dishCenter);
  console.log(dishWidth);
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
    setrefError('');
    setsinkError('');
    setrangeError('');
    setdishError('');
    const refrigeratorHeightValue = parseFloat(refrigeratorLocal.height);
    const refrigeratorWidthValue = parseFloat(refrigeratorLocal.width);
    const refrigeratorCenterValue = parseFloat(refrigeratorLocal.center);

    const sinkWidthValue = parseFloat(sinkLocal.width);
    const sinkCenterValue = parseFloat(sinkLocal.center);

    const rangeWidthValue = parseFloat(rangeLocal.width);
    const rangeCenterValue = parseFloat(rangeLocal.center);

    const dishWidthValue = parseFloat(dishLocal.width);
    const dishCenterValue = parseFloat(dishLocal.center);

    const isRefValid =
      (refrigeratorHeightValue >= 0 && refrigeratorWidthValue >= 0 && refrigeratorCenterValue >= 0) ||
      (refrigeratorHeightValue === 0 && refrigeratorWidthValue === 0 && refrigeratorCenterValue === 0) ||
      (!refrigeratorHeightValue && !refrigeratorWidthValue && !refrigeratorCenterValue);

    const isSinkValid =
      (sinkWidthValue >= 0 && sinkCenterValue >= 0) ||
      (sinkWidthValue === 0 && sinkCenterValue === 0) ||
      (!sinkWidthValue && !sinkCenterValue);

    const isRangeValid =
      (rangeWidthValue >= 0 && rangeCenterValue >= 0) ||
      (rangeWidthValue === 0 && rangeCenterValue === 0) ||
      (!rangeWidthValue && !rangeCenterValue);

    const isDishValid =
      (dishWidthValue >= 0 && dishCenterValue >= 0) ||
      (dishWidthValue === 0 && dishCenterValue === 0) ||
      (!dishWidthValue && !dishCenterValue);
    if (!isRefValid) {
      setrefError('Please fill all positive values for refrigerator.');
      return;
    }
    if (!isSinkValid) {
      setsinkError('Please fill all positive values for Sink.');
      return;
    }
    if (!isRangeValid) {
      setrangeError('Please fill all positive values for Range.');
      return;
    }
    if (!isDishValid) {
      setdishError('Please fill all positive values for Dish.');
      return;
    }

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
  };

  const getWallHeading = (wallNumber: number) => {
    const wallAlphabet = String.fromCharCode(65 + wallNumber - 1);
    return `Wall ${wallAlphabet}`;
  };

  // Use the function to get the wall heading
  let wallHeading;
  if (count !== undefined) {
    wallHeading = getWallHeading(parseInt(count));
  }

  const handleInputChange = (applianceType: string, field: string, value: string) => {
    setWallApplianceDatafromLocal((prevData: any) => {
      const newData = { ...prevData };
      newData[applianceType][field] = value;
      updateLocalStorageData(newData);
      return newData;
    });
  };

  const toggleImageSelection = (applianceType: string) => {
    setrefError('');
    setsinkError('');
    setrangeError('');
    setdishError('');
    const updatedData = { ...wallApplianceDatafromLocal };
    (updatedData as { [key: string]: { selected: boolean } })[applianceType].selected = !(updatedData as { [key: string]: { selected: boolean } })[applianceType].selected;
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
        refrigeratorLocal.selected = !refrigeratorLocal.selected;
        if (!refrigeratorSelected) {
          // If refrigerator is deselected, clear input fields
          setrefrigeratorHeight('');
          setrefrigeratorWidth('');
          setrefrigeratorCenter('');
        }
        break;
      case 'sink':
        setsinkSelected(!sinkSelected);
        sinkLocal.selected = !sinkLocal.selected;
        if (!sinkSelected) {
          // If sink is deselected, clear input fields

          setsinkWidth('');
          setsinkCenter('');
        }
        break;
      case 'range':
        setrangeSelected(!rangeSelected);
        rangeLocal.selected = !rangeLocal.selected;
        if (!rangeSelected) {
          // If range is deselected, clear input fields

          setrangeWidth('');
          setrangeCenter('');
        }
        break;
      case 'dish':
        setdishSelected(!dishSelected);
        dishLocal.selected = !dishLocal.selected;

        if (!dishSelected) {
          // If dish is deselected, clear input fields
          dishLocal.selected = !dishLocal.selected;
          setdishWidth('');
          setdishCenter('');
        }
        break;
      default:
        break;
    }
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center mainContain"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }} >
      <div className="bg-white p-8 text-center containStyle" >
        <h1 className='heading'>Appliances: {wallHeading}</h1>
        <p className='subheading'>Please select any obstructions on your wall.</p>
      </div>

      <div className='BoxOuter'>
        <div className='BoxInner'>
          <svg width="100%" height="auto" viewBox="0 0 222 213" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => { toggleImageSelection('refrigerator'); }}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V206C222 209.866 218.866 213 215 213H7C3.134 213 0 209.866 0 206V7Z"
              fill={
                referror && !refFieldsFocused
                  ? '#F69898' // Case 1
                  : refrigeratorLocal.selected || refFieldsFocused
                    ? '#84FFAE75' // Case 2
                    : '#F9FAFB' // Case 3
              } />
            <path d="M77.4688 45.8157V166.634" stroke={referror || refFieldsFocused || refrigeratorLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="3" strokeLinecap="round" />
            <path d="M77.4688 45.8157L142.72 45.4957" stroke={referror || refFieldsFocused || refrigeratorLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="3" strokeLinecap="round" />
            <path d="M143.375 45.4844L142.647 166.634" stroke={referror || refFieldsFocused || refrigeratorLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="3" strokeLinecap="round" />
          </svg>

        </div>

        <div className='inputOuter'>
          <input
            type="number"
            placeholder="Refrigerator height"
            className='ref-input'
            data-selected={refrigeratorLocal.selected}
            data-error={referror !== ''}
            data-focus={refFieldsFocused}

            value={refrigeratorLocal.height}
            onChange={(e) => {
              setrefrigeratorHeight(e.target.value);

              handleInputChange('refrigerator', 'height', e.target.value);
            }}
            onFocus={() => {
              setrefFieldFocused(true);
            }}
            onBlur={() => {
              setrefFieldFocused(false);
            }}
          />

          <input
            type="number"
            placeholder="Refrigerator width"
            className='ref-input'
            data-selected={refrigeratorLocal.selected}
            data-error={referror !== ''}
            data-focus={refFieldsFocused}
            value={refrigeratorLocal.width}
            onChange={(e) => {
              setrefrigeratorWidth(e.target.value);

              handleInputChange('refrigerator', 'width', e.target.value);
            }}
            onFocus={() => {
              setrefFieldFocused(true);
            }}
            onBlur={() => {
              setrefFieldFocused(false);
            }}
          />

          <input
            type="number"
            placeholder="Refrigerator center"
            className='ref-input'
            data-selected={refrigeratorLocal.selected}
            data-error={referror !== ''}
            data-focus={refFieldsFocused}
            value={refrigeratorLocal.center}
            onChange={(e) => {
              setrefrigeratorCenter(e.target.value);

              handleInputChange('refrigerator', 'center', e.target.value);
            }}
            onFocus={() => {
              setrefFieldFocused(true);
            }}
            onBlur={() => {
              setrefFieldFocused(false);
            }}
          />
        </div>
      </div>

      <div className='BoxOuter'>
        <div className='BoxInner'>
          <svg width="100%" height="auto" viewBox="0 0 222 213" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => { toggleImageSelection('sink'); }}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V206C222 209.866 218.866 213 215 213H7C3.134 213 0 209.866 0 206V7Z"
              fill={
                sinkerror && !sinkFieldsFocused
                  ? '#F69898' // Case 1
                  : sinkLocal.selected || sinkFieldsFocused
                    ? '#84FFAE75' // Case 2
                    : '#F9FAFB' // Case 3
              } />
            <rect x="71.5312" y="79.7656" width="77.7812" height="53.4688" rx="3" fill="#F9FAFB" fillOpacity="0.46" stroke={sinkerror || sinkFieldsFocused || sinkLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="2" />
            <path d="M115.25 106.5C115.25 108.805 113.131 110.747 110.422 110.747C107.712 110.747 105.594 108.805 105.594 106.5C105.594 104.195 107.712 102.253 110.422 102.253C113.131 102.253 115.25 104.195 115.25 106.5Z" fill="#F9FAFB" fillOpacity="0.46" stroke={sinkLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="0.75" />
          </svg>

        </div>

        <div className='inputOuter'>

          <input
            type="number"
            placeholder="Sink width"
            className='sink-input'
            data-selected={sinkLocal.selected}
            data-error={sinkerror !== ''}
            data-focus={sinkFieldsFocused}
            value={sinkLocal.width}
            onChange={(e) => {
              setsinkWidth(e.target.value);

              handleInputChange('sink', 'width', e.target.value);
            }}
            onFocus={() => {
              setsinkFieldFocused(true);
            }}
            onBlur={() => {
              setsinkFieldFocused(false);
            }}
          />

          <input
            type="number"
            placeholder="Sink center"
            className='sink-input'
            data-selected={sinkLocal.selected}
            data-error={sinkerror !== ''}
            data-focus={sinkFieldsFocused}
            value={sinkLocal.center}
            onChange={(e) => {
              setsinkCenter(e.target.value);

              handleInputChange('sink', 'center', e.target.value);
            }}
            onFocus={() => {
              setsinkFieldFocused(true);
            }}
            onBlur={() => {
              setsinkFieldFocused(false);
            }}
          />
        </div>
      </div>

      <div className='BoxOuter'>
        <div className='BoxInnerA'>
          <svg width="100%" height="auto" viewBox="0 0 222 213" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => { toggleImageSelection('range'); }}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V206C222 209.866 218.866 213 215 213H7C3.134 213 0 209.866 0 206V7Z"
              fill={
                rangeerror && !rangeFieldsFocused
                  ? '#F69898' // Case 1
                  : rangeLocal.selected || rangeFieldsFocused
                    ? '#84FFAE75' // Case 2
                    : '#F9FAFB' // Case 3
              } />
            <rect x="76.1562" y="78.6562" width="69.6875" height="55.6875" rx="3" stroke={rangeerror || rangeFieldsFocused || rangeLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="2" />
            <path d="M134.06 93.9591C134.06 98.5676 129.942 102.363 124.785 102.363C119.628 102.363 115.51 98.5676 115.51 93.9591C115.51 89.3506 119.628 85.5556 124.785 85.5556C129.942 85.5556 134.06 89.3506 134.06 93.9591Z" stroke={rangeerror || rangeFieldsFocused || rangeLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="0.75" />
            <path d="M134.06 119.041C134.06 123.649 129.942 127.444 124.785 127.444C119.628 127.444 115.51 123.649 115.51 119.041C115.51 114.432 119.628 110.637 124.785 110.637C129.942 110.637 134.06 114.432 134.06 119.041Z" stroke={rangeerror || rangeFieldsFocused || rangeLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="0.75" />
            <path d="M106.489 93.9592C106.489 98.5677 102.37 102.363 97.2137 102.363C92.0569 102.363 87.9385 98.5677 87.9385 93.9592C87.9385 89.3507 92.0569 85.5557 97.2137 85.5557C102.37 85.5557 106.489 89.3507 106.489 93.9592Z" stroke={rangeerror || rangeFieldsFocused || rangeLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="0.75" />
            <path d="M106.489 119.041C106.489 123.649 102.37 127.444 97.2137 127.444C92.0569 127.444 87.9385 123.649 87.9385 119.041C87.9385 114.432 92.0569 110.637 97.2137 110.637C102.37 110.637 106.489 114.432 106.489 119.041Z" stroke={rangeerror || rangeFieldsFocused || rangeLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="0.75" />
          </svg>

        </div>

        <div className='inputOuter'>

          <input
            type="number"
            placeholder="Range width"
            className='range-input'
            data-selected={rangeLocal.selected}
            data-error={rangeerror !== ''}
            data-focus={rangeFieldsFocused}
            value={rangeLocal.width}
            onChange={(e) => {
              setrangeWidth(e.target.value);

              handleInputChange('range', 'width', e.target.value);
            }}
            onFocus={() => {
              setrangeFieldFocused(true);
            }}
            onBlur={() => {
              setrangeFieldFocused(false);
            }}

          />

          <input
            type="number"
            placeholder="Range center"
            className='range-input'
            data-selected={rangeLocal.selected}
            data-error={rangeerror !== ''}
            data-focus={rangeFieldsFocused}
            value={rangeLocal.center}
            onChange={(e) => {
              setrangeCenter(e.target.value);

              handleInputChange('range', 'center', e.target.value);
            }}
            onFocus={() => {
              setrangeFieldFocused(true);
            }}
            onBlur={() => {
              setrangeFieldFocused(false);
            }}
          />
        </div>
      </div>

      <div className='BoxOuter'>
        <div className='BoxInnerA'>
          <svg width="100%" height="auto" viewBox="0 0 222 213" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => { toggleImageSelection('dish'); }}>
            <path d="M0 7C0 3.13401 3.13401 0 7 0H215C218.866 0 222 3.13401 222 7V206C222 209.866 218.866 213 215 213H7C3.134 213 0 209.866 0 206V7Z" fill={
              disherror && !dishFieldsFocused
                ? '#F69898' // Case 1
                : dishLocal.selected || dishFieldsFocused
                  ? '#84FFAE75' // Case 2
                  : '#F9FAFB' // Case 3
            } />
            <path d="M77.4688 74.5016V137.791" stroke={disherror || dishFieldsFocused || dishLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="3" strokeLinecap="round" />
            <path d="M77.4688 74.5016L142.72 74.334" stroke={disherror || dishFieldsFocused || dishLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="3" strokeLinecap="round" />
            <path d="M143.375 74.3281L142.657 137.791" stroke={disherror || dishFieldsFocused || dishLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="3" strokeLinecap="round" />
            <path d="M77.8994 93.2704L142.219 93.1875" stroke={disherror || dishFieldsFocused || dishLocal.selected === true ? 'black' : '#615D5A'} strokeWidth="3" strokeLinecap="round" />
          </svg>

        </div>

        <div className='inputOuter'>

          <input
            type="number"
            placeholder="Dish width"
            className='dish-input'
            data-selected={dishLocal.selected}
            data-error={disherror !== ''}
            data-focus={dishFieldsFocused}
            value={dishLocal.width}
            onChange={(e) => {
              setdishWidth(e.target.value);

              handleInputChange('dish', 'width', e.target.value);
            }}
            onFocus={() => {
              setdishFieldFocused(true);
            }}
            onBlur={() => {
              setdishFieldFocused(false);
            }}
          />

          <input
            type="number"
            placeholder="Dish center"
            className='dish-input'
            data-selected={dishLocal.selected}
            data-error={disherror !== ''}
            data-focus={dishFieldsFocused}
            value={dishLocal.center}
            onChange={(e) => {
              setdishCenter(e.target.value);

              handleInputChange('dish', 'center', e.target.value);
            }}
            onFocus={() => {
              setdishFieldFocused(true);
            }}
            onBlur={() => {
              setdishFieldFocused(false);
            }}
          />
        </div>
      </div>

      {referror && (
        <p className='error'>{referror}</p>
      )}
      {sinkerror && (
        <p className='error'>{sinkerror}</p>
      )}
      {rangeerror && (
        <p className='error'>{rangeerror}</p>
      )}
      {disherror && (
        <p className='error'>{disherror}</p>
      )}
      <div className="button-container">
        <button
          onClick={handleSubmit}
          className=" h-12 mt-8 rounded-md text-white mb-12 buton"

        >
          Submit Details
        </button>
      </div>
    </motion.div>
  );
};

export default Appliance;
