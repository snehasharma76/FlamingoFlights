import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  images: { imageSrc: string, imageAlt: string }[] = [
    {
      imageSrc: 'https://images.pexels.com/photos/333525/pexels-photo-333525.jpeg?auto=compress&cs=tinysrgb&w=600',
      imageAlt: 'img1'
    },
    {
      imageSrc: 'https://images.pexels.com/photos/76971/fighter-jet-fighter-aircraft-f-16-falcon-aircraft-76971.jpeg?auto=compress&cs=tinysrgb&w=600',
      imageAlt: 'img2'
    },
    {
      imageSrc: 'https://images.pexels.com/photos/333525/pexels-photo-333525.jpeg?auto=compress&cs=tinysrgb&w=600',
      imageAlt: 'img3'
    },
    {
      imageSrc: 'https://images.pexels.com/photos/76971/fighter-jet-fighter-aircraft-f-16-falcon-aircraft-76971.jpeg?auto=compress&cs=tinysrgb&w=600',
      imageAlt: 'img4'
    },
    {
      imageSrc: 'https://images.pexels.com/photos/333525/pexels-photo-333525.jpeg?auto=compress&cs=tinysrgb&w=600',
      imageAlt: 'img5'
    },
  ];

  indicators: boolean = true;
  controls: boolean = true;
  selectedIndex: number = 0;
  autoSlide: boolean = true;
  slideInterval: number = 3000;

  ngOnInit(): void {
    try {
      if (this.autoSlide) {
        this.autoSlideImages();
      }
    } catch (error) {
      console.error('Error in autoSlideImages:', error);
    }

  }

  autoSlideImages(): void {
    try {
      setInterval(() => {
        this.onNextClick();
      }, this.slideInterval);
    } catch (error) {
      console.error('Error in autoSlideImages setInterval:', error)
    }

  }

  // sets index of the image on dot click
  selectImage(index: number): void {
    this.selectedIndex = index;
  }
  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    }
    else {
      this.selectedIndex--;
    }
  }
  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex++;
    }
  }
}
