import React, {useEffect} from 'react';
import clas from './PopUp.module.css'
import {useDispatch, useSelector} from "react-redux";
import {Formik, Form, Field, ErrorMessage,} from 'formik';
import {login, togglePopUp} from "../../redux/cards_Reducer";

const PopUp = () => {
    const popUpDisplay = useSelector(state => state.cardsPage.popUpDisplay)
    const dispatch = useDispatch()
    const validate = values => {
        const errors = {};
        if (!values.login) {
            errors.login = 'This field in required';
        }
        if (!values.password) {
            errors.password = 'This field in required';
        }
        return errors;
    }
    const EnterHandler = (values) => {
        dispatch(login({login:values.login,password:values.password}))
    }

    useEffect(()=>{
        if(localStorage.getItem('authToken').length >0) {
            dispatch(togglePopUp())
        }
    },[dispatch ])

    return (
        <div className={clas.folder} style={{display:!popUpDisplay ?'flex':'none'}}>

                <Formik
                initialValues={{login: '', password: ''}}
                validate={validate}
                onSubmit={(values, {setSubmitting}) => {
                EnterHandler(values)}}
                >
            {({isSubmitting}) => (
                <Form  className={clas.form}>
                <Field id="login" placeholder='login' className={clas.login} type="text" name="login"/><br/>
                <ErrorMessage name="login" className={clas.error} component="div"/>

                <Field id="password" placeholder='password' className={clas.password} type="text" name="password"/><br/>
                <ErrorMessage name="password"  className={clas.error} component="div"/>
                    <button type="submit" className ={clas.btn_send}  disabled={isSubmitting}>send</button><br/>

                </Form>
                )}
                </Formik>

        </div>
    );
};

export default PopUp;
