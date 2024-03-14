import { useEffect, useState } from "react";
// import Country from "./Country";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetched();
  }, []);

  const fetched = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => console.log("Error is ", err));
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      fetched();
    }
    console.log(e.target.value);
    searchData(e.target.value);
  };

  const searchData = (inputValue) => {
    console.log("searching => ", inputValue);

    const filterData = countries.filter((item) =>
      item.name.common.toLowerCase().includes(inputValue.toLowerCase())
    );

    const filterArea = countries.filter((item) => item.area >= inputValue);
    // setCountries(filterData);
    console.log(filterArea);
    setCountries(filterArea);
  };

  return (
    <div className='mx-5'>
      <div className='flex flex-col py-5 max-w-96 mx-auto '>
        <input
          className='text-lg outline-none border py-2 px-4 rounded-3xl'
          type='text'
          value={inputValue}
          onChange={handleInput}
          placeholder='Search'
        />
        <div className='flex gap-1 justify-between mt-3'>
          <p className='text-xl'>By </p>
          <button
            className='bg-blue-500 text-lg text-white px-1 rounded-md bg-red-500'
            type='button'
          >
            Country
          </button>
          <button
            className='bg-blue-500 text-lg text-white px-1 rounded-md'
            type='button'
          >
            Area
          </button>
          <button
            className='bg-blue-500 text-lg text-white px-1 rounded-md'
            type='button'
          >
            Population
          </button>
          <button
            className='bg-blue-500 text-lg text-white px-1 rounded-md'
            type='button'
          >
            Region
          </button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {countries.map((country, i) => (
          <div
            key={i}
            className={`border pb-4 ${
              !country?.independent && "bg-red-600 text-white"
            } `}
          >
            <img className='w-full h-52' src={country?.flags?.png} alt='' />
            <div className='content p-3'>
              <h2 className='text-2xl font-semibold'>
                {country?.name?.common}
              </h2>
              <div className='flex justify-between gap-2 flex-wrap mb-2'>
                <h3>Capital: {country?.capital}</h3>
                <h1>Region: {country?.region}</h1>
              </div>
              <div className='flex justify-between gap-2 flex-wrap'>
                <h3>Area: {country?.area} sq</h3>
                <h1>Population: {country?.population}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <Country countries={countries.length} /> */}
    </div>
  );
};

export default Countries;
