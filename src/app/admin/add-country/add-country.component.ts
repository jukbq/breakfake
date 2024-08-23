import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../shared/services/country/country.service';
import { CountryResponse } from '../../shared/interfaces/country';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-country',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-country.component.html',
  styleUrl: './add-country.component.scss'
})
export class AddCountryComponent {
  coutryList: any[] = [];
  public countryForm!: FormGroup;
  public countryArr: any[] = [];
  public country_edit_status = false;
  private countryID!: number | string;
  public countryImage = '';
  public uploadPercent!: number;


  constructor(
    private formBuild: FormBuilder,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.getCountry();
    this.initcountryForm();
    this.initializeCountryList();
  }

  initcountryForm(): void {
    this.countryForm = this.formBuild.group({
      name: [null, Validators.required],
      link: [null, Validators.required],
      flag: [null],
      circuit: [null],

    });
  }

  getCountry(): void {
    this.countryService.getAll().subscribe((data: any[]) => {
      this.countryArr = data;
      this.countryArr.sort((a, b) => a.name.localeCompare(b.name));
      this.filterCountryList();
    });
  }

  // Фільтруємо список країн
  filterCountryList(): void {
    this.coutryList = this.coutryList.filter(
      (country) =>
        !this.countryArr.some((arrCountry) => arrCountry.link === country.link)
    );
    this.coutryList.sort((a, b) => a.name.localeCompare(b.name));
  }

  initializeCountryList(): void {
    // Ваш початковий список країн
    this.coutryList = [
      {
        name: 'Finland',
        link: 'finland',
        flag: '../../assets/image/flags/finland.png',
        circuit: '../../assets/image/circuit/finland.png',

      },
      {
        name: 'Sweden',
        link: 'sweden',
        flag: '../../assets/image/flags/sweden.png',
        circuit: '../../assets/image/circuit/sweden.png',
      },
      {
        name: 'Norway',
        link: 'norway',
        flag: '../../assets/image/flags/norway.png',
        circuit: '../../assets/image/circuit/norway.png',
      },
      {
        name: 'Iceland',
        link: 'iceland',
        flag: '../../assets/image/flags/iceland.png',
        circuit: '../../assets/image/circuit/iceland.png',
      },
      {
        name: 'United Kingdom',
        link: 'unitedKingdom',
        flag: '../../assets/image/flags/unitedKingdom.png',
        circuit: '../../assets/image/circuit/unitedKingdom.png',
      },
      {
        name: 'Ukraine',
        link: 'ukraine',
        flag: '../../assets/image/flags/ukraine.png',
        circuit: '../../assets/image/circuit/ukraine.png',
      },
      {
        name: 'Ireland',
        link: 'ireland',
        flag: '../../assets/image/flags/Ireland.png',
        circuit: '../../assets/image/circuit/Ireland.png',
      },
      {
        name: 'Portugal',
        link: 'portugal',
        flag: '../../assets/image/flags/portugal.png',
        circuit: '../../assets/image/circuit/portugal.png',
      },
      {
        name: 'Spain',
        link: 'spain',
        flag: '../../assets/image/flags/spain.png',
        circuit: '../../assets/image/circuit/spain.png',
      },
      {
        name: 'France',
        link: 'france',
        flag: '../../assets/image/flags/france.png',
        circuit: '../../assets/image/circuit/france.png',
      },
      {
        name: 'Belgium',
        link: 'belgium',
        flag: '../../assets/image/flags/belgium.png',
        circuit: '../../assets/image/circuit/belgium.png',
      },
      {
        name: 'Netherlands',
        link: 'netherlands',
        flag: '../../assets/image/flags/netherlands.png',
        circuit: '../../assets/image/circuit/netherlands.png',
      },
      {
        name: 'Denmark',
        link: 'denmark',
        flag: '../../assets/image/flags/denmark.png',
        circuit: '../../assets/image/circuit/denmark.png',
      },
      {
        name: 'Germany',
        link: 'germany',
        flag: '../../assets/image/flags/germany.png',
        circuit: '../../assets/image/circuit/germany.png',
      },
      {
        name: 'Luxembourg',
        link: 'luxembourg',
        flag: '../../assets/image/flags/luxembourg.png',
        circuit: '../../assets/image/circuit/luxembourg.png',
      },
      {
        name: 'Switzerland',
        link: 'switzerland',
        flag: '../../assets/image/flags/switzerland.png',
        circuit: '../../assets/image/circuit/switzerland.png',
      },
      {
        name: 'Austria',
        link: 'austria',
        flag: '../../assets/image/flags/austria.png',
        circuit: '../../assets/image/circuit/austria.png',
      },
      {
        name: 'Italy',
        link: 'italy',
        flag: '../../assets/image/italy/france.png',
        circuit: '../../assets/image/circuit/italy.png',
      },
      {
        name: 'Czech Republic',
        link: 'czechRepublic',
        flag: '../../assets/image/flags/czechRepublic.png',
        circuit: '../../assets/image/circuit/czechRepublic.png',
      },
      {
        name: 'Slovakia',
        link: 'slovakia',
        flag: '../../assets/image/flags/slovakia.png',
        circuit: '../../assets/image/circuit/slovakia.png',
      },
      {
        name: 'Hungary',
        link: 'hungary',
        flag: '../../assets/image/flags/hungary.png',
        circuit: '../../assets/image/circuit/hungary.png',
      },
      {
        name: 'Poland',
        link: 'poland',
        flag: '../../assets/image/flags/poland.png',
        circuit: '../../assets/image/circuit/poland.png',
      },
      {
        name: 'Lithuania',
        link: 'lithuania',
        flag: '../../assets/image/flags/lithuania.png',
        circuit: '../../assets/image/circuit/lithuania.png',
      },
      {
        name: 'Latvia',
        link: 'latvia',
        flag: '../../assets/image/italy/latvia.png',
        circuit: '../../assets/image/circuit/latvia.png',
      },
      {
        name: 'Estonia',
        link: 'estonia',
        flag: '../../assets/image/flags/estonia.png',
        circuit: '../../assets/image/circuit/estonia.png',
      },
      {
        name: 'Romania',
        link: 'romania',
        flag: '../../assets/image/flags/romania.png',
        circuit: '../../assets/image/circuit/romania.png',
      },
      {
        name: 'Moldova',
        link: 'moldova',
        flag: '../../assets/image/flags/moldova.png',
        circuit: '../../assets/image/circuit/moldova.png',
      },
      {
        name: 'Slovenia',
        link: 'slovenia',
        flag: '../../assets/image/flags/slovenia.png',
        circuit: '../../assets/image/circuit/slovenia.png',
      },
      {
        name: 'Croatia',
        link: 'croatia',
        flag: '../../assets/image/flags/croatia.png',
        circuit: '../../assets/image/circuit/croatia.png',
      },
      {
        name: 'Bosnia and Herzegovina',
        link: 'bosniaHerzegovina',
        flag: '../../assets/image/flags/bosniaHerzegovina.png',
        circuit: '../../assets/image/circuit/bosniaHerzegovina.png',
      },
      {
        name: 'Montenegro',
        link: 'montenegro',
        flag: '../../assets/image/flags/montenegro.png',
        circuit: '../../assets/image/circuit/montenegro.png',
      },
      {
        name: 'Serbia',
        link: 'serbia',
        flag: '../../assets/image/flags/serbia.png',
        circuit: '../../assets/image/circuit/serbia.png',
      },
      {
        name: 'Kosovo',
        link: 'kosovo',
        flag: '../../assets/image/flags/kosovo.png',
        circuit: '../../assets/image/circuit/kosovo.png',
      },
      {
        name: 'North Macedonia',
        link: 'northMacedonia',
        flag: '../../assets/image/flags/northMacedonia.png',
        circuit: '../../assets/image/circuit/northMacedonia.png',
      },
      {
        name: 'Bulgaria',
        link: 'bulgaria',
        flag: '../../assets/image/flags/bulgaria.png',
        circuit: '../../assets/image/circuit/bulgaria.png',
      },
      {
        name: 'Albania',
        link: 'albania',
        flag: '../../assets/image/flags/albania.png',
        circuit: '../../assets/image/circuit/albania.png',
      },
      {
        name: 'Greece',
        link: 'greece',
        flag: '../../assets/image/flags/greece.png',
        circuit: '../../assets/image/circuit/greece.png',
      },
      {
        name: 'Malta',
        link: 'malta',
        flag: '../../assets/image/flags/malta.png',
        circuit: '../../assets/image/circuit/malta.png',
      },
      {
        name: 'Cyprus',
        link: 'cyprus',
        flag: '../../assets/image/flags/cyprus.png',
        circuit: '../../assets/image/circuit/cyprus.png',
      },
      {
        name: 'Turkey',
        link: 'turkey',
        flag: '../../assets/image/flags/turkey.png',
        circuit: '../../assets/image/circuit/turkey.png',
      },
      {
        name: 'Andorra',
        link: 'andorra',
        flag: '../../assets/image/flags/andorra.png',
        circuit: '../../assets/image/circuit/andorra.png',
      },
      {
        name: 'Georgia',
        link: 'georgia',
        flag: '../../assets/image/flags/georgia.png',
        circuit: '../../assets/image/circuit/georgia.png',
      },
      {
        name: 'Armenia',
        link: 'armenia',
        flag: '../../assets/image/flags/armenia.png',
        circuit: '../../assets/image/circuit/armenia.png',
      },
      {
        name: 'Azerbaijan',
        link: 'azerbaijan',
        flag: '../../assets/image/flags/azerbaijan.png',
        circuit: '../../assets/image/circuit/azerbaijan.png',
      },
      {
        name: 'Liechtenstein',
        link: 'liechtenstein',
        flag: '../../assets/image/flags/liechtenstein.png',
        circuit: '../../assets/image/circuit/liechtenstein.png',
      },
      {
        name: 'San Marino',
        link: 'sanMarino',
        flag: '../../assets/image/flags/sanMarino.png',
        circuit: '../../assets/image/circuit/sanMarino.png',
      },
      {
        name: 'Monaco',
        link: 'monaco',
        flag: '../../assets/image/flags/monaco.png',
        circuit: '../../assets/image/circuit/monaco.png',
      },
    ];
    // Завантажте список країн, які вже є в базі даних
    this.getCountry();
  }

  onCountrySelect(event: any): void {
    const selectedLink = event.target.value;


    const selectedCountry = this.coutryList.find(
      (country) => country.link === selectedLink
    );

    if (selectedCountry) {
      this.countryForm.patchValue({
        name: selectedCountry.name,
        link: selectedCountry.link,
        flag: selectedCountry.flag,
        circuit: selectedCountry.circuit,
      });
      this.creatCountry();
    }
  }

  creatCountry() {

    this.countryService.addCountry(this.countryForm.value).then(() => {
      this.ngOnInit();
    });

  }

  delCountry(country: any) {
    this.countryService
      .delCountry(country.id.toString())
      .then(() => {
        this.ngOnInit();
      })
      .catch((error) => {
        console.error('Помилка при видаленні запису:', error);
      });
  }
}
