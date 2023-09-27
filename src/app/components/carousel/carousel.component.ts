import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  // images: { imageSrc: string, imageAlt: string }[] = [
  //   {
  //     imageSrc: '../../../assets/carousel-images/interior.jpg',
  //     imageAlt: 'img1'
  //   },
  //   {
  //     imageSrc: '../../../assets/carousel-images/Kochi.jpg',
  //     imageAlt: 'img2'
  //   },
  //   {
  //     imageSrc: '../../../assets/carousel-images/fuji.jpg',
  //     imageAlt: 'img3'
  //   },
  //   {
  //     imageSrc: '../../../assets/carousel-images/udaipur.png',
  //     imageAlt: 'img4'
  //   }
  // ];

  // indicators: boolean = true;
  // controls: boolean = true;
  // selectedIndex: number = 0;
  // autoSlide: boolean = true;
  // slideInterval: number = 3000;

  // ngOnInit(): void {
  //   if (this.autoSlide) {
  //     this.autoSlideImages();
  //   }
  // }

  // autoSlideImages(): void {
  //   setInterval(() => {
  //     this.onNextClick();
  //   }, this.slideInterval);
  // }

  // // sets index of the image on dot click
  // selectImage(index: number): void {
  //   this.selectedIndex = index;
  // }
  // onPrevClick(): void {
  //   if (this.selectedIndex === 0) {
  //     this.selectedIndex = this.images.length - 1;
  //   }
  //   else {
  //     this.selectedIndex--;
  //   }
  // }
  // onNextClick(): void {
  //   if (this.selectedIndex === this.images.length - 1) {
  //     this.selectedIndex = 0;
  //   }
  //   else {
  //     this.selectedIndex++;
  //   }
  // }
}
