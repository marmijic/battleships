import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { 
    HomeComponent, 
    PlayersListComponent, 
    PlayersDetailComponent 
} from "./component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "players", component: PlayersListComponent },
    { path: "players/detail/:id", component: PlayersDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
