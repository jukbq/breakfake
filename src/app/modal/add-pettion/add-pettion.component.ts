import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from '../../shared/services/country/country.service';

@Component({
  selector: 'app-add-pettion',
  standalone: true,
  imports: [],
  templateUrl: './add-pettion.component.html',
  styleUrl: './add-pettion.component.scss'
})
export class AddPettionComponent {
  @Input() countryID!: string;
  linkPetition: string = '';



  constructor(
    private countryService: CountryService,
    public activeModal: NgbActiveModal) { }


  addPetition(link: string) {
    this.linkPetition = link
    this.countryService.addPettionByID(this.countryID, link)
    this.activeModal.close(this.linkPetition);
    this.activeModal.close('Petition added');
  }



}
