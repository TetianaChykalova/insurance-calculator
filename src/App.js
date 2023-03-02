import './App.module.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {useState} from "react";
import {DateRange} from 'react-date-range';
import {Calendar} from 'react-date-range';
import {addDays} from "date-fns";

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

    sum = baseSum * people


    return (
        <div>
            <h1>
                Insurance calculator
            </h1>
            <form action="#">

                {/*type*/}
                <div>
                    <p>Insurance type</p>
                    <div onChange={onChangeType}>
                        <div>
                            <input type="radio" name='insurance-type' value='annual' defaultChecked={true}/> Annual
                            insurance
                        </div>
                        <div>
                            <input type="radio" name='insurance-type' value='short'/> Short term insurance
                        </div>
                    </div>

                </div>

                {/*period*/}
                <div>
                    <p>Period</p>
                    {
                        type === 'annual' ?
                            <div>
                                <Calendar
                                    onChange={onChangeAnnual}
                                    date={dateAnnual}
                                />
                            </div> :
                            <div>
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={onChangeShortPeriod}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dateShort}
                                />
                            </div>
                    }
                </div>

                {/*package*/}
                <div>
                    <p>Package type</p>
                    <div onChange={onChangePackageType}>
                        <div>
                            <input type="radio" name='package-type' value='basic'/> basic
                        </div>
                        <div>
                            <input type="radio" name='package-type' value='extended' defaultChecked={true}/> extended
                        </div>
                        <div>
                            <input type="radio" name='package-type' value='extra'/> extra
                        </div>
                    </div>
                </div>

                {/*additional*/}
                <div>
                    <p>Any additional charges?</p>
                    <div onChange={onChangeAdditional}>
                        <div>
                            <input type="radio" name='additional' value='no' defaultChecked={true}/> No
                        </div>
                        <div>
                            <input type="radio" name='additional' value='yes'/> Yes
                        </div>
                    </div>
                    {
                        additional === 'yes' ?
                            <div>
                                <div onChange={onChangeCancellation}>
                                    <input type="checkbox" name='cancellation' value='cancellation'/> Cancellation
                                </div>
                                <div onChange={onChangeSport}>
                                    <input type="checkbox" name='sport' value='sport'/> Sport activities
                                </div>
                            </div> : ''
                    }
                </div>

                {/*people*/}
                <div>
                    <p>Number od people</p>
                    <div>
                        <button onClick={peopleDecrement}>-</button>
                        <span>{people}</span>
                        <button onClick={peopleIncrement}>+</button>
                    </div>
                </div>

                <div>
                    <p>Your cost of insurance: €{sum.toFixed(2)}</p>
                </div>

                <div>
                    <button>order</button>
                </div>

            </form>

        </div>
    );
}

export default App;
