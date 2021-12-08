import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExDialogComponent } from './home/dialogs/ex-dialog.component';

export interface DialogOptions {
    header?;
    message?;
    okButtonHeader?;
    cancelButtonHeader?;
    cancellCallback?;
    okCallback?;
    width?;
    closeOnNavigation?;
}

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(public dialog: MatDialog) { }

    show(data: DialogOptions): void {
        const options = {};

        options['data'] = data;
        options['closeOnNavigation'] = data.closeOnNavigation;
        options['maxWidth'] = '80vw';
        options['minWidth'] = '280px';

        // if (!data.header)
        //     data.header = 'Message';
        if (!data.okButtonHeader)
            data.okButtonHeader = 'Ok';
        if (data.okCallback || data.cancellCallback)
            if (!data.cancelButtonHeader)
                data.cancelButtonHeader = 'Cancel';

        if (data.width)
            options['width'] = data.width;

        const dialogRef = this.dialog.open(ExDialogComponent, options);

        dialogRef.afterClosed().subscribe(result => {
            if (data.cancellCallback && !result)
                data.cancellCallback()
            else if (data.okCallback && result)
                data.okCallback()
        });
    }

    confirm(message, okcallback, cancelcallback = null) {
        this.show({ header: 'Confirm', message: message, okCallback: okcallback, cancellCallback: cancelcallback });
    }

    alert(message) {
        this.show({ header: '', message: message, width: '500px' });
    }
}