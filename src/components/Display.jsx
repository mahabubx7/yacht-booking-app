import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYachts, getYacht } from '../redux/yacht/yachtSlice';
import YachtDetail from './yacht/YachtDetail';

function Display() {
  const dispatch = useDispatch();
  const { yachts, loading, error, loaded } = useSelector(
    (store) => store.yachts,
  );

  const [view, setView] = useState(false);
  const [selectedYachtId, setSelectedYachtId] = useState(null);

  useEffect(() => {
    if (!loaded) dispatch(fetchYachts());
  }, [dispatch, loaded]);

  const handleView = (id) => {
    if (view) setView(false);
    else {
      setView(true);
      setSelectedYachtId(id);
      dispatch(getYacht(id));
    }
  };

  let content;

  if (loading) {
    content = <h1>Loading ...</h1>;
  } else if (view) {
    content = <YachtDetail yachtId={selectedYachtId} handleView={handleView} />;
  } else if (error) {
    content = <b className='text-red-500'>{String(error)}</b>;
  } else {
    content = (
      <>
        <h1 className='text-4xl text-blue-600 font-bold pt-6 py-20'>
          Display yachts!
        </h1>
        <div className='flex flex-col gap-4 items-center justify-center'>
          <div className='grid place-content-center gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4'>
            {yachts.map((yacht) => (
              <div
                key={yacht.id}
                className='shadow-md cursor-pointer rounded-sm overflow-hidden flex flex-col gap-2 bg-white pb-4'
              >
                <img src={yacht.photo} alt='yacht' />
                <h4 className='text-xl my-2 capitalize font-semibold text-blue-600'>
                  {yacht.model}
                </h4>
                <em>Captain: {yacht.captain_name}</em>
                <b>Price: ${`${yacht.price}`}</b>
                <button
                  type='button'
                  className='btn btn-primary'
                  id={yacht.id}
                  onClick={(e) =>
                    handleView(e.target.id || e.target.parentNode)
                  }
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return <div>{content}</div>;
}

export default Display;
