import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as sio from 'socket.io-client';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';
import { DBSocketService } from './dbsocket.service';

@Component({
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ['app/dashboard.component.css'],
    providers: [DBSocketService]
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
        this.socketConnection = this.dbSocketService.get("demo").subscribe(message => {
            console.log('SIO: Message Received')
        })
        // this.socketConnection = this.dbSocketService.onSave().subscribe(message => {
        //     console.log('SIO: Document Saved')
        // })
        // this.socketConnection = this.dbSocketService.onDelete().subscribe(message => {
        //     console.log('SIO: Document Removed')
        // })
    }

    gotoDetail(hero: Hero) {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}