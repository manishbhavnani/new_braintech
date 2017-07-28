import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { HomePage } from '../home/home';


@Component({
  selector: 'contactedit',
  templateUrl: 'contactedit.html'
})
export class ContactEdit {
public contactname: any;
public contact: any
public contactObject = [];
public name: any = "";
public nname: any = "";
public number: any = "";
public numbertype: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts, contact: Contact, public params: NavParams) {
      this.contactname = this.params.get('contactid');
      this.contacts.find(['id'], { filter: this.contactname, multiple: true })
      .then(data => {
      this.contact = data;
      this.name = this.contact[0]._objectInstance.displayName;
      this.nname = this.contact[0]._objectInstance.nickname;
      this.number = this.contact[0]._objectInstance.phoneNumbers[0].value;
      this.numbertype = this.contact[0]._objectInstance.phoneNumbers[0].type;
      });
  }

/**
 * Contact Remove 
 */
  public removeContact(): any {
    this.contacts.find(['id'], { filter: this.contactname }).then((contact) => {
      contact[0].remove();
      this.navCtrl.push(HomePage);
    });

  }

/**
 * Contact Edit
 * 
 */
 public update(): any {
    this.contacts.find(['id'], { filter: this.contactname }).then((contact) => {
      contact[0].remove();
    });

    var contactObject = {
      displayName: this.name,
      nickName: this.nname,
      phoneNumber: this.number,
      phoneType: this.numbertype
    };
    console.log(contactObject);
    var contact = this.contacts.create();
    contact.displayName = contactObject.displayName;
    contact.nickname = contactObject.nickName;

    var field = new ContactField();
    field.type = contactObject.phoneNumber;
    field.value = contactObject.phoneType;
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