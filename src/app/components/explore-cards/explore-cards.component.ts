import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore-cards',
  templateUrl: './explore-cards.component.html',
  styleUrls: ['./explore-cards.component.scss']
})
export class ExploreCardsComponent implements OnInit {

  cards: { image: { Src: string, Alt: string }, Source: string, Destination: string, Cost: number }[] = [];

  constructor() {

  }

  ngOnInit(): void {

    this.cards.push({
      image: { Src: '../../../assets/dexter-fernandes-y97sM41-g9k-unsplash.jpg', Alt: 'Jaipur Mahal' }, Destination: 'Jaipur', Cost: 2800,
      Source: 'Delhi'
    })
    this.cards.push({
      image: { Src: '../../../assets/rajgir.jpg', Alt: 'Jaipur Mahal' }, Destination: 'Rajgir', Cost: 3800,
      Source: 'Kanpur'
    })
    this.cards.push({
      image: { Src: '../../../assets/dexter-fernandes-y97sM41-g9k-unsplash.jpg', Alt: 'Jaipur Mahal' }, Destination: 'Goa', Cost: 2800,
      Source: 'Pune'
    })

    this.cards.push({
      image: { Src: '../../../assets/dexter-fernandes-y97sM41-g9k-unsplash.jpg', Alt: 'Jaipur Mahal' }, Destination: 'Coimbatore', Cost: 2800,
      Source: 'Bengaluru'
    })
    this.cards.push({
      image: { Src: '../../../assets/dexter-fernandes-y97sM41-g9k-unsplash.jpg', Alt: 'Jaipur Mahal' }, Destination: 'Hyderabad', Cost: 2800,
      Source: 'Patna'
    })
    this.cards.push({
      image: { Src: '../../../assets/dexter-fernandes-y97sM41-g9k-unsplash.jpg', Alt: 'Jaipur Mahal' }, Destination: 'Rishikesh', Cost: 2800,
      Source: 'Mumbai'
    })

  }

}
