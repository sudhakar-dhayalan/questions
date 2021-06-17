import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    tokenExpirationTimer: any;

    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null);

    UserList = [
        {
            email: "valid@gmail.com",
            password: "123qwe"
        },
        {
            email: "test@gmail.com",
            password: "qqqQQQ"
        }
    ];

    constructor(private router: Router) { }

    login(mail: string, passwd: string) {
        let isValidUser = false;
        isValidUser = this.UserList.some(user => (user.email === mail && user.password === passwd));
        if (isValidUser) {
            this.handleAuthentication(mail, "userId", "validToken", 500);  // 5 minutes
            return "valid";
        }
        else
            return this.handleError();
    }

    autoLogin() {
        const userData: {
            email: string,
            password: string,
            _token: string,
            _tokenExpirationDate: string
        }
            = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return null;
        }

        const loadUser = new User(userData.email, userData.password, userData._token, new Date(userData._tokenExpirationDate));

        if (userData._token) {
            this.user.next(loadUser);
            const expiresIn = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expiresIn);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/questions']);
        localStorage.removeItem('userData');
        console.log('timer ' + this.tokenExpirationTimer);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.router.navigateByUrl('auth')
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(
            () => {
                this.logout();
            }, expirationDuration)
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError() {
        return "Username or password is wrong";
    }
}
