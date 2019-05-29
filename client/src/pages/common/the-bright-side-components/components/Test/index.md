import * as React from 'react';
import Wizard from '../Wizard';

function Next() {
    return <button type="submit">Next</button>;
}

function Submit() {
    return <button type="submit">Submit</button>;
}

const steps = [
    {
        id: '1',
        component: null,
        initialValues: {
            firstName: ''
        },
        keepValues: true,
        actionLabel: ''
    },
    {
        id: '2',
        component: null,
        initialValues: {
            lastName: ''
        },
        keepValues: true,
        actionLabel: ''
    },
    {
        id: '3',
        component: null,
        initialValues: {}
    }
];

const renderFirst = props => {
    return (
        <div>
            <div>First Name</div>
            <input
                type="text"
                name="firstName"
                value={props.formikProps.values.firstName}
                onChange={props.formikProps.handleChange}
            />
            <div>
                {props.actions.canGoBack && <button onClick={() => props.actions.goToPreviousStep()}>Previous</button>}
            </div>
        </div>
    );
};

const renderSecond = props => {
    return (
        <div>
            {props.values[1].firstName === 'asd' ? <div>STEP 1</div> : <div>STEP 2 </div>}
            <div>Last Name</div>
            <input
                type="text"
                name="lastName"
                value={props.formikProps.values.lastName}
                onChange={props.formikProps.handleChange}
            />
            <div>
                {props.actions.canGoBack && <button onClick={() => props.actions.goToPreviousStep()}>Previous</button>}
            </div>
        </div>
    );
};

const renderThird = props => {
    return (
        <div>
            <div>First Name: {props.values['1'].firstName}</div>
            <div>Last Name: {props.values['2'].lastName}</div>
            <div>
                {props.actions.canGoBack && <button onClick={() => props.actions.goToPreviousStep()}>Previous</button>}
            </div>
        </div>
    );
};

const render = props => {
    if (props.actions.currentStep === '1') {
        return renderFirst(props);
    }

    if (props.actions.currentStep === '2') {
        return renderSecond(props);
    }

    if (props.actions.currentStep === '3') {
        return renderThird(props);
    }

    return renderFirst(props);
};

const Test: React.SFC<any> = () => {
    return <Wizard onSubmit={value => console.log(value)} Form="form" render={props => render(props)} steps={steps} />;
};

export default Test;
