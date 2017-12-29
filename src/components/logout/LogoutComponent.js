import React from 'react';
import { userService } from '../../services/userService';
import {history} from '../../store';
export default function () {
    userService.logout();
    history.push('login');
    return null;
}