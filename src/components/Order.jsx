import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Order.module.css'

function Order(props) {
    return (
        <div className={s.wrapper}>
            <h2>
                Thank you for your choose!
            </h2>
            <p>
                Your order is the next:
            </p>
            {
                props.type === 'annual' ?
                    <p>
                        Annual insurance. Your package - {props.packageType}
                    </p> :
                    <p>
                        Short term insurance for {props.totalDaysShot} days. Your package - {props.packageType}
                    </p>
            }
            {
                props.isCancellation || props.isSport ?
                    <>
                        <p>
                            You have additional charges for the next categories:
                        </p>

                        <p>{props.isSport && 'sport'}</p>
                        <p>{props.isCancellation && 'cancellation'}</p>
                    </> :
                    <p>
                        Without additional charges
                    </p>
            }
            <p>
                Full price - {props.sum}
            </p>

            <div>
                    <NavLink className={s.button} to='/form'>
                        Back to form
                    </NavLink>
            </div>
        </div>
    );
}

export default Order;