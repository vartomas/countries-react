import React, { useState, useEffect } from 'react'
import { MagnifyingGlass, CaretDown, ArrowLeft } from "phosphor-react";

function Main(props) {

    const [filterDropDown, setFilterDropDown] = useState(false)
    const [filterBy, setFilterBy] = useState('')
    const [allCountries, setAllCountries] = useState(null)
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [borders, setBorders] = useState(null)

    async function getAllCountries() {
        try {
            const response = await fetch('https://restcountries.eu/rest/v2/all')
            if (response.status !== 200) throw new Error('error getting data from server')
            const data = await response.json()
            setCountries(data)
            setAllCountries(data)
        } catch (e) {
            console.log(e)
        }
    }

    async function handleSearch(input) {
        let response
        try {
            if (input) {
                response = await fetch('https://restcountries.eu/rest/v2/name/' + input)
            } else {
                response = await fetch('https://restcountries.eu/rest/v2/all')
            }
            if (response.status !== 200) throw new Error('No countries found')
            const data = await response.json()
            setCountries(data)
        } catch (e) {
            console.log(e)
        }
    }

    function backbtn() {
        setSelectedCountry(null)
        getAllCountries()
    }

    function selectCountry(country) {
        setSelectedCountry(country)
        getBorders(country.borders)
    }

    function getBorders(borderArr) {
        const filtered = allCountries.filter(e => borderArr.includes(e.cioc))
        setBorders(filtered)
    }

    useEffect(() => getAllCountries(), [])

    return (
        <div className={props.dark ? 'main darkBackground' : 'main'}>
            <div className='main__controls'>
                {!selectedCountry ? <div className={props.dark ? 'search__container dark' : 'search__container'}>
                    <label htmlFor='searchInput' className='magnifying-glass__container'><MagnifyingGlass size={24} className='magnifying-glass'/></label>
                    <input className={props.dark ? 'searchInput dark' : 'searchInput'} type='text' id='searchInput' placeholder='Search for a country...' onChange={e => handleSearch(e.target.value)}/>
                </div> : null}
                {!selectedCountry ? <div className={props.dark ? 'dropDown__container dark' : 'dropDown__container'} onClick={() => setFilterDropDown(!filterDropDown)}>
                    <p>{filterBy ? filterBy : 'Filter by Region'}</p>
                    <CaretDown size={16} />
                    <ul className={filterDropDown ? props.dark ? 'filterDropDown open dark' : 'filterDropDown open' : 'filterDropDown'}>
                        <li onClick={() => setFilterBy('Africa')}>Africa</li>
                        <li onClick={() => setFilterBy('Americas')}>America</li>
                        <li onClick={() => setFilterBy('Asia')}>Asia</li>
                        <li onClick={() => setFilterBy('Europe')}>Europe</li>
                        <li onClick={() => setFilterBy('Oceania')}>Oceania</li>
                        <li onClick={() => setFilterBy('')}>Any region</li>
                    </ul>
                </div> : null}
            </div>
            <div className='countryList'>
                {!selectedCountry ? countries.map(e => {
                    if (filterBy && e.region === filterBy) {
                        return (
                            <div className={props.dark ? 'countryCard darkCard' : 'countryCard'} key={e.numericCode} onClick={() => selectCountry(e)}>
                                <img src={e.flag} alt='flag' className='countryCard__img'/>
                                <div className='countryCard__description'>
                                    <h4>{e.name}</h4>
                                    <p>Population: {e.population}</p>
                                    <p>Region: {e.region}</p>
                                    <p>Capital: {e.capital}</p>
                                </div>
                            </div>
                        )
                    }
                    if (!filterBy) {
                        return (
                            <div className={props.dark ? 'countryCard darkCard' : 'countryCard'} key={e.numericCode} onClick={() => selectCountry(e)}>
                                <img src={e.flag} alt='flag' className='countryCard__img'/>
                                <div className='countryCard__description'>
                                    <h4>{e.name}</h4>
                                    <p>Population: {e.population}</p>
                                    <p>Region: {e.region}</p>
                                    <p>Capital: {e.capital}</p>
                                </div>
                            </div>
                        )
                    }
                }) : null}
            </div>
            {selectedCountry ? 
            <div className='selected-container'>
                <button className={props.dark ? 'selected-container__back-btn darkBtn' : 'selected-container__back-btn'} onClick={backbtn}><ArrowLeft size={24} /> Back</button>
                <div className='detail-container'>
                    <img src={selectedCountry.flag} alt='flag'/>
                    <div className='right-section'>
                        <h2>{selectedCountry.name}</h2>
                        <div className='details'>
                            <ul className='details-list details-list__primary'>
                                <li><b>Native name:</b> {selectedCountry.nativeName}</li>
                                <li><b>Population:</b> {selectedCountry.population}</li>
                                <li><b>Region:</b> {selectedCountry.region}</li>
                                <li><b>Sub region:</b> {selectedCountry.subregion}</li>
                                <li><b>Capital:</b> {selectedCountry.capital}</li>
                            </ul>
                            <ul className='details-list details-list__secondary'>
                                <li><b>Top level domain:</b> {selectedCountry.topLevelDomain}</li>
                                <li><b>Currencies:</b> {selectedCountry.currencies.reduce((a, c) => a += c.name + ', ', '').slice(0, -2)}</li>
                                <li><b>Languages:</b> {selectedCountry.languages.reduce((a, c) => a += c.name + ', ', '').slice(0, -2)}</li>
                            </ul>
                        </div>
                        <div className='border-countries-container'>
                            <h3>Border countries:</h3>
                            <ul>
                                {borders ? borders.map(e => <li className={props.dark ? 'border-card dark' : 'border-card'} key={e.numericCode} onClick={() => selectCountry(e)}>{e.name}</li>) : null}
                            </ul>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default Main