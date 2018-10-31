import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    HomeComponent,
    PlayersListComponent,
    PlayersDetailComponent,
    PlayerCreateComponent,
    GameCreateComponent,
    GamePlayComponent,
    NotFoundComponent
} from './component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'players', component: PlayersListComponent },
    { path: 'player-create', component: PlayerCreateComponent },
    { path: 'players/detail/:id', component: PlayersDetailComponent },
    { path: 'game-create', component: GameCreateComponent },
    { path: 'game-play/:playerId/:gameId', component: GamePlayComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
