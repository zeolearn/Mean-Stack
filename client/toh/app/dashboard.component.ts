import { Component, OnInit } from '@angular/core';
import * as sio from 'socket.io';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';
import { DBSocketService } from './dbsocket.service';

@Component({
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ['app/dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    socketConnection;
    constructor(
        private heroService: HeroService,
        private dbSocketService: DBSocketService,
        private router: Router
    ) {

    }
    ngOnInit() {
        this.heroService.getHeroes().then(heroes => {
            console.log('Heroes from HeroService:', heroes);
            this.heroes = heroes
        })
        this.socketConnection = this.dbSocketService.onSave().subscribe(message => {
            console.log('SIO: Document Saved')
        })
    }

    gotoDetail(hero: Hero) {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}