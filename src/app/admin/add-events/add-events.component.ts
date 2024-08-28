import { Component } from '@angular/core';
import { EventResponse } from '../../shared/interfaces/events';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, ViewportScroller } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CountryService } from '../../shared/services/country/country.service';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { EventsService } from '../../shared/services/events/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-events',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditorModule],
  templateUrl: './add-events.component.html',
  styleUrl: './add-events.component.scss'
})
export class AddEventsComponent {
  public countryArr: Array<any> = [];
  public eventArr: Array<EventResponse> = [];
  public eventForm!: FormGroup;
  public uploadPercent!: number;
  public imagen = '';
  public event_form = false;
  public eventEditStatus = false;
  private eventID!: number | string;

  constructor(
    private countryService: CountryService,
    private formBuild: FormBuilder,
    private storsgeIcon: Storage,
    private eventService: EventsService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.getCountry();
    this.getEvent();
    this.initcountryForm();
  }

  initcountryForm(): void {
    this.eventForm = this.formBuild.group({
      country: [null],
      namen: [null],
      link: [null],
      description: [null],
      imagen: [null],

    });
  }

  //фільр подій
  сountryFiter(event: any) {
    const countryFilter = event;
    this.eventArr = [];
    this.eventService
      .getEventByCountryID(countryFilter)
      .subscribe((data: any) => {
        this.eventArr = data;
      });
  }

  resetForm() {
    this.eventForm.reset();
  }

  getCountry(): void {
    this.countryService.getAll().subscribe((data: any) => {
      this.countryArr = data;
      this.countryArr.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  // Отримання подій  з сервера
  getEvent(): void {
    this.eventService.getAll().subscribe((data: any) => {
      this.eventArr = data as EventResponse[];
    });
  }

  onCountrySelect(event: any): void {
    const selectedCountry = event.target.value;
    this.eventService.getEventByCountryID(selectedCountry).subscribe((data: any) => {
      this.eventArr = data
    });
  }

  // Редагування події
  editEvent(event: EventResponse) {
    this.eventForm.patchValue({
      country: event.country,
      namen: event.namen,
      link: event.link,
      description: event.description,
      imagen: event.imagen,

    });
    this.imagen = event.imagen;
    this.eventEditStatus = true;
    this.uploadPercent = 100;

    this.event_form = true;
    this.eventID = event.id;
  }

  delEvent(index: EventResponse) {
    const task = ref(this.storsgeIcon, index.imagen);
    deleteObject(task);
    this.eventService.delEvent(index.id as string).then(() => {
      this.ngOnInit();
    });
  }

  // Додавання або редагування події
  creatEvent() {
    if (this.eventEditStatus) {
      this.eventService
        .editEvent(this.eventForm.value, this.eventID as string)
        .then(() => {
          this.eventEditStatus = false;
          this.event_form = false;
          this.resetForm();
          this.uploadPercent = 0;
          this.imagen = '';
          this.ngOnInit();
        });
    } else {
      let currentEventNumber = this.eventForm.get('event')?.value?.numberevent;
      if (typeof currentEventNumber === 'number' && !isNaN(currentEventNumber)) {
        // Збільшуємо значення на 1 при додаванні нової категорії
        currentEventNumber += 1;

        // Оновлюємо значення numberСategories у формі перед відправкою
        this.eventForm.patchValue({
          numberСategories: currentEventNumber,
        });
      }

      this.eventService.addEvent(this.eventForm.value).then(() => {
        this.eventEditStatus = false;
        this.event_form = false;
        this.resetForm();
        this.uploadPercent = 0;
        this.imagen = '';
        this.ngOnInit()
      });
    }

    this.viewportScroller.scrollToPosition([0, 0]);
  }

  // Завантаження зображення
  async uploadUserImage(actionImage: any): Promise<void> {
    const file = actionImage.target.files[0];
    const previousImageURL = this.imagen;

    // Перевіряємо, чи не є previousImageURL null або undefined
    if (
      previousImageURL &&
      previousImageURL.startsWith('https://firebasestorage.googleapis.com')
    ) {
      const task = ref(this.storsgeIcon, previousImageURL);
      deleteObject(task)
        .then(() => {
          this.uploadPercent = 0;
          this.eventForm.patchValue({
            imagen: null,
          });
        })
        .catch((error) => {
          console.error('Error deleting previous image:', error);
        });
    }

    this.loadFIle('events', file.name, file)
      .then((data) => {
        if (this.uploadPercent == 100) {
          this.eventForm.patchValue({
            imagen: data,
          });
          this.imagen = data;
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
