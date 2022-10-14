import {createReducer} from '@reduxjs/toolkit';
import {updateSurname} from '../actions/actions';

const initialState = {
  name: 'kajal',
  surname: 'bansal',
};

export default createReducer(initialState, builder => {
  builder.addCase('UPDATE_NAME', (state, action) => {
    state.name = action.payload;
  });
  builder.addCase(updateSurname, (state, action) => {
    state.surname = action.payload;
  });
});
