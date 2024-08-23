import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AboutService } from '../../shared/services/about/about.service';


@Component({
  selector: 'app-add-abut',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditorComponent],
  templateUrl: './add-abut.component.html',
  styleUrl: './add-abut.component.scss'
})
export class AddAbutComponent {
  public description = '';
  public imageAbout = '';
  public uploadPercent!: number;
  public aboutForm!: FormGroup;
  public aboutID!: number | string;

  isBrowser: boolean;
  editor: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private storsgeIcon: Storage,
    private formBuild: FormBuilder,
    private aboutService: AboutService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.initcountryForm();
    if (this.isBrowser) {
      this.getAbout();
    }
  }

  initcountryForm(): void {
    this.aboutForm = this.formBuild.group({
      description: [null],
      imageAbout: [null],
    });
  }

  getAbout() {
    this.aboutService.getAbout().subscribe((data: any) => {
      if (data.length > 0) {
        // Перевіряємо, чи є записи
        const about = data[0];
        this.aboutForm.patchValue({
          description: about.description,
          imageAbout: about.imageAbout,
        });

        this.imageAbout = about.imageAbout;
        this.aboutID = about.id;
      } else {
        this.aboutID; // Якщо запису немає
      }
    });
  }

  saveAbout() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.aboutID) {
        // Оновлюємо існуючий запис
        console.log('Оновлюємо існуючий запис');

        this.aboutService
          .editAbout(this.aboutForm.value, this.aboutID as string)
          .then(() => {
            console.log('Запис оновлено');
          })
          .catch((error) => {
            console.error('Помилка при оновленні запису:', error);
          });
      } else {
        // Створюємо новий запис лише якщо немає aboutID
        if (!this.aboutID) {
          console.log('Створюємо новий запис лише якщо немає aboutID');
          this.aboutService
            .addAbout(this.aboutForm.value)
            .then((docRef) => {
              this.aboutID = docRef.id; // Зберігаємо ID нового запису
              console.log('Новий запис створено');
            })
            .catch((error) => {
              console.error('Помилка при створенні запису:', error);
            });
        }
      }
    }
  }

  // Завантаження зображення
  async uploadUserImage(actionImage: any): Promise<void> {
    const file = actionImage.target.files[0];
    const previousImageURL = this.imageAbout;

    // Перевіряємо, чи не є previousImageURL null або undefined
    if (
      previousImageURL &&
      previousImageURL.startsWith('https://firebasestorage.googleapis.com')
    ) {
      const task = ref(this.storsgeIcon, previousImageURL);
      deleteObject(task)
        .then(() => {
          this.uploadPercent = 0;
          this.aboutForm.patchValue({
            imageAbout: null,
          });
        })
        .catch((error) => {
          console.error('Error deleting previous image:', error);
        });
    }

    this.loadFIle('about', file.name, file)
      .then((data) => {
        if (this.uploadPercent == 100) {
          this.aboutForm.patchValue({
            imageAbout: data,
          });
          this.imageAbout = data;
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
