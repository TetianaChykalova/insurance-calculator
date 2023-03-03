import React from 'react';
import s from "../App.module.css";
import {Calendar, DateRange} from "react-date-range";
import {NavLink} from "react-router-dom";

function Form(props) {
    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <h1>
                    Insurance calculator
                </h1>
            </div>
            <form action="#" className={s.form}>

                {/*type*/}
                <div>
                    <p>Insurance type</p>
                    <div onChange={props.onChangeType}>
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
                <div className={s.period}>
                    {
                        props.type === 'annual' ?
                            <div>
                                <Calendar
                                    onChange={props.onChangeAnnual}
                                    date={props.dateAnnual}
                                />
                            </div> :
                            <div>
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={props.onChangeShortPeriod}
                                    moveRangeOnFirstSelection={false}
                                    ranges={props.dateShort}
                                />
                            </div>
                    }
                </div>

                <div className={s.row}>
                    {/*package*/}
                    <div>
                        <p>Package type</p>
                        <div onChange={props.onChangePackageType}>
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
                        <div onChange={props.onChangeAdditional}>
                            <div>
                                <input type="radio" name='additional' value='no' defaultChecked={true}/> No
                            </div>
                            <div>
                                <input type="radio" name='additional' value='yes'/> Yes
                            </div>
                        </div>
                        {
                            props.additional === 'yes' ?
                                <div>
                                    <div onChange={props.onChangeCancellation}>
                                        <input type="checkbox" name='cancellation' value='cancellation'/> Cancellation
                                    </div>
                                    <div onChange={props.onChangeSport}>
                                        <input type="checkbox" name='sport' value='sport'/> Sport activities
                                    </div>
                                </div> : ''
                        }
                    </div>
                </div>

                {/*people*/}
                <div className={s.people}>
                    <p>Number od people</p>
                    <div>
                        <button onClick={props.peopleDecrement}>-</button>
                        <span>{props.people}</span>
                        <button onClick={props.peopleIncrement}>+</button>
                    </div>
                </div>

                <div className={s.result}>
                    <p>Your cost of insurance: €{props.sum}</p>
                </div>

                <div className={s.order}>
                    <NavLink to='/order' className={s.button}>
                        order
                    </NavLink>
                </div>

            </form>

        </div>
    );
}

export default Form;