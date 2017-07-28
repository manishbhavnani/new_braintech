import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { Contacts, Contact, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';
import { ContactEdit } from './contactedit';
import { ContactAdd } from './contactadd';

@Component({
    selector: 'contact',
    templateUrl: 'contact.html'
})
export class ContactSearch {
public allContacts: any
public contactsfound = [];
public search = false;
public searchQuery: any;
constructor(public navCtrl: NavController, public contacts: Contacts, contact: Contact, public modalCtrl: ModalController) {
        this.find(); }

public find() {
    this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], { filter: "", multiple: true })
            .then(data => {
                this.allContacts = data
         });
    }

public viewModel(contact) {
        console.log(contact);
        let contactViewModal = this.modalCtrl.create(ContactEdit, { contactid: contact });
        contactViewModal.present();
    }
public newContact() {
        this.navCtrl.push(ContactAdd);
    }

public removeContact(name) {
        console.log(name);
        this.contacts.find(['displayName'], { filter: name }).then((contact) => {
        console.log("DEBUG: Contact to be deleted = " + JSON.stringify(contact[0]))
        contact[0].remove();
        this.navCtrl.push(HomePage);
        });
    }

public findContact(ev: any): any {
        let fields: ContactFieldType[] = ['addresses', 'birthday', 'categories', 'country',
            'department', 'displayName', 'emails', 'familyName', 'formatted',
            'givenName', 'honorificPrefix', 'honorificSuffix', 'id', 'ims', 'locality',
            'middleName', 'name', 'nickname', 'note', 'organizations', 'phoneNumbers',
            'photos', 'postalCode', 'region', 'streetAddress', 'title', 'urls'];
        const options = new ContactFindOptions();
        options.filter = ev.target.value;
        options.multiple = true;
        options.hasPhoneNumber = true;
        this.contacts.find(fields, options).then((contacts) => {
            this.contactsfound = contacts;
            console.log(JSON.stringify(contacts[0]));
        });

        if (this.contactsfound.length == 0) {
            this.contactsfound.push({ displayName: 'No Contacts found' });
        }
        this.search = true;
    }
 public  gotohome(): any {
     this.navCtrl.setRoot(HomePage);
    }


}