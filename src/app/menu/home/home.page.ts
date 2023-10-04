import { AfterViewInit, Component, ElementRef, NgZone, OnInit, QueryList, ViewChildren } from '@angular/core';
import { GestureController, IonCard, Platform } from '@ionic/angular';
import { IonicStorageService } from 'src/app/core/services/ionic-storage.service';
import { RandomUserService } from 'src/app/core/services/randomUser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [RandomUserService, IonicStorageService]

})
export class HomePage implements OnInit, AfterViewInit {
  users: any[] = []
  longPressActive: boolean = false

  @ViewChildren(IonCard, { read: ElementRef }) cards: QueryList<ElementRef>

  constructor(
    private randomUserService: RandomUserService,

    private gestureCtrl: GestureController,
    private zone: NgZone,
    private plt: Platform
  ) { }

  ngOnInit() {
    this.loadRandomUserService()
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      const cardArray = this.cards.toArray()

      this.useLongPress(cardArray)
      this.userTinderSwiper(cardArray)
    }, 2000)

  }


  useLongPress(cardArray) {
    for (let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i]

      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'long-press',
        onStart: ev => {
          this.longPressActive = true
          this.increaseAge(i)
        },
        onEnd: ev => {
          this.longPressActive = false
        }
      });
      gesture.enable(true);
    }
  }

  increaseAge(i) {
    setTimeout(() => {
      if (this.longPressActive) {
        this.zone.run(() => {
          this.users[i].registered.age++;
          this.increaseAge(i)
        })
      }
    }, 200)
  }

  userTinderSwiper(cardArray) {
    for (let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i]

      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'swipte',
        onStart: ev => {

        },
        onMove: ev => {
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
          this.setCardColor(ev.deltaX, card.nativeElement)
        },
        onEnd: ev => {
          card.nativeElement.style.transition = '1.5s ease-out'

          if (ev.deltaX > 150) {
            card.nativeElement.style.transform = `translateX(${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
          } else if (ev.deltaX < -150) {
            card.nativeElement.style.transform = `translateX(${-this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
          } else {
            card.nativeElement.style.transform = ''
            this.setCardColor(0, card.nativeElement)
          }
        }
      });
      gesture.enable(true);
    }
  }

  setCardColor(x, element) {
    let color = ''
    const abs = Math.abs(x)
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16))
    const hexCode = this.decimalToHex(min, 2)

    if (x < 0) {
      color = '#FF' + hexCode + hexCode
    } else {
      color = '#' + hexCode + 'FF' + hexCode
    }

    element.style.background = color;
  }

  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }













  loadRandomUserService() {
    this.randomUserService.getRandomUser().subscribe((res: any) => {
      this.users = res.results
      console.log(this.users)
    })
  }

}
