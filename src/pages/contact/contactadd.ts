import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { HomePage } from '../home/home';

@Component({
  selector: 'contactadd',
  templateUrl: 'contactadd.html'
})
export class ContactAdd {
  contactObject = {
    displayName: '',
    nickName: '',
    phoneNumber: '',
    phoneType: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts, contact: Contact) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }
  /**
   * 
   * @param newContact New Contact Add Object
   */
  public addContact(newContact: any): any {
    var contact = this.contacts.create();
    contact.displayName = newContact.displayName;
    contact.nickname = newContact.nickName;

    var field = new ContactField();
    field.type = newContact.phoneType;
    field.value = newContact.phoneNumber;
    field.pref = true;

    var numberSection = [];
    numberSection.push(field);
    contact.phoneNumbers = numberSection;

    contact.save().then((value) => {
      console.log('saved', value);
      this.navCtrl.push(HomePage);
    }, (error) => {
      console.log(error);
    })
  }
}