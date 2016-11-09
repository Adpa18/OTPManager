import { Component, ViewChild, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ITableSelectionChange } from '../ng2-material';

import { OTPAccount, Secret } from "../shared/otp-account";

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    host: {
        "(window: blur)": "onLeaveWindow($event)",
    }
})
export class AppComponent implements OnInit  {
    otps: Array<OTPAccount> = [];
    isLogin: boolean = false;
    isLocked: boolean = true;

    @ViewChild('pinDialog') pinDialog;

    constructor(private http: Http) {
        this.loadAccountsToLocalStorage();
        // this.addAccount(new OTPAccount("tot@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", "TOTP", 30, 8, "SHA-512"));
        // this.addAccount(new OTPAccount("yuugtyg@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", "HOTP", 0, 6, "SHA-1"));
        // this.addAccount(new OTPAccount("bastien.dhiver@gmail.com", "3jbuac6shuopync3s2o5lofsppqjxgv5", "TOTP", 30, 6, "SHA-1"));
    }

    ngOnInit() {
        if (this.isLocked) {
            this.pinDialog.show();
        }
    }

    private changeLock(value: boolean): void {
        this.isLocked = value;
        if (value) {
            this.pinDialog.show();
        } else {
            this.pinDialog.close();
        }
    }

    unlock(value: boolean): void {
        this.changeLock(!value);
    }

    onLeaveWindow(event: any): void {
        this.changeLock(true);
    }

    addAccount(account: OTPAccount): void {
        this.otps.push(account);
        if (this.isLogin) {
            this.addAccountToServer(account.getData());
        }
        this.saveAccountsToLocalStorage();
    }

    removeAccount(key: number): void {
        delete this.otps[key];
        this.otps.splice(key, 1);
    }

    getAccoutsFromServer() {
        this.http.get('/secret/list').map((res: Response) => res.json())
        .subscribe(
            data => {
                let secrets : Secret[] = data;
                for (let secret of secrets) {
                    this.otps.push(new OTPAccount(secret.account, secret.secret, secret.otpType, secret.movingFactor, secret.length, secret.hashType));
                }
            },
            err => console.error(err)
        );
    }

    addAccountToServer(secret: Secret) {
        let body = JSON.stringify(secret);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('/secret/add', body, options)
        .map((res:Response) => res.json())
        .subscribe(
            data => {
                console.log(data);
            },
            err => console.error(err)
        );
    }

    saveAccountsToLocalStorage(): void {
        let accounts: Secret[] = [];
        for (let account of this.otps) {
            accounts.push(account.getData());
        }
        console.log(accounts);
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    loadAccountsToLocalStorage(): void {
        let data: string = localStorage.getItem('accounts');
        if (!data || data == "") {
            return;
        }
        let accounts: Secret[] = JSON.parse(data);
        for (let account of accounts) {
            this.otps.push(new OTPAccount(account.account, account.secret, account.otpType, account.movingFactor, account.length, account.hashType));
        }
    }

    onLogin(): void {
        this.isLogin = true;
        this.getAccoutsFromServer();
        for (let otp of this.otps) {
            this.addAccountToServer(otp.getData());
        }
    }
}
