import { Component } from '@angular/core';
import { CountryService } from '../../shared/services/country/country.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, ViewportScroller } from '@angular/common';
import { CountryResponse } from '../../shared/interfaces/country';
import { EditorModule } from '@tinymce/tinymce-angular';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { FakeService } from '../../shared/services/fake/fake.service';
import { FakeRequest, FakeResponse } from '../../shared/interfaces/fake';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-fake',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditorModule],
  templateUrl: './add-fake.component.html',
  styleUrl: './add-fake.component.scss'
})
export class AddFakeComponent {
  public countryArr: Array<any> = [];
  public fakeArr: Array<FakeResponse> = [];
  public fakeForm!: FormGroup;
  public uploadPercent!: number;
  public imageOrganization = '';
  public fake_form = false;
  public fakeEditStatus = false;
  private fakeID!: number | string;

  constructor(
    private countryService: CountryService,
    private formBuild: FormBuilder,
    private storsgeIcon: Storage,
    private fakeService: FakeService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.getCountry();
    this.getFake();
    this.initcountryForm();

  }

  initcountryForm(): void {
    this.fakeForm = this.formBuild.group({
      country: [null, [Validators.required]],
      nameOrganization: [null, [Validators.required, Validators.minLength(3)]],
      descriptionOrganization: [null, [Validators.required, Validators.minLength(10)]],
      imageOrganization: [null],
      linkPetition: [null],
    });
  }

  //фільр фейків
  сountryFiter(event: any) {
    const countryFilter = event;
    this.fakeArr = [];
    this.fakeService
      .getFakeByCountryID(countryFilter)
      .subscribe((data: any) => {
        this.fakeArr = data;
      });
  }

  resetForm() {
    this.fakeForm.reset();
  }

  getCountry(): void {
    this.countryService.getAll().subscribe((data: any) => {
      this.countryArr = data;
      this.countryArr.sort((a, b) => a.name.localeCompare(b.name));
    });
  }


  // Отримання фейків  з сервера
  getFake(): void {
    this.fakeService.getAll().subscribe((data: any) => {
      this.fakeArr = data as FakeResponse[];
      this.fakeArr.sort((a, b) => a.nameOrganization.localeCompare(b.nameOrganization));

    });
  }

  onCountrySelect(event: any): void {
    const contryID = event.target.value;
    this.getCoutryFakes(contryID)


  }

  getCoutryFakes(contryID: any) {
    if (contryID == 'all') {
      this.getFake()
    } else {
      this.fakeService.getFakeByCountryID(contryID).subscribe((data: any) => {
        this.fakeArr = data;
        this.fakeArr.sort((a, b) => a.nameOrganization.localeCompare(b.nameOrganization));
      })
    }
  }

  // Редагування фека
  editFake(fake: FakeResponse) {
    this.fakeForm.patchValue({
      country: fake.country,
      nameOrganization: fake.nameOrganization,
      descriptionOrganization: fake.descriptionOrganization,
      imageOrganization: fake.imageOrganization,
      linkPetition: fake.linkPetition,
    });

    this.imageOrganization = fake.imageOrganization,
      this.fakeEditStatus = true;
    this.uploadPercent = 100;
    this.fake_form = true;
    this.fakeID = fake.id;
  }

  delFake(index: any) {
    if (index.imageOrganization) {
      const task = ref(this.storsgeIcon, index.imageOrganization);
      deleteObject(task).then(() => {
        console.log('Файл успішно видалено');
      }).catch((error) => {
        console.error('Помилка під час видалення файлу:', error);
      });
    } else {
      console.log('Немає зображення для видалення');
    }

    this.fakeService.delFake(index.id as string).then(() => {
      this.ngOnInit();
    });
  }

  // Додавання або редагування фейку
  creatFake() {
    if (this.fakeEditStatus) {
      this.fakeService
        .editFake(this.fakeForm.value, this.fakeID as string)
        .then(() => {
          this.fakeEditStatus = false;
          this.fake_form = false;
          this.fakeForm.reset();
          this.uploadPercent = 0;
          this.imageOrganization = '';

        });
    } else {
      let currentFakeNumber = this.fakeForm.get('fake')?.value?.numberfake;
      if (typeof currentFakeNumber === 'number' && !isNaN(currentFakeNumber)) {
        // Збільшуємо значення на 1 при додаванні нової категорії
        currentFakeNumber += 1;

        // Оновлюємо значення numberСategories у формі перед відправкою
        this.fakeForm.patchValue({
          numberСategories: currentFakeNumber,
        });
      }

      this.fakeService.addFake(this.fakeForm.value).then(() => {
        this.fakeEditStatus = false;
        this.fake_form = false;
        this.fakeForm.reset();
        this.uploadPercent = 0;
        this.imageOrganization = '';

      });
    }

    this.viewportScroller.scrollToPosition([0, 0]);
  }

  // Завантаження зображення
  async uploadUserImage(actionImage: any): Promise<void> {
    const file = actionImage.target.files[0];
    const previousImageURL = this.imageOrganization;
    const task = ref(this.storsgeIcon, previousImageURL);
    if (previousImageURL.startsWith('https://firebasestorage.googleapis.com')) {
      deleteObject(task).then(() => {
        this.uploadPercent = 0;
        this.fakeForm.patchValue({
          imageOrganization: null,
        });
      });
    }

    this.loadFIle('fake-image', file.name, file)
      .then((data) => {
        if (this.uploadPercent == 100) {
          this.fakeForm.patchValue({
            imageOrganization: data,
          });

          this.imageOrganization = data;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Завантаження файлу в хмарне сховище
  async loadFIle(
    folder: string,
    name: string,
    file: File | null
  ): Promise<string> {
    const pathIcon = `${folder}/${name}`;
    let urlIcon = '';
    if (file) {
      try {
        const storageRef = ref(this.storsgeIcon, pathIcon);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe((data: { progress: number }) => {
          this.uploadPercent = data.progress;
        });
        await task;
        urlIcon = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('Wrong file');
    }
    return Promise.resolve(urlIcon);
  }
}
