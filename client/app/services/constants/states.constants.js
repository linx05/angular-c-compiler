let states = {
    other     : {
        commentary: {type: 'commentary'},
    },
    space: {
        type: 'space'
    },
    accepting : {},
    error     : {},
    transition: {}
};

_.map(_.range(-600, -499), (value)=> {
    states.error[value] = {
        type: 'error',
        value
    }
});

_.map(_.range(1, 50), (value)=> {
    states.transition[value] = {
        type: 'transition',
        value
    }
});

_.map(_.range(101, 200), (value)=> {
    states.accepting[value] = {type: 'accepting', value};
    states.accepting[value].otherChar = value < 150;
    //states.accepting[value].type = value > 150 ? 'oc' : 'sin_oc';
});

export default states;
