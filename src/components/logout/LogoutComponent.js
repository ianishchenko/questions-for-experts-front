import { userService } from 'Services/userService';
import {history} from '../../store';
export default function () {
    userService.logout();
    history.push('login');
    return null;
}