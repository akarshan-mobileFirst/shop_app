import {createAction} from '@reduxjs/toolkit';

export const generateActionTypes = action => ({
  DONE: createAction(`${action}_DONE`),
  FAILED: createAction(`${action}_FAILED`),
  REQUEST: createAction(`${action}_REQUEST`),
  STATUS: createAction(`${action}_STATUS`),
});

// Status Action types
export const STATUS = {
  DONE: 'DONE',
  FAILED: 'FAILED',
  REQUEST: 'REQUEST',
};

// Update Status Action
export const updateStatus = createAction('STATUS/UPDATE');
