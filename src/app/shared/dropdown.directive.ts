import { Directive, HostListener, ElementRef, HostBinding } from '@angular/core';


@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggoleOpen() {
        this.isOpen = !this.isOpen;
    }
}