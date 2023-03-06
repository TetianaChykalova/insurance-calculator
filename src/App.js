import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import React, {useState} from "react";
import {addDays} from "date-fns";
import Form from "./components/Form";
import {Route, Routes, HashRouter, Navigate} from "react-router-dom";
import Order from "./components/Order";

function App() {

    const [type, setType] = useState('annual')
    const [packageType, setPackageType] = useState('extended')
    const [additional, setAdditional] = useState('no')
    const [people, setPeople] = useState(1)
    const [isCancellation, setIsCancellation] = useState(false)
    const [isSport, setIsSport] = useState(false)

    const onChangeType = (e) => {
        let eType = e.target.value
        setType(eType)
    }
    const onChangePackageType = (e) => {
        let eType = e.target.value
        setPackageType(eType)
    }
    const onChangeAdditional = (e) => {
        let eAdd = e.target.value
        setAdditional(eAdd)
        if(additional === 'no') {
            setIsCancellation(false)
            setIsSport(false)
        }
    }

    const peopleIncrement = (e) => {
        e.preventDefault()
        people < 3 &&
        setPeople(prev => prev + 1)
    }
    const peopleDecrement = (e) => {
        e.preventDefault()
        people > 1 &&
        setPeople(prev => prev - 1)
    }

    const onChangeCancellation = () => {
        setIsCancellation(prev => !prev)
    }
    const onChangeSport = () => {
        setIsSport(prev => !prev)
    }


    const [dateShort, setDateShort] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const onChangeShortPeriod = (date) => {
        setDateShort([date.selection])
    }

    const [dateAnnual, setDateAnnual] = useState(null);

    const onChangeAnnual = (date) => {
        setDateAnnual(date)
    }

    let differenceDateShort = dateShort[0].endDate.getTime() - dateShort[0].startDate.getTime()
    let totalDaysShot = 1 + Math.ceil(differenceDateShort / (1000 * 3600 * 24));

    let sum;
    let basePrice = 0;
    let cancel = 0;
    let sport = 0;
    let baseSum = 0;

    if (type === 'annual') {
        if (packageType === 'basic') {
            basePrice = 39
        }
        else if (packageType === 'extended') {
            basePrice = 49
        }
        else if (packageType === 'extra') {
            basePrice = 59
        }

        if(isCancellation) {
            cancel = basePrice / 100 * 20
        }
        if(isSport) {
            sport = basePrice / 100 * 10
        }

        baseSum = basePrice + cancel + sport
    }
    else if (type === 'short') {
        if (packageType === 'basic') {
            basePrice = 1.2
        }
        else if (packageType === 'extended') {
            basePrice = 1.8
        }
        else if (packageType === 'extra') {
            basePrice = 2.4
        }

        if(isCancellation) {
            cancel = basePrice / 100 * 50
        }
        if(isSport) {
            sport = basePrice / 100 * 30
        }

        baseSum = (basePrice + cancel + sport) * totalDaysShot

    }

    sum = (baseSum * people).toFixed(2)


    return (

        <HashRouter>

            <Routes>

                <Route
                    path='/form'
                    element={
                    <Form
                        onChangeType={onChangeType}
                        type={type}
                        onChangeAnnual={onChangeAnnual}
                        dateAnnual={dateAnnual}
                        onChangeShortPeriod={onChangeShortPeriod}
                        dateShort={dateShort}
                        onChangePackageType={onChangePackageType}
                        onChangeAdditional={onChangeAdditional}
                        additional={additional}
                        onChangeCancellation={onChangeCancellation}
                        onChangeSport={onChangeSport}
                        peopleDecrement={peopleDecrement}
                        people={people}
                        peopleIncrement={peopleIncrement}
                        sum={sum}
                        packageType={packageType}
                    />
                }
                />

                <Route
                    path='/order'
                    element={
                    <Order
                        type={type}
                        people={people}
                        packageType={packageType}
                        isCancellation={isCancellation}
                        isSport={isSport}
                        totalDaysShot={totalDaysShot}
                        sum={sum}
                    />
                }
                />

                <Route path="/" element={<Navigate to="/form" replace />} />
            </Routes>

        </HashRouter>

    );
}


export default App;
