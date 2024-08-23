import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PartnersService } from '../../shared/services/partners/partners.service';
import { CommonModule, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Component({
  selector: 'app-add-partner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditorModule],
  templateUrl: './add-partner.component.html',
  styleUrl: './add-partner.component.scss',
})
export class AddPartnerComponent {
  public partnersArr: Array<any> = [];
  public description = '';
  public image = '';
  public uploadPercent!: number;
  public partnersForm!: FormGroup;
  public partnersID!: number | string;
  public partners_form = false;
  public partnersEditStatus = false;

  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private storsgeIcon: Storage,
    private formBuild: FormBuilder,
    private partnersService: PartnersService,
    private viewportScroller: ViewportScroller
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.initcountryForm();
    this.getPartners();
  }

  initcountryForm(): void {
    this.partnersForm = this.formBuild.group({
      name: [null],
      description: [null],
      image: [null],
    });
  }

  // Отримання даних з сервера
  getPartners(): void {
    this.partnersService.getAll().subscribe((data: any) => {
      this.partnersArr = data as [];
    });
  }

  // Редагування фека
  editFake(patners: any) {
    this.partnersForm.patchValue({
      name: patners.name,
      description: patners.description,
      image: patners.image,
    });

    this.partnersEditStatus = true;
    this.partners_form = true;
    this.partnersID = patners.id;
  }

  delFake(index: any) {
    const task = ref(this.storsgeIcon, index.imageOrganization);
    deleteObject(task);
    this.partnersService.delPartners(index.id as string).then(() => {
      this.ngOnInit();
    });
  }

  // Додавання або редагування меню
  addPartner() {
    if (this.partnersEditStatus) {
      this.partnersService
        .editPartners(this.partnersForm.value, this.partnersID as string)
        .then(() => {
          this.partnersEditStatus = false;
          this.partners_form = false;
          this.image = '';
          this.ngOnInit();
        });
    } else {
      let currentPartnerNumber =
        this.partnersForm.get('partners')?.value?.numberfake;
      if (
        typeof currentPartnerNumber === 'number' &&
        !isNaN(currentPartnerNumber)
      ) {
        // Збільшуємо значення на 1 при додаванні нової категорії
        currentPartnerNumber += 1;

        // Оновлюємо значення numberСategories у формі перед відправкою
        this.partnersForm.patchValue({
          numberСategories: currentPartnerNumber,
        });
      }

      this.partnersService.addPartners(this.partnersForm.value).then(() => {
        this.partnersEditStatus = false;
        this.partners_form = false;
        this.image = '';
        this.ngOnInit();
      });
    }

    this.viewportScroller.scrollToPosition([0, 0]);
  }

  resetForm() {
    this.partnersForm.reset();
  }

  // Завантаження зображення
  async uploadUserImage(actionImage: any): Promise<void> {
    const file = actionImage.target.files[0];
    const previousImageURL = this.image;

    // Перевіряємо, чи не є previousImageURL null або undefined
    if (
      previousImageURL &&
      previousImageURL.startsWith('https://firebasestorage.googleapis.com')
    ) {
      const task = ref(this.storsgeIcon, previousImageURL);
      deleteObject(task)
        .then(() => {
          this.uploadPercent = 0;
          this.partnersForm.patchValue({
            image: null,
          });
        })
        .catch((error) => {
          console.error('Error deleting previous image:', error);
        });
    }

    this.loadFIle('patners', file.name, file)
      .then((data) => {
        if (this.uploadPercent == 100) {
          this.partnersForm.patchValue({
            image: data,
          });
          this.image = data;
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
